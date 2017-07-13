大智慧云JS库
---
提供连接和请求云平台数据的JS SDK

### 使用
1、global

    <script src="dist/dzhyun.min.js"></script>
    <script>
      var dzhyun = new Dzhyun({
          address: 'ws://gw.yundzh.com/ws',
          dataType: 'pb',
          token: 'xxxxxxx',
      });
      dzhyun.query('/kbspirit', { input: '600' }, function(data) {
        ...
      }).then(function(data) {
        ...
      }).catch(function(err) {
        ...
      });
    </script>

2、模块化

安装

    npm install dzhyunjs

使用

    import Dzhyun from 'dzhyunjs';
    ...

### API
##### 创建实例
new Dzhyun(options) 对于websocket方式，一个Dzhyun实例对应一个websocket连接
- **options** `Object` 必填，具体参数如下
- **options.address** `String` 可选，连接服务器地址，默认值为 'ws://gw.yundzh.com/ws' ，根据地址自动选择使用http还是websocket协议连接云平台
- **options.dataType** `String` 可选，请求数据格式，可设置为'json'/'pb'，默认为'json'，请求时转换为云平台接口上的参数output=json/pb
- **options.compresser** `String` 可选，数据的压缩格式，只能设置为'snappy'，默认不使用，请求时转换为云平台接口上的参数compresser=snappy
- **options.dataParser** `Object` 可选, 数据解析器，需要有一个parse方法，默认为DzhyunDataParser的实例，详细参照<https://github.com/huicloud/dzhyun-dataparser>
- **options.token** `String|Promise|DzhyunTokenManager` 可选，设置云平台访问令牌，可以使用DzhyunTokenManager，详细参照<https://github.com/huicloud/dzhyun-token>
- **options.generateQid** `Function` 可选，设置请求qid的生成方法，调用时可以得到的参数是接口url和查询参数，默认生成递增数字作为qid，

##### 实例方法
Dzhyun.prototype.query(url, params, callback, shrinkData) 查询指定的接口
- **url** `String` 必填，指定的接口url，可以带着参数（'/stkdata?obj=SH600000&field=ZhangFu'）
- **params** `Object` 可选，设置的查询参数，会覆盖url带着的相同的参数，output,compresser,qid,sub这些参数也可以设置，会覆盖默认值
- **callback** `Function` 可选，回调函数，回调的参数如下
>- **result** `Object|Error` 返回数据，如果是Error类型则是错误
>- **counter** `Number` 响应的计数，对于订阅时有效，表示第几次推送数据
>- **code** `Number` 错误编号，对于错误返回是有效，正常返回是code为undefined，第一参数result中也包含相同code属性值
>- **desc** `String` 错误信息，对于错误返回是有效，正常返回是desc为undefined，第一参数result中也包含相同desc属性值
- **shrinkData** `Boolean` 可选，是否简化返回数据，默认true，只返回数据中 Data.RepXXX 对应的数据，设置为false可以直接得到Data的数据
- **return** `Request` 返回内置的Request请求对象，具体说明如下
>- Request.prototype.qid `String` 请求的qid
>- Request.prototype.on(type, callback) 事件监听方法，参数如下
>>- **type** `String` 监听的事件类型，可以监听的事件有'message'/'error'，对应的就是成功接收到消息和接收到错误的事件回调
>>- **callback** `Function` 回调方法，回调参数和上面query的callback参数相同
>>- **return** `Request` 调用后返回本身Request对象
>- Request.prototype.onmessage(callback) 对应 on('message', callback) 的简写
>- Request.prototype.onerror(callback) 对应 on('error', callback) 的简写
>- Request.prototype.then(successCallback, errorCallback) 提供类Promise接口，调用后返回的是标准的Promise对象，注意Promise的回调只会调用一次，最好不要用在订阅请求中
>- Request.prototype.catch(errorCallback) 提供类Promise接口，调用后返回的是标准的Promise对象
>- Request.prototype.cancel() 取消该请求

Dzhyun.prototype.subscribe(url, params, callback, shrinkData) 订阅查询指定的接口，参数和返回值与query方法相同，调用默认带上sub=1的参数

Dzhyun.prototype.cancel(qid) 取消指定qid的请求，对于尚未发出的请求直接取消，已发出的订阅请求则会发出/cancel?qid=xxx取消对应的请求
- **qid** `String` 可选，指定的请求qid，如果没有指定则取消所有请求

Dzhyun.prototype.close() 关闭连接，对于websocket连接有效

Dzhyun.prototype.on(type, callback) 事件监听方法，参数如下
>>- **type** `String` 监听的事件类型，可以监听的事件有'open'/'close'/'request'/'response'/'error'
>>- **callback** `Function` 回调方法
>>- **return** `Dzhyun` 调用后返回本身Dzhyun对象

Dzhyun.prototype.onopen(callback) 对应 on('open', callback) 的简写

Dzhyun.prototype.onclose(callback) 对应 on('close', callback) 的简写

Dzhyun.prototype.onrequest(callback) 对应 on('request', callback) 的简写

Dzhyun.prototype.onresponse(callback) 对应 on('response', callback) 的简写

Dzhyun.prototype.onerror(callback) 对应 on('error', callback) 的简写

##### 全局类型
Dzhyun.Connection DzhyunConnection类型，详细参照<https://github.com/huicloud/dzhyun-connection>

Dzhyun.DataParser DzhyunDataParser类型，详细参照<https://github.com/huicloud/dzhyun-dataparser>

### webpack插件使用
提供优化打包js的webpack插件，继承 dzhyun-dataparser/plugin.js 的功能外，另提供指定是否包含http或者websocket连接的功能
    
    import DzhyunPlugin from 'dzhyunjs/plugin'

    plugins: [
        ...
        new DzhyunPlugin({ 
          compress: true,
          pb: true,
          json: true,
          filterProto: false,
          http: true,
          websocket: true,
        })
    ],

参数说明，参照<https://github.com/huicloud/dzhyun-dataparser>
- **http** `Boolean` 可选，是否需要http协议请求数据的功能，默认true，如果设置为false则打包时会忽略相关的模块（dzhyun-connection/HttpConnection.js）
- **websocket** `Boolean` 可选，是否需要websocket协议请求数据的功能，默认true，如果设置为false则打包时会忽略相关的模块（dzhyun-connection/WebSocketConnection.js）
