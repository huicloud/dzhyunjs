/* eslint-disable no-underscore-dangle */

import DzhyunConnection from 'dzhyun-connection';
import DzhyunDataParser from 'dzhyun-dataparser';

import { param, unParam } from './util';

function formatParams(params) {
  const result = {};
  if (params) {
    Object.keys(params).forEach((key) => {
      let value = params[key];
      if (value instanceof Array) {
        value = value.join(',');
      }
      if (value != null) {
        result[key] = value;
      }
    });
  }
  return param(result);
}

let lastQid = 0;
function getQid() {
  return lastQid += 1; // eslint-disable-line
}

// 简易的事件监听接口实现
class EventEmiter {
  _listenerMap = {};

  /**
   * 事件监听接口
   */
  on(type, listener) {
    if (typeof listener === 'function') {
      const listeners = this._listenerMap[type] || (this._listenerMap[type] = []);
      if (listeners.indexOf(listener) < 0) {
        listeners.push(listener);
      }
    }
    return this;
  }

  off(type, listener) {
    if (typeof listener === 'function') {
      const listeners = this._listenerMap[type] || (this._listenerMap[type] = []);
      const index = listeners.indexOf(listener);
      if (index >= 0) listeners.splice(index, 1);
    } else {
      this._listenerMap[type] = [];
    }
    return this;
  }

  trigger(type, ...args) {
    const listeners = this._listenerMap[type];
    if (listeners) listeners.forEach(listener => listener.apply(this, args));
    return this;
  }

  alias(type) {
    if (type) {
      this[`on${type}`] = this.on.bind(this, type);
      this[`off${type}`] = this.off.bind(this, type);
      if (!this[type]) this[type] = this.trigger.bind(this, type);
    }
  }
}

class Request extends EventEmiter {
  constructor(options) {
    super();
    Object.assign(this, options);
    this.subscribe = !!(options.queryObject && options.queryObject.sub === 1);

    this.alias('message');
    this.alias('error');

    this.onmessage(options.callback);
    this.onerror(options.callback);
  }

  then(...args) {
    return new Promise((resolve, reject) => {
      this.onmessage(resolve);
      this.onerror(reject);
    }).then(...args);
  }

  catch(...args) {
    return new Promise((resolve, reject) => {
      this.onmessage(resolve);
      this.onerror(reject);
    }).catch(...args);
  }
}

class Dzhyun extends EventEmiter {
  constructor({
                address = 'ws://gw.yundzh.com/ws',
                dataType = 'json',
                compresser,
                dataParser,
                token,
                generateQid,
                secure,
                ping = false,
                pingInterval = 30 * 1000, // 30秒
                reconnect = false,
                reconnectInterval = 10 * 1000, // 10秒
                post = false,
              } = {}) {
    super();
    this.address = address;
    this.dataType = dataType;
    this.compresser = compresser;
    this.dataParser = dataParser || new DzhyunDataParser({ compresser });
    this.token = token;
    this.generateQid = generateQid || getQid;
    this.secure = secure;
    this.ping = ping;
    this.pingInterval = pingInterval;
    this.reconnect = reconnect;
    this.reconnectInterval = reconnectInterval;
    this.post = post;

    this._requests = {};
    this._resetReconnectCount();

    this.alias('open');
    this.alias('close');
    this.alias('request');
    this.alias('response');
    this.alias('error');
  }

  _tokenPromise() {
    return Promise.resolve(this.token && this.token.getToken ? this.token.getToken() : this.token);
  }

  _connection() {
    this._conn = this._conn || Promise.resolve().then(() => {
      return this._tokenPromise()
        .catch(err => console.warn('request token fail', err))
        .then((token) => {
          let lastTime;
          const connection = new DzhyunConnection(this.address, { deferred: true, type: this.post ? 'POST' : 'GET' }, {
            open: () => {
              this.trigger('open');
              this._resetReconnectCount();

              // 通过发送/ping保持连接，默认每30秒发送一次
              lastTime = Date.now();
              if (this.ping) {
                const pingInterval = this.pingInterval;
                const ping = () => {
                  setTimeout(() => {
                    if (connection.getStatus() === 1) {
                      // 多计算5秒避免刚好两次30秒超过了后台的1分钟ping/pong判断
                      if ((Date.now() - lastTime) + (5 * 1000) >= pingInterval) {
                        connection.request('/ping');
                      }
                      ping();
                    }
                  }, pingInterval);
                };
                ping();
              }
            },
            request: (message) => {
              lastTime = Date.now();
              if (message !== '/ping') {
                this.trigger('request', message);
              }
            },
            response: (data) => {
              lastTime = Date.now();
              this.trigger('response', data);

              // 解析数据
              if (this.dataParser) {
                Promise.resolve(this.dataParser.parse || this.dataParser).then((parse) => {
                  parse.call(this.dataParser, data).then(({ Qid, Err, Counter, Data = {} }) => {
                    if (!Qid) console.debug('Qid does not exist.');
                    else {
                      const request = this._requests[Qid];
                      if (request) {
                        if (Err !== 0) {
                          // 服务端返回错误信息
                          const { desc, code } = Data;
                          const error = new Error(desc || 'unknown error');
                          error.desc = desc;
                          error.code = code;
                          error.data = Data; // 将原始错误信息数据通过data属性暴露出去，使之可以处理复杂的嵌套错误
                          request.error(error, Counter, code, desc);
                        } else {
                          let resultData = Data;
                          // 简化数据结构
                          if (request.shrinkData) {
                            // 返回数据中RepData开头的字段数据
                            resultData = resultData[
                              Object.keys(resultData)
                                .filter(key => ['Id', 'Obj'].indexOf(key) < 0)
                                .sort(key1 => (key1.indexOf('RepData') === 0 ? -1 : 1))[0]
                              ];
                          }
                          request.message(resultData, Counter);
                        }
                        if (!request.subscribe) {
                          delete this._requests[Qid];
                        }
                      }
                    }
                  }).catch((err) => {
                    // 解析数据失败
                    console.error(err);
                  });
                });
              }
            },
            close: () => {
              this._conn = null;
              this.trigger('close');
              this._reconnect();
            },
            error: (err) => {
              this._conn = null;
              this.trigger('error', err);
              this._reconnect();
            },
          }, this.secure);
          const connectionType = connection._protocol;
          if (token) {
            if (connectionType === 'ws' && connection._address.indexOf('token=') < 0) {
              connection._address = `${connection._address}?token=${token}`;
            }
          }
          this._conn = connection;
          // this._token = token;
          this._connectionType = connectionType;
          return this._conn;
        });
    });
    return Promise.resolve(this._conn);
  }

  _reconnect() {
    if (this.reconnect === true || this.reconnect > this._reconnectCount) {
      if (this._reconnectTid) {
        clearTimeout(this._reconnectTid);
      }
      // 并不直接重连而是直接将现在的数据请求重新执行
      this._reconnectTid = setTimeout(() => {
        const requests = this._requests;
        Object.keys(this._requests).forEach(key => requests[key].start());
        this._reconnectCount += 1;
        this.trigger('reconnect');
      }, this.reconnectInterval);
    }
  }

  _resetReconnectCount() {
    this._reconnectCount = 0;
  }

  /**
   * 查询方法
   * @param {!string} url 查询的url
   * @param {Object=} params 参数
   * @param {function=} callback 回调函数
   * @param {boolean=} shrinkData 返回的数据是否简化结构，默认值是true
   * @param {boolean=} immediate 是否立即请求数据，默认true，
   *   设置为false时则不会立即请求而是返回request，可以手动调用request.start()去请求数据
   */
  query(url, params, callback, shrinkData, immediate) {
    if (typeof url !== 'string') throw new Error('url must be a string');
    if (typeof params !== 'object') {
      immediate = shrinkData; // eslint-disable-line
      shrinkData = callback; // eslint-disable-line
      callback = params; // eslint-disable-line
      params = null; // eslint-disable-line
    }
    if (typeof callback !== 'function') {
      immediate = shrinkData; // eslint-disable-line
      shrinkData = callback; // eslint-disable-line
      callback = null; // eslint-disable-line
    }
    shrinkData = shrinkData !== false; // eslint-disable-line

    const [serviceUrl, searchStr] = url.split('?');
    const queryObject = Object.assign({
      compresser: this.compresser || undefined,
      output: this.dataType,
    }, unParam(searchStr || ''), params);

    let qid = queryObject.qid;
    if (!qid) {
      qid = this.generateQid(serviceUrl, queryObject);
      queryObject.qid = qid;
    }

    const request = new Request({ qid, serviceUrl, queryObject, callback, shrinkData });
    request.cancel = this.cancel.bind(this, qid);
    request.start = () => {
      const sid = (request._sid || 0) + 1; // 用于保证只有最后一次确实做请求
      request._sid = sid;
      this._requests[qid] = request;
      let options;
      this._connection().then((conn) => {
        if (this._connectionType === 'http') {
          options = queryObject.output === 'pb' ? { dataType: 'arraybuffer' } : undefined;
          // 参数中带有token则不需要再生成
          if (queryObject.token) {
            return conn;
          }
          return this._tokenPromise().then((token) => {
            queryObject.token = token;
            return conn;
          });
        }
        return conn;
      }).then((conn) => {
        // 被取消就不再请求
        if (this._requests[qid] !== request || request._sid !== sid) {
          return;
        }
        const requestParams = formatParams(queryObject);
        let message;
        const post = queryObject.post || this.post;
        if (this._connectionType === 'http' && post === true) {
          message = serviceUrl;
          options = {
            ...options,
            type: 'POST',
            data: requestParams,
          };
        } else {
          message = requestParams ? `${serviceUrl}?${requestParams}` : serviceUrl;
        }
        conn.request(message, options);
      });
    };

    // this._connection().then((conn) => {
    //   // 请求已经取消则直接返回
    //   if (!this._requests[request.qid]) return;
    //   let options;
    //   if (this._connectionType === 'http') {
    //     queryObject.token = queryObject.token || this._token;
    //     // 如果以http协议请求pb格式数据时，需设置额外参数以指定响应数据是二进制数据
    //     options = { dataType: 'arraybuffer' };
    //   }
    //   const requestParams = formatParams(queryObject);
    //   conn.request(requestParams ? `${serviceUrl}?${requestParams}` : serviceUrl, options);
    // });
    if (immediate !== false) {
      request.start();
    }
    return request;
  }

  subscribe(url, params, callback, shrinkData, immediate) {
    if (typeof params !== 'object') {
      shrinkData = callback; // eslint-disable-line
      callback = params; // eslint-disable-line
      params = {}; // eslint-disable-line
    }
    params = params || {};  // eslint-disable-line
    params.sub = 1;  // eslint-disable-line
    return this.query(url, params, callback, shrinkData, immediate);
  }

  _cancelRequest(qid) {
    if (this._connectionType === 'ws' && this._conn && this._conn.getStatus && this._conn.getStatus() === 1) {
      this._conn.request(`/cancel?qid=${qid}`);
    }
  }

  /**
   * 取消查询
   * @param {string=} qid
   */
  cancel(qid) {
    if (qid) {
      this._cancelRequest(qid);
      delete this._requests[qid];
    } else {
      const requests = this._requests;
      Object.keys(requests).forEach((eachQid) => {
        this._cancelRequest(eachQid);
        delete requests[eachQid];
      });
    }
  }

  // 关闭连接
  close() {
    // 取消当前请求，
    this.cancel();
    if (this._conn) this._conn.close();
    this._conn = null;
  }
}
Dzhyun.Connection = DzhyunConnection;
Dzhyun.DataParser = DzhyunDataParser;

module.exports = Dzhyun;
