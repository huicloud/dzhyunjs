'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle */

var _dzhyunConnection = require('dzhyun-connection');

var _dzhyunConnection2 = _interopRequireDefault(_dzhyunConnection);

var _dzhyunDataparser = require('dzhyun-dataparser');

var _dzhyunDataparser2 = _interopRequireDefault(_dzhyunDataparser);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function formatParams(params) {
  var result = {};
  if (params) {
    Object.keys(params).forEach(function (key) {
      var value = params[key];
      if (value instanceof Array) {
        value = value.join(',');
      }
      if (value != null) {
        result[key] = value;
      }
    });
  }
  return (0, _util.param)(result);
}

var lastQid = 0;
function getQid() {
  return lastQid += 1; // eslint-disable-line
}

// 简易的事件监听接口实现

var EventEmiter = function () {
  function EventEmiter() {
    _classCallCheck(this, EventEmiter);

    this._listenerMap = {};
  }

  _createClass(EventEmiter, [{
    key: 'on',


    /**
     * 事件监听接口
     */
    value: function on(type, listener) {
      if (typeof listener === 'function') {
        var listeners = this._listenerMap[type] || (this._listenerMap[type] = []);
        if (listeners.indexOf(listener) < 0) {
          listeners.push(listener);
        }
      }
      return this;
    }
  }, {
    key: 'off',
    value: function off(type, listener) {
      if (typeof listener === 'function') {
        var listeners = this._listenerMap[type] || (this._listenerMap[type] = []);
        var index = listeners.indexOf(listener);
        if (index >= 0) listeners.splice(index, 1);
      } else {
        this._listenerMap[type] = [];
      }
      return this;
    }
  }, {
    key: 'trigger',
    value: function trigger(type) {
      var _this = this;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this._listenerMap[type];
      if (listeners) listeners.forEach(function (listener) {
        return listener.apply(_this, args);
      });
      return this;
    }
  }, {
    key: 'alias',
    value: function alias(type) {
      if (type) {
        this['on' + type] = this.on.bind(this, type);
        this['off' + type] = this.off.bind(this, type);
        if (!this[type]) this[type] = this.trigger.bind(this, type);
      }
    }
  }]);

  return EventEmiter;
}();

var Request = function (_EventEmiter) {
  _inherits(Request, _EventEmiter);

  function Request(options) {
    _classCallCheck(this, Request);

    var _this2 = _possibleConstructorReturn(this, (Request.__proto__ || Object.getPrototypeOf(Request)).call(this));

    Object.assign(_this2, options);
    _this2.subscribe = !!(options.queryObject && options.queryObject.sub === 1);

    _this2.alias('message');
    _this2.alias('error');

    _this2.onmessage(options.callback);
    _this2.onerror(options.callback);
    return _this2;
  }

  _createClass(Request, [{
    key: 'then',
    value: function then() {
      var _ref,
          _this3 = this;

      return (_ref = new Promise(function (resolve, reject) {
        _this3.onmessage(resolve);
        _this3.onerror(reject);
      })).then.apply(_ref, arguments);
    }
  }, {
    key: 'catch',
    value: function _catch() {
      var _ref2,
          _this4 = this;

      return (_ref2 = new Promise(function (resolve, reject) {
        _this4.onmessage(resolve);
        _this4.onerror(reject);
      })).catch.apply(_ref2, arguments);
    }
  }]);

  return Request;
}(EventEmiter);

var Dzhyun = function (_EventEmiter2) {
  _inherits(Dzhyun, _EventEmiter2);

  function Dzhyun() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$address = _ref3.address,
        address = _ref3$address === undefined ? 'ws://gw.yundzh.com/ws' : _ref3$address,
        _ref3$dataType = _ref3.dataType,
        dataType = _ref3$dataType === undefined ? 'json' : _ref3$dataType,
        compresser = _ref3.compresser,
        dataParser = _ref3.dataParser,
        token = _ref3.token,
        generateQid = _ref3.generateQid,
        secure = _ref3.secure;

    _classCallCheck(this, Dzhyun);

    var _this5 = _possibleConstructorReturn(this, (Dzhyun.__proto__ || Object.getPrototypeOf(Dzhyun)).call(this));

    _this5.address = address;
    _this5.dataType = dataType;
    _this5.compresser = compresser;
    _this5.dataParser = dataParser || new _dzhyunDataparser2.default({ compresser: compresser });
    _this5.token = token;
    _this5.generateQid = generateQid || getQid;
    _this5.secure = secure;

    _this5._requests = {};

    _this5.alias('open');
    _this5.alias('close');
    _this5.alias('request');
    _this5.alias('response');
    _this5.alias('error');
    return _this5;
  }

  _createClass(Dzhyun, [{
    key: '_connection',
    value: function _connection() {
      var _this6 = this;

      this._conn = this._conn || Promise.resolve().then(function () {
        var tokenPromise = _this6.token && _this6.token.getToken ? _this6.token.getToken() : _this6.token;
        return Promise.resolve(tokenPromise).catch(function (err) {
          return console.warn('request token fail', err);
        }).then(function (token) {
          var connection = new _dzhyunConnection2.default(_this6.address, { deferred: true }, {
            open: function open() {
              _this6.trigger('open');
            },
            request: function request(message) {
              _this6.trigger('request', message);
            },
            response: function response(data) {
              _this6.trigger('response', data);

              // 解析数据
              if (_this6.dataParser) {
                Promise.resolve(_this6.dataParser.parse || _this6.dataParser).then(function (parse) {
                  parse.call(_this6.dataParser, data).then(function (_ref4) {
                    var Qid = _ref4.Qid,
                        Err = _ref4.Err,
                        Counter = _ref4.Counter,
                        _ref4$Data = _ref4.Data,
                        Data = _ref4$Data === undefined ? {} : _ref4$Data;

                    if (!Qid) console.warn('Qid does not exist.');else {
                      var request = _this6._requests[Qid];
                      if (request) {
                        if (Err !== 0) {
                          // 服务端返回错误信息
                          var desc = Data.desc,
                              code = Data.code;

                          var error = new Error(desc || 'unknown error');
                          error.desc = desc;
                          error.code = code;
                          request.error(error, Counter, code, desc);
                        } else {
                          var resultData = Data;
                          // 简化数据结构
                          if (request.shrinkData) {
                            // 返回数据中RepData开头的字段数据
                            resultData = resultData[Object.keys(resultData).filter(function (key) {
                              return ['Id', 'Obj'].indexOf(key) < 0;
                            }).sort(function (key1) {
                              return key1.indexOf('RepData') === 0 ? -1 : 1;
                            })[0]];
                          }
                          request.message(resultData, Counter);
                        }
                        if (!request.subscribe) {
                          delete _this6._requests[Qid];
                        }
                      }
                    }
                  }).catch(function (err) {
                    // 解析数据失败
                    console.error(err);
                  });
                });
              }
            },
            close: function close() {
              _this6.trigger('close');
              // TODO 连接中断考虑重连
            },
            error: function error(err) {
              _this6.trigger('error', err);
              // TODO 请求失败考虑请求
            }
          }, _this6.secure);
          var connectionType = connection._protocol;
          if (token) {
            if (connectionType === 'ws' && connection._address.indexOf('token=') < 0) {
              connection._address = connection._address + '?token=' + token;
            }
          }
          _this6._conn = connection;
          _this6._token = token;
          _this6._connectionType = connectionType;
          return _this6._conn;
        });
      });
      return Promise.resolve(this._conn);
    }

    /**
     * 查询方法
     * @param {!string} url 查询的url
     * @param {Object=} params 参数
     * @param {function=} callback 回调函数
     * @param {boolean=} shrinkData 返回的数据是否简化结构，默认值是true
     */

  }, {
    key: 'query',
    value: function query(url, params, callback, shrinkData) {
      var _this7 = this;

      if (typeof url !== 'string') throw new Error('url must be a string');
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
        shrinkData = callback; // eslint-disable-line
        callback = params; // eslint-disable-line
        params = null; // eslint-disable-line
      }
      if (typeof callback !== 'function') {
        shrinkData = callback; // eslint-disable-line
        callback = null; // eslint-disable-line
      }
      shrinkData = shrinkData !== false; // eslint-disable-line

      var _url$split = url.split('?'),
          _url$split2 = _slicedToArray(_url$split, 2),
          serviceUrl = _url$split2[0],
          searchStr = _url$split2[1];

      var queryObject = Object.assign({
        compresser: this.compresser || undefined,
        output: this.dataType
      }, (0, _util.unParam)(searchStr || ''), params);

      var qid = queryObject.qid;
      if (!qid) {
        qid = this.generateQid(serviceUrl, queryObject);
        queryObject.qid = qid;
      }

      var request = new Request({ qid: qid, serviceUrl: serviceUrl, queryObject: queryObject, callback: callback, shrinkData: shrinkData });
      this._requests[qid] = request;
      request.cancel = this.cancel.bind(this, qid);
      this._connection().then(function (conn) {
        // 请求已经取消则直接返回
        if (!_this7._requests[request.qid]) return;
        var options = void 0;
        if (_this7._connectionType === 'http') {
          queryObject.token = queryObject.token || _this7._token;
          // 如果以http协议请求pb格式数据时，需设置额外参数以指定响应数据是二进制数据
          options = { dataType: 'arraybuffer' };
        }
        var requestParams = formatParams(queryObject);
        conn.request(requestParams ? serviceUrl + '?' + requestParams : serviceUrl, options);
      });
      return request;
    }
  }, {
    key: 'subscribe',
    value: function subscribe(url, params, callback, shrinkData) {
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
        shrinkData = callback; // eslint-disable-line
        callback = params; // eslint-disable-line
        params = {}; // eslint-disable-line
      }
      params = params || {}; // eslint-disable-line
      params.sub = 1; // eslint-disable-line
      return this.query(url, params, callback, shrinkData);
    }
  }, {
    key: '_cancelRequest',
    value: function _cancelRequest(qid) {
      if (this._connectionType === 'ws' && this._conn && this._conn.getStatus() === 1) {
        this._conn.request('/cancel?qid=' + qid);
      }
    }

    /**
     * 取消查询
     * @param {string=} qid
     */

  }, {
    key: 'cancel',
    value: function cancel(qid) {
      var _this8 = this;

      if (qid) {
        this._cancelRequest(qid);
        delete this._requests[qid];
      } else {
        var requests = this._requests;
        Object.keys(requests).forEach(function (eachQid) {
          _this8._cancelRequest(eachQid);
          delete requests[eachQid];
        });
      }
    }

    // 关闭连接

  }, {
    key: 'close',
    value: function close() {
      // 取消当前请求，
      this.cancel();
      if (this._conn) this._conn.close();
      this._conn = null;
    }
  }]);

  return Dzhyun;
}(EventEmiter);

Dzhyun.Connection = _dzhyunConnection2.default;
Dzhyun.DataParser = _dzhyunDataparser2.default;

module.exports = Dzhyun;