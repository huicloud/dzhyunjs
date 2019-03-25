(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Dzhyun"] = factory();
	else
		root["Dzhyun"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Object.assign polyfill
if (typeof Object.assign !== 'function') {
  Object.assign = function assign(target) {
    // .length of function is 2
    if (target == null) {
      // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    var to = Object(target);

    for (var index = 0; index < (arguments.length <= 1 ? 0 : arguments.length - 1); index += 1) {
      var nextSource = arguments.length <= index + 1 ? undefined : arguments[index + 1];

      if (nextSource != null) {
        // Skip over if undefined or null
        for (var nextKey in nextSource) {
          // eslint-disable-line no-restricted-syntax
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

/**
 * connection基类
 */

var BaseConnection = function () {

  /**
   * 构造方法
   * @param {!string} address 连接地址
   * @param {!object} options 设置参数
   * @param {object=} handler 事件处理对象
   * @param {boolean=} secure 是否使用ssl(https 或者 wss)，默认根据页面url自动判断
   */
  function BaseConnection(address, options, handler, secure) {
    _classCallCheck(this, BaseConnection);

    if (typeof address !== 'string') {
      throw new Error('address is incorrect');
    }
    if (this.constructor === BaseConnection) {
      // eslint-disable-next-line no-use-before-define
      return getInstance(address, options, handler, secure);
    }
    this._address = address;
    this.options = options || {};

    if (typeof handler === 'boolean') {
      this._secure = handler;
      this._handler = null;
    } else {
      this._secure = secure || false;
      this._handler = handler;
    }

    // 默认协议
    this._protocol = 'http';

    this._listenerMap = {};
  }

  _createClass(BaseConnection, [{
    key: 'getAddress',
    value: function getAddress() {
      return this.getProtocol() + '://' + this._address.replace(/^(\w+:\/\/)?/, '');
    }
  }, {
    key: 'getProtocol',
    value: function getProtocol() {
      return this._protocol + (this._secure ? 's' : '');
    }

    // eslint-disable-next-line no-unused-vars,class-methods-use-this

  }, {
    key: 'request',
    value: function request(message, options) {}
  }, {
    key: 'send',
    value: function send(message, options) {
      return this.request(message, options);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'close',
    value: function close() {}

    /**
     * 事件监听接口
     */

  }, {
    key: 'on',
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
      }
      return this;
    }
  }, {
    key: 'trigger',
    value: function trigger(type) {
      var _this = this,
          _handler;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var listeners = this._listenerMap[type];
      if (listeners) listeners.forEach(function (listener) {
        return listener.apply(_this, args);
      });

      // 同时触发handler中对应方法
      if (this._handler && typeof this._handler[type] === 'function') (_handler = this._handler)[type].apply(_handler, args);
      return this;
    }
  }]);

  return BaseConnection;
}();

BaseConnection.EVENT_OPEN = 'open';
BaseConnection.EVENT_CLOSE = 'close';
BaseConnection.EVENT_ERROR = 'error';
BaseConnection.EVENT_REQUEST = 'request';
BaseConnection.EVENT_SEND = 'send';
BaseConnection.EVENT_RESPONSE = 'response';
BaseConnection.EVENT_MESSAGE = 'message';
BaseConnection.EVENT_PROGRESS = 'progress';

function getDefaultSecure() {
  if (typeof window !== 'undefined' && window.location) {
    return (/^https:/.test(window.location.href)
    );
  }
  return false;
}

function getInstance(url, options, handler) {
  var secure = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : getDefaultSecure();

  var _$exec = /^((\w+)s*:\/\/)?(.*)/.exec(url),
      _$exec2 = _slicedToArray(_$exec, 4),
      _$exec2$ = _$exec2[2],
      p = _$exec2$ === undefined ? 'http' : _$exec2$,
      urlWithoutProtocol = _$exec2[3];

  var protocol = secure ? p + 's' : p;
  var func = BaseConnection[protocol];
  if (!func) {
    throw new Error('protocol "' + protocol + '" no support');
  }
  return func(urlWithoutProtocol, options, handler);
}

exports.default = BaseConnection;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.serialize = serialize;
exports.param = param;
function serialize(params, obj, traditional, scope) {
  var array = obj instanceof Array;
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];

    // eslint-disable-next-line no-param-reassign
    if (scope) key = traditional ? scope : 'scope[' + (array ? '' : key) + ']'; // scope + '[' + (array ? '' : key) + ']'
    // handle data in serializeArray() format
    if (!scope && array) params.add(value.name, value.value);
    // recurse into nested objects
    else if (traditional ? value instanceof Array : (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') serialize(params, value, traditional, key);else params.add(key, value);
  });
}

function param(obj, traditional) {
  var params = [];
  params.add = function add(k, v) {
    this.push(encodeURIComponent(k) + '=' + encodeURIComponent(v));
  };
  serialize(params, obj, traditional);
  return params.join('&').replace('%20', '+');
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToArrayBuffer = stringToArrayBuffer;
exports.arrayBufferToString = arrayBufferToString;
function stringToArrayBuffer(str) {
  var strLen = str.length;
  var buf = new ArrayBuffer(strLen * 2); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0; i < strLen; i += 1) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

function arrayBufferToString(arrayBuffer) {
  var uint8Array = new Uint8Array(arrayBuffer);
  var length = uint8Array.length;
  if (length > 65535) {
    var results = [];
    var start = 0;
    do {
      var subArray = uint8Array.subarray(start, start += 65535);
      results.push(String.fromCharCode.apply(String, subArray));
    } while (start < length);

    return decodeURIComponent(escape(results.join('')));
  }
  return decodeURIComponent(escape(String.fromCharCode.apply(String, uint8Array)));
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*! (c) 2017 Andrea Giammarchi (ISC) */
var EventTarget=function(){"use strict";var t="object"==typeof global?global:self,e=[].findIndex||function(t,e){for(var n=this.length;n--;)if(t.call(e,this[n]))return n;return n},n=Object.defineProperty,r="__event-target__"+Math.random(),i=t.WeakMap||function(){return{get:function(t){return t[r]},set:function(t,e){n(t,r,{configurable:!0,value:e})}}},a=t.EventTarget;try{new a}catch(o){a=function(){function t(){}function r(t){var e=t.options;e&&e.once&&u.call(t.target,this.type,t.listener,t.options),"function"==typeof t.listener?t.listener.call(t.target,this):t.listener.handleEvent(this)}function a(t){return this===t.listener}function o(t,n,r){var i=f(this),o=i[t]||(i[t]=[]);e.call(o,a,n)<0&&o.push({target:this,listener:n,options:r})}function c(t){var e=f(this),n=e[t.type];return n&&(h(t,{currentTarget:this,target:this}),n.forEach(r,t),delete t.currentTarget,delete t.target),!0}function u(t,n,r){var i=f(this),o=i[t];if(o){var c=e.call(o,a,n);-1<c&&o.splice(c,1)}}function l(){}var s=new i,f=function(t){return s.get(t)||v(t)},v=function(t){var e=new l;return s.set(t,e),e},h=function(t,e){for(var r in e)n(t,r,{configurable:!0,value:e[r]})};return h(t.prototype,{addEventListener:o,dispatchEvent:c,removeEventListener:u}),l.prototype=Object.create(null),t}()}return a}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var punycode = __webpack_require__(20);
var util = __webpack_require__(25);

exports.parse = urlParse;
exports.resolve = urlResolve;
exports.resolveObject = urlResolveObject;
exports.format = urlFormat;

exports.Url = Url;

function Url() {
  this.protocol = null;
  this.slashes = null;
  this.auth = null;
  this.host = null;
  this.port = null;
  this.hostname = null;
  this.hash = null;
  this.search = null;
  this.query = null;
  this.pathname = null;
  this.path = null;
  this.href = null;
}

// Reference: RFC 3986, RFC 1808, RFC 2396

// define these here so at least they only have to be
// compiled once on the first module load.
var protocolPattern = /^([a-z0-9.+-]+:)/i,
    portPattern = /:[0-9]*$/,

    // Special case for a simple path URL
    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,

    // RFC 2396: characters reserved for delimiting URLs.
    // We actually just auto-escape these.
    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],

    // RFC 2396: characters not allowed for various reasons.
    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),

    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
    autoEscape = ['\''].concat(unwise),
    // Characters that are never ever allowed in a hostname.
    // Note that any invalid chars are also handled, but these
    // are the ones that are *expected* to be seen, so we fast-path
    // them.
    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
    hostEndingChars = ['/', '?', '#'],
    hostnameMaxLen = 255,
    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
    // protocols that can allow "unsafe" and "unwise" chars.
    unsafeProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that never have a hostname.
    hostlessProtocol = {
      'javascript': true,
      'javascript:': true
    },
    // protocols that always contain a // bit.
    slashedProtocol = {
      'http': true,
      'https': true,
      'ftp': true,
      'gopher': true,
      'file': true,
      'http:': true,
      'https:': true,
      'ftp:': true,
      'gopher:': true,
      'file:': true
    },
    querystring = __webpack_require__(23);

function urlParse(url, parseQueryString, slashesDenoteHost) {
  if (url && util.isObject(url) && url instanceof Url) return url;

  var u = new Url;
  u.parse(url, parseQueryString, slashesDenoteHost);
  return u;
}

Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
  if (!util.isString(url)) {
    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
  }

  // Copy chrome, IE, opera backslash-handling behavior.
  // Back slashes before the query string get converted to forward slashes
  // See: https://code.google.com/p/chromium/issues/detail?id=25916
  var queryIndex = url.indexOf('?'),
      splitter =
          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
      uSplit = url.split(splitter),
      slashRegex = /\\/g;
  uSplit[0] = uSplit[0].replace(slashRegex, '/');
  url = uSplit.join(splitter);

  var rest = url;

  // trim before proceeding.
  // This is to support parse stuff like "  http://foo.com  \n"
  rest = rest.trim();

  if (!slashesDenoteHost && url.split('#').length === 1) {
    // Try fast path regexp
    var simplePath = simplePathPattern.exec(rest);
    if (simplePath) {
      this.path = rest;
      this.href = rest;
      this.pathname = simplePath[1];
      if (simplePath[2]) {
        this.search = simplePath[2];
        if (parseQueryString) {
          this.query = querystring.parse(this.search.substr(1));
        } else {
          this.query = this.search.substr(1);
        }
      } else if (parseQueryString) {
        this.search = '';
        this.query = {};
      }
      return this;
    }
  }

  var proto = protocolPattern.exec(rest);
  if (proto) {
    proto = proto[0];
    var lowerProto = proto.toLowerCase();
    this.protocol = lowerProto;
    rest = rest.substr(proto.length);
  }

  // figure out if it's got a host
  // user@server is *always* interpreted as a hostname, and url
  // resolution will treat //foo/bar as host=foo,path=bar because that's
  // how the browser resolves relative URLs.
  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
    var slashes = rest.substr(0, 2) === '//';
    if (slashes && !(proto && hostlessProtocol[proto])) {
      rest = rest.substr(2);
      this.slashes = true;
    }
  }

  if (!hostlessProtocol[proto] &&
      (slashes || (proto && !slashedProtocol[proto]))) {

    // there's a hostname.
    // the first instance of /, ?, ;, or # ends the host.
    //
    // If there is an @ in the hostname, then non-host chars *are* allowed
    // to the left of the last @ sign, unless some host-ending character
    // comes *before* the @-sign.
    // URLs are obnoxious.
    //
    // ex:
    // http://a@b@c/ => user:a@b host:c
    // http://a@b?@c => user:a host:c path:/?@c

    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
    // Review our test case against browsers more comprehensively.

    // find the first instance of any hostEndingChars
    var hostEnd = -1;
    for (var i = 0; i < hostEndingChars.length; i++) {
      var hec = rest.indexOf(hostEndingChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }

    // at this point, either we have an explicit point where the
    // auth portion cannot go past, or the last @ char is the decider.
    var auth, atSign;
    if (hostEnd === -1) {
      // atSign can be anywhere.
      atSign = rest.lastIndexOf('@');
    } else {
      // atSign must be in auth portion.
      // http://a@b/c@d => host:b auth:a path:/c@d
      atSign = rest.lastIndexOf('@', hostEnd);
    }

    // Now we have a portion which is definitely the auth.
    // Pull that off.
    if (atSign !== -1) {
      auth = rest.slice(0, atSign);
      rest = rest.slice(atSign + 1);
      this.auth = decodeURIComponent(auth);
    }

    // the host is the remaining to the left of the first non-host char
    hostEnd = -1;
    for (var i = 0; i < nonHostChars.length; i++) {
      var hec = rest.indexOf(nonHostChars[i]);
      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
        hostEnd = hec;
    }
    // if we still have not hit it, then the entire thing is a host.
    if (hostEnd === -1)
      hostEnd = rest.length;

    this.host = rest.slice(0, hostEnd);
    rest = rest.slice(hostEnd);

    // pull out port.
    this.parseHost();

    // we've indicated that there is a hostname,
    // so even if it's empty, it has to be present.
    this.hostname = this.hostname || '';

    // if hostname begins with [ and ends with ]
    // assume that it's an IPv6 address.
    var ipv6Hostname = this.hostname[0] === '[' &&
        this.hostname[this.hostname.length - 1] === ']';

    // validate a little.
    if (!ipv6Hostname) {
      var hostparts = this.hostname.split(/\./);
      for (var i = 0, l = hostparts.length; i < l; i++) {
        var part = hostparts[i];
        if (!part) continue;
        if (!part.match(hostnamePartPattern)) {
          var newpart = '';
          for (var j = 0, k = part.length; j < k; j++) {
            if (part.charCodeAt(j) > 127) {
              // we replace non-ASCII char with a temporary placeholder
              // we need this to make sure size of hostname is not
              // broken by replacing non-ASCII by nothing
              newpart += 'x';
            } else {
              newpart += part[j];
            }
          }
          // we test again with ASCII char only
          if (!newpart.match(hostnamePartPattern)) {
            var validParts = hostparts.slice(0, i);
            var notHost = hostparts.slice(i + 1);
            var bit = part.match(hostnamePartStart);
            if (bit) {
              validParts.push(bit[1]);
              notHost.unshift(bit[2]);
            }
            if (notHost.length) {
              rest = '/' + notHost.join('.') + rest;
            }
            this.hostname = validParts.join('.');
            break;
          }
        }
      }
    }

    if (this.hostname.length > hostnameMaxLen) {
      this.hostname = '';
    } else {
      // hostnames are always lower case.
      this.hostname = this.hostname.toLowerCase();
    }

    if (!ipv6Hostname) {
      // IDNA Support: Returns a punycoded representation of "domain".
      // It only converts parts of the domain name that
      // have non-ASCII characters, i.e. it doesn't matter if
      // you call it with a domain that already is ASCII-only.
      this.hostname = punycode.toASCII(this.hostname);
    }

    var p = this.port ? ':' + this.port : '';
    var h = this.hostname || '';
    this.host = h + p;
    this.href += this.host;

    // strip [ and ] from the hostname
    // the host field still retains them, though
    if (ipv6Hostname) {
      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
      if (rest[0] !== '/') {
        rest = '/' + rest;
      }
    }
  }

  // now rest is set to the post-host stuff.
  // chop off any delim chars.
  if (!unsafeProtocol[lowerProto]) {

    // First, make 100% sure that any "autoEscape" chars get
    // escaped, even if encodeURIComponent doesn't think they
    // need to be.
    for (var i = 0, l = autoEscape.length; i < l; i++) {
      var ae = autoEscape[i];
      if (rest.indexOf(ae) === -1)
        continue;
      var esc = encodeURIComponent(ae);
      if (esc === ae) {
        esc = escape(ae);
      }
      rest = rest.split(ae).join(esc);
    }
  }


  // chop off from the tail first.
  var hash = rest.indexOf('#');
  if (hash !== -1) {
    // got a fragment string.
    this.hash = rest.substr(hash);
    rest = rest.slice(0, hash);
  }
  var qm = rest.indexOf('?');
  if (qm !== -1) {
    this.search = rest.substr(qm);
    this.query = rest.substr(qm + 1);
    if (parseQueryString) {
      this.query = querystring.parse(this.query);
    }
    rest = rest.slice(0, qm);
  } else if (parseQueryString) {
    // no query string, but parseQueryString still requested
    this.search = '';
    this.query = {};
  }
  if (rest) this.pathname = rest;
  if (slashedProtocol[lowerProto] &&
      this.hostname && !this.pathname) {
    this.pathname = '/';
  }

  //to support http.request
  if (this.pathname || this.search) {
    var p = this.pathname || '';
    var s = this.search || '';
    this.path = p + s;
  }

  // finally, reconstruct the href based on what has been validated.
  this.href = this.format();
  return this;
};

// format a parsed object into a url string
function urlFormat(obj) {
  // ensure it's an object, and not a string url.
  // If it's an obj, this is a no-op.
  // this way, you can call url_format() on strings
  // to clean up potentially wonky urls.
  if (util.isString(obj)) obj = urlParse(obj);
  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
  return obj.format();
}

Url.prototype.format = function() {
  var auth = this.auth || '';
  if (auth) {
    auth = encodeURIComponent(auth);
    auth = auth.replace(/%3A/i, ':');
    auth += '@';
  }

  var protocol = this.protocol || '',
      pathname = this.pathname || '',
      hash = this.hash || '',
      host = false,
      query = '';

  if (this.host) {
    host = auth + this.host;
  } else if (this.hostname) {
    host = auth + (this.hostname.indexOf(':') === -1 ?
        this.hostname :
        '[' + this.hostname + ']');
    if (this.port) {
      host += ':' + this.port;
    }
  }

  if (this.query &&
      util.isObject(this.query) &&
      Object.keys(this.query).length) {
    query = querystring.stringify(this.query);
  }

  var search = this.search || (query && ('?' + query)) || '';

  if (protocol && protocol.substr(-1) !== ':') protocol += ':';

  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
  // unless they had them to begin with.
  if (this.slashes ||
      (!protocol || slashedProtocol[protocol]) && host !== false) {
    host = '//' + (host || '');
    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
  } else if (!host) {
    host = '';
  }

  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
  if (search && search.charAt(0) !== '?') search = '?' + search;

  pathname = pathname.replace(/[?#]/g, function(match) {
    return encodeURIComponent(match);
  });
  search = search.replace('#', '%23');

  return protocol + host + pathname + search + hash;
};

function urlResolve(source, relative) {
  return urlParse(source, false, true).resolve(relative);
}

Url.prototype.resolve = function(relative) {
  return this.resolveObject(urlParse(relative, false, true)).format();
};

function urlResolveObject(source, relative) {
  if (!source) return relative;
  return urlParse(source, false, true).resolveObject(relative);
}

Url.prototype.resolveObject = function(relative) {
  if (util.isString(relative)) {
    var rel = new Url();
    rel.parse(relative, false, true);
    relative = rel;
  }

  var result = new Url();
  var tkeys = Object.keys(this);
  for (var tk = 0; tk < tkeys.length; tk++) {
    var tkey = tkeys[tk];
    result[tkey] = this[tkey];
  }

  // hash is always overridden, no matter what.
  // even href="" will remove it.
  result.hash = relative.hash;

  // if the relative url is empty, then there's nothing left to do here.
  if (relative.href === '') {
    result.href = result.format();
    return result;
  }

  // hrefs like //foo/bar always cut to the protocol.
  if (relative.slashes && !relative.protocol) {
    // take everything except the protocol from relative
    var rkeys = Object.keys(relative);
    for (var rk = 0; rk < rkeys.length; rk++) {
      var rkey = rkeys[rk];
      if (rkey !== 'protocol')
        result[rkey] = relative[rkey];
    }

    //urlParse appends trailing / to urls like http://www.example.com
    if (slashedProtocol[result.protocol] &&
        result.hostname && !result.pathname) {
      result.path = result.pathname = '/';
    }

    result.href = result.format();
    return result;
  }

  if (relative.protocol && relative.protocol !== result.protocol) {
    // if it's a known url protocol, then changing
    // the protocol does weird things
    // first, if it's not file:, then we MUST have a host,
    // and if there was a path
    // to begin with, then we MUST have a path.
    // if it is file:, then the host is dropped,
    // because that's known to be hostless.
    // anything else is assumed to be absolute.
    if (!slashedProtocol[relative.protocol]) {
      var keys = Object.keys(relative);
      for (var v = 0; v < keys.length; v++) {
        var k = keys[v];
        result[k] = relative[k];
      }
      result.href = result.format();
      return result;
    }

    result.protocol = relative.protocol;
    if (!relative.host && !hostlessProtocol[relative.protocol]) {
      var relPath = (relative.pathname || '').split('/');
      while (relPath.length && !(relative.host = relPath.shift()));
      if (!relative.host) relative.host = '';
      if (!relative.hostname) relative.hostname = '';
      if (relPath[0] !== '') relPath.unshift('');
      if (relPath.length < 2) relPath.unshift('');
      result.pathname = relPath.join('/');
    } else {
      result.pathname = relative.pathname;
    }
    result.search = relative.search;
    result.query = relative.query;
    result.host = relative.host || '';
    result.auth = relative.auth;
    result.hostname = relative.hostname || relative.host;
    result.port = relative.port;
    // to support http.request
    if (result.pathname || result.search) {
      var p = result.pathname || '';
      var s = result.search || '';
      result.path = p + s;
    }
    result.slashes = result.slashes || relative.slashes;
    result.href = result.format();
    return result;
  }

  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
      isRelAbs = (
          relative.host ||
          relative.pathname && relative.pathname.charAt(0) === '/'
      ),
      mustEndAbs = (isRelAbs || isSourceAbs ||
                    (result.host && relative.pathname)),
      removeAllDots = mustEndAbs,
      srcPath = result.pathname && result.pathname.split('/') || [],
      relPath = relative.pathname && relative.pathname.split('/') || [],
      psychotic = result.protocol && !slashedProtocol[result.protocol];

  // if the url is a non-slashed url, then relative
  // links like ../.. should be able
  // to crawl up to the hostname, as well.  This is strange.
  // result.protocol has already been set by now.
  // Later on, put the first path part into the host field.
  if (psychotic) {
    result.hostname = '';
    result.port = null;
    if (result.host) {
      if (srcPath[0] === '') srcPath[0] = result.host;
      else srcPath.unshift(result.host);
    }
    result.host = '';
    if (relative.protocol) {
      relative.hostname = null;
      relative.port = null;
      if (relative.host) {
        if (relPath[0] === '') relPath[0] = relative.host;
        else relPath.unshift(relative.host);
      }
      relative.host = null;
    }
    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
  }

  if (isRelAbs) {
    // it's absolute.
    result.host = (relative.host || relative.host === '') ?
                  relative.host : result.host;
    result.hostname = (relative.hostname || relative.hostname === '') ?
                      relative.hostname : result.hostname;
    result.search = relative.search;
    result.query = relative.query;
    srcPath = relPath;
    // fall through to the dot-handling below.
  } else if (relPath.length) {
    // it's relative
    // throw away the existing file, and take the new path instead.
    if (!srcPath) srcPath = [];
    srcPath.pop();
    srcPath = srcPath.concat(relPath);
    result.search = relative.search;
    result.query = relative.query;
  } else if (!util.isNullOrUndefined(relative.search)) {
    // just pull out the search.
    // like href='?foo'.
    // Put this after the other two cases because it simplifies the booleans
    if (psychotic) {
      result.hostname = result.host = srcPath.shift();
      //occationaly the auth can get stuck only in host
      //this especially happens in cases like
      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
      var authInHost = result.host && result.host.indexOf('@') > 0 ?
                       result.host.split('@') : false;
      if (authInHost) {
        result.auth = authInHost.shift();
        result.host = result.hostname = authInHost.shift();
      }
    }
    result.search = relative.search;
    result.query = relative.query;
    //to support http.request
    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
      result.path = (result.pathname ? result.pathname : '') +
                    (result.search ? result.search : '');
    }
    result.href = result.format();
    return result;
  }

  if (!srcPath.length) {
    // no path at all.  easy.
    // we've already handled the other stuff above.
    result.pathname = null;
    //to support http.request
    if (result.search) {
      result.path = '/' + result.search;
    } else {
      result.path = null;
    }
    result.href = result.format();
    return result;
  }

  // if a url ENDs in . or .., then it must get a trailing slash.
  // however, if it ends in anything else non-slashy,
  // then it must NOT get a trailing slash.
  var last = srcPath.slice(-1)[0];
  var hasTrailingSlash = (
      (result.host || relative.host || srcPath.length > 1) &&
      (last === '.' || last === '..') || last === '');

  // strip single dots, resolve double dots to parent dir
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = srcPath.length; i >= 0; i--) {
    last = srcPath[i];
    if (last === '.') {
      srcPath.splice(i, 1);
    } else if (last === '..') {
      srcPath.splice(i, 1);
      up++;
    } else if (up) {
      srcPath.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (!mustEndAbs && !removeAllDots) {
    for (; up--; up) {
      srcPath.unshift('..');
    }
  }

  if (mustEndAbs && srcPath[0] !== '' &&
      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
    srcPath.unshift('');
  }

  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
    srcPath.push('');
  }

  var isAbsolute = srcPath[0] === '' ||
      (srcPath[0] && srcPath[0].charAt(0) === '/');

  // put the host back
  if (psychotic) {
    result.hostname = result.host = isAbsolute ? '' :
                                    srcPath.length ? srcPath.shift() : '';
    //occationaly the auth can get stuck only in host
    //this especially happens in cases like
    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
    var authInHost = result.host && result.host.indexOf('@') > 0 ?
                     result.host.split('@') : false;
    if (authInHost) {
      result.auth = authInHost.shift();
      result.host = result.hostname = authInHost.shift();
    }
  }

  mustEndAbs = mustEndAbs || (result.host && srcPath.length);

  if (mustEndAbs && !isAbsolute) {
    srcPath.unshift('');
  }

  if (!srcPath.length) {
    result.pathname = null;
    result.path = null;
  } else {
    result.pathname = srcPath.join('/');
  }

  //to support request.http
  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
    result.path = (result.pathname ? result.pathname : '') +
                  (result.search ? result.search : '');
  }
  result.auth = relative.auth || result.auth;
  result.slashes = result.slashes || relative.slashes;
  result.href = result.format();
  return result;
};

Url.prototype.parseHost = function() {
  var host = this.host;
  var port = portPattern.exec(host);
  if (port) {
    port = port[0];
    if (port !== ':') {
      this.port = port.substr(1);
    }
    host = host.substr(0, host.length - port.length);
  }
  if (host) this.hostname = host;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = __webpack_require__(1);

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _util[key];
    }
  });
});
exports.unParam = unParam;
function unParam(searchStr) {
  return (searchStr.indexOf('?') === 0 ? searchStr.substring(1) : searchStr).split('&').reduce(function (result, pair) {
    if (pair !== '') {
      var arr = pair.split('=');
      result[decodeURIComponent(arr[0])] = decodeURIComponent(arr.slice(1).join('=')); // eslint-disable-line
    }
    return result;
  }, {});
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _BaseConnection = __webpack_require__(0);

var _BaseConnection2 = _interopRequireDefault(_BaseConnection);

__webpack_require__(10);

__webpack_require__(12);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = _BaseConnection2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _snappyjsUncompress = __webpack_require__(18);

var _snappyjsUncompress2 = _interopRequireDefault(_snappyjsUncompress);

var _parseProtoBuf2 = __webpack_require__(19);

var _parseProtoBuf3 = _interopRequireDefault(_parseProtoBuf2);

var _parseJSON2 = __webpack_require__(17);

var _parseJSON3 = _interopRequireDefault(_parseJSON2);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DzhyunDataParser = function () {

  // options.compresser 压缩格式，默认不设置则根据数据自动判断，先直接解析数据失败了再解压后再次解析，
  // 'snappy'使用snappy压缩，解压时如果失败直接报错，false不使用压缩，直接解析数据失败直接报错
  // options.yfloat {bool} 是否将long类型数据做yfloat解析，默认不设置为true，设置为false则不解析, 不包括pbtable
  function DzhyunDataParser() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, DzhyunDataParser);

    this.options = options;
  }

  _createClass(DzhyunDataParser, [{
    key: 'parse',
    value: function parse(input) {
      var _this = this;

      return Promise.resolve().then(function () {
        return _this.options.compresser === 'snappy' ? DzhyunDataParser.uncompress(input) : input;
      }).then(function (data) {
        if (DzhyunDataParser.isJSON(data)) {
          return DzhyunDataParser.parseJSON(data);
        } else if (_this.options.compresser === undefined) {
          // 默认自动判断压缩时，当解析pb失败后再次解压后再尝试解析
          return DzhyunDataParser.parseProtoBuf(data, _this.options.yfloat !== false).catch(function (e) {
            return DzhyunDataParser.uncompress(data).catch(function () {
              throw e;
            }).then(_this.parse.bind(_this));
          });
        }
        return DzhyunDataParser.parseProtoBuf(data, _this.options.yfloat !== false);
      });
    }
  }], [{
    key: 'parseProtoBuf',
    value: function parseProtoBuf(data, parseYfloat) {
      return typeof _parseProtoBuf3.default === 'function' ? (0, _parseProtoBuf3.default)(data, parseYfloat) : Promise.reject(new Error('no support parse protobuf data'));
    }
  }, {
    key: 'parseJSON',
    value: function parseJSON(data) {
      return typeof _parseJSON3.default === 'function' ? (0, _parseJSON3.default)(data) : Promise.reject(new Error('no support parse JSON data'));
    }
  }, {
    key: 'isJSON',
    value: function isJSON(data) {
      var first = void 0;
      if (typeof data === 'string') {
        first = data.charCodeAt(0);
      } else if (data instanceof ArrayBuffer) {
        first = new Uint8Array(data)[0];
      }
      return first === 123;
    }
  }, {
    key: 'uncompress',
    value: function uncompress(data) {
      return Promise.resolve().then(function () {
        var result = data;
        if (typeof _snappyjsUncompress2.default !== 'function') throw new Error('no support snappy uncompress');
        if (typeof data === 'string') {
          result = (0, _util.stringToArrayBuffer)(result);
          result = (0, _snappyjsUncompress2.default)(result);
        } else {
          result = (0, _snappyjsUncompress2.default)(result);
        }
        return result;
      });
    }
  }]);

  return DzhyunDataParser;
}();

module.exports = DzhyunDataParser;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /* eslint-disable no-underscore-dangle */

var _dzhyunConnection = __webpack_require__(7);

var _dzhyunConnection2 = _interopRequireDefault(_dzhyunConnection);

var _dzhyunDataparser = __webpack_require__(8);

var _dzhyunDataparser2 = _interopRequireDefault(_dzhyunDataparser);

var _util = __webpack_require__(6);

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
        secure = _ref3.secure,
        _ref3$ping = _ref3.ping,
        ping = _ref3$ping === undefined ? false : _ref3$ping,
        _ref3$pingInterval = _ref3.pingInterval,
        pingInterval = _ref3$pingInterval === undefined ? 30 * 1000 : _ref3$pingInterval,
        _ref3$reconnect = _ref3.reconnect,
        reconnect = _ref3$reconnect === undefined ? false : _ref3$reconnect,
        _ref3$reconnectInterv = _ref3.reconnectInterval,
        reconnectInterval = _ref3$reconnectInterv === undefined ? 10 * 1000 : _ref3$reconnectInterv;

    _classCallCheck(this, Dzhyun);

    var _this5 = _possibleConstructorReturn(this, (Dzhyun.__proto__ || Object.getPrototypeOf(Dzhyun)).call(this));

    _this5.address = address;
    _this5.dataType = dataType;
    _this5.compresser = compresser;
    _this5.dataParser = dataParser || new _dzhyunDataparser2.default({ compresser: compresser });
    _this5.token = token;
    _this5.generateQid = generateQid || getQid;
    _this5.secure = secure;
    _this5.ping = ping;
    _this5.pingInterval = pingInterval;
    _this5.reconnect = reconnect;
    _this5.reconnectInterval = reconnectInterval;

    _this5._requests = {};
    _this5._resetReconnectCount();

    _this5.alias('open');
    _this5.alias('close');
    _this5.alias('request');
    _this5.alias('response');
    _this5.alias('error');
    return _this5;
  }

  _createClass(Dzhyun, [{
    key: '_tokenPromise',
    value: function _tokenPromise() {
      return Promise.resolve(this.token && this.token.getToken ? this.token.getToken() : this.token);
    }
  }, {
    key: '_connection',
    value: function _connection() {
      var _this6 = this;

      this._conn = this._conn || Promise.resolve().then(function () {
        return _this6._tokenPromise().catch(function (err) {
          return console.warn('request token fail', err);
        }).then(function (token) {
          var lastTime = void 0;
          var connection = new _dzhyunConnection2.default(_this6.address, { deferred: true }, {
            open: function open() {
              _this6.trigger('open');
              _this6._resetReconnectCount();

              // 通过发送/ping保持连接，默认每30秒发送一次
              lastTime = Date.now();
              if (_this6.ping) {
                var pingInterval = _this6.pingInterval;
                var ping = function ping() {
                  setTimeout(function () {
                    if (connection.getStatus() === 1) {
                      // 多计算5秒避免刚好两次30秒超过了后台的1分钟ping/pong判断
                      if (Date.now() - lastTime + 5 * 1000 >= pingInterval) {
                        connection.request('/ping');
                      }
                      ping();
                    }
                  }, pingInterval);
                };
                ping();
              }
            },
            request: function request(message) {
              lastTime = Date.now();
              if (message !== '/ping') {
                _this6.trigger('request', message);
              }
            },
            response: function response(data) {
              lastTime = Date.now();
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

                    if (!Qid) console.debug('Qid does not exist.');else {
                      var request = _this6._requests[Qid];
                      if (request) {
                        if (Err !== 0) {
                          // 服务端返回错误信息
                          var desc = Data.desc,
                              code = Data.code;

                          var error = new Error(desc || 'unknown error');
                          error.desc = desc;
                          error.code = code;
                          error.data = Data; // 将原始错误信息数据通过data属性暴露出去，使之可以处理复杂的嵌套错误
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
              _this6._conn = null;
              _this6.trigger('close');
              _this6._reconnect();
            },
            error: function error(err) {
              _this6._conn = null;
              _this6.trigger('error', err);
              _this6._reconnect();
            }
          }, _this6.secure);
          var connectionType = connection._protocol;
          if (token) {
            if (connectionType === 'ws' && connection._address.indexOf('token=') < 0) {
              connection._address = connection._address + '?token=' + token;
            }
          }
          _this6._conn = connection;
          // this._token = token;
          _this6._connectionType = connectionType;
          return _this6._conn;
        });
      });
      return Promise.resolve(this._conn);
    }
  }, {
    key: '_reconnect',
    value: function _reconnect() {
      var _this7 = this;

      if (this.reconnect === true || this.reconnect > this._reconnectCount) {
        if (this._reconnectTid) {
          clearTimeout(this._reconnectTid);
        }
        // 并不直接重连而是直接将现在的数据请求重新执行
        this._reconnectTid = setTimeout(function () {
          var requests = _this7._requests;
          Object.keys(_this7._requests).forEach(function (key) {
            return requests[key].start();
          });
          _this7._reconnectCount += 1;
          _this7.trigger('reconnect');
        }, this.reconnectInterval);
      }
    }
  }, {
    key: '_resetReconnectCount',
    value: function _resetReconnectCount() {
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

  }, {
    key: 'query',
    value: function query(url, params, callback, shrinkData, immediate) {
      var _this8 = this;

      if (typeof url !== 'string') throw new Error('url must be a string');
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
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
      request.cancel = this.cancel.bind(this, qid);
      request.start = function () {
        _this8._requests[qid] = request;
        var options = void 0;
        _this8._connection().then(function (conn) {
          if (_this8._connectionType === 'http') {
            options = queryObject.output === 'pb' ? { dataType: 'arraybuffer' } : undefined;
            return _this8._tokenPromise().then(function (token) {
              queryObject.token = token;
              return conn;
            });
          }
          return conn;
        }).then(function (conn) {
          var requestParams = formatParams(queryObject);
          conn.request(requestParams ? serviceUrl + '?' + requestParams : serviceUrl, options);
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
  }, {
    key: 'subscribe',
    value: function subscribe(url, params, callback, shrinkData, immediate) {
      if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) !== 'object') {
        shrinkData = callback; // eslint-disable-line
        callback = params; // eslint-disable-line
        params = {}; // eslint-disable-line
      }
      params = params || {}; // eslint-disable-line
      params.sub = 1; // eslint-disable-line
      return this.query(url, params, callback, shrinkData, immediate);
    }
  }, {
    key: '_cancelRequest',
    value: function _cancelRequest(qid) {
      if (this._connectionType === 'ws' && this._conn && this._conn.getStatus && this._conn.getStatus() === 1) {
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
      var _this9 = this;

      if (qid) {
        this._cancelRequest(qid);
        delete this._requests[qid];
      } else {
        var requests = this._requests;
        Object.keys(requests).forEach(function (eachQid) {
          _this9._cancelRequest(eachQid);
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseConnection2 = __webpack_require__(0);

var _BaseConnection3 = _interopRequireDefault(_BaseConnection2);

var _ajax = __webpack_require__(14);

var _ajax2 = _interopRequireDefault(_ajax);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HttpConnection = function (_BaseConnection) {
  _inherits(HttpConnection, _BaseConnection);

  function HttpConnection() {
    var _ref;

    _classCallCheck(this, HttpConnection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    // 用于记录当前未关闭的请求
    var _this = _possibleConstructorReturn(this, (_ref = HttpConnection.__proto__ || Object.getPrototypeOf(HttpConnection)).call.apply(_ref, [this].concat(args)));

    _this._request = [];
    return _this;
  }

  _createClass(HttpConnection, [{
    key: 'request',
    value: function request(message, options) {
      var _this2 = this;

      var ajaxOptions = Object.assign({}, this.options, options);
      var xhr = void 0;

      ajaxOptions.success = function (data) {
        _this2.trigger(_BaseConnection3.default.EVENT_MESSAGE, data);
        _this2.trigger(_BaseConnection3.default.EVENT_RESPONSE, data);
      };

      ajaxOptions.error = function (jqXHR, textStatus, errorThrown) {
        _this2.trigger(_BaseConnection3.default.EVENT_ERROR, errorThrown);
      };

      ajaxOptions.complete = function () {
        var index = _this2._request.indexOf(xhr);
        _this2._request.splice(index, 1);
      };

      ajaxOptions.url = this.getAddress() + (message || '');

      xhr = (0, _ajax2.default)(ajaxOptions);

      if (xhr) {
        xhr.onreadystatechange = function (origFun) {
          return function () {
            if (xhr.readyState === 2) {

              // 发出了请求
              _this2.trigger(_BaseConnection3.default.EVENT_SEND, message);
              _this2.trigger(_BaseConnection3.default.EVENT_REQUEST, message);
            }
            if (origFun) origFun();
          };
        }(xhr.onreadystatechange);
      }

      // 打开了连接
      this.trigger(_BaseConnection3.default.EVENT_OPEN);

      this._request.push(xhr);

      xhr.onprogress = function (event) {
        _this2.trigger(_BaseConnection3.default.EVENT_PROGRESS, event);
      };

      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      // 取消全部未结束的请求
      this._request.forEach(function (xhr, index) {
        xhr.abort();
        _this3._request.splice(index, 1);
      });

      this.trigger(_BaseConnection3.default.EVENT_CLOSE);
      return this;
    }
  }]);

  return HttpConnection;
}(_BaseConnection3.default);

_BaseConnection3.default.http = function http(url, options, handler) {
  return new HttpConnection(url, options, handler, false);
};

_BaseConnection3.default.https = function https(url, options, handler) {
  return new HttpConnection(url, options, handler, true);
};

module.exports = _BaseConnection3.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 小程序环境中存在全局对象wx
var ws = {};
if (typeof wx !== 'undefined') {
  ws = __webpack_require__(15);
} else {
  ws = __webpack_require__(27);
}

// WebSocket依赖，node环境使用模块ws
if (typeof window !== 'undefined') {
  if (window.WebSocket) {
    module.exports = window.WebSocket;
  } else {
    console.warn('当前浏览器不支持WebSocket');
  }
} else if (typeof WebSocket !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = WebSocket;
} else {
  module.exports = ws;
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BaseConnection2 = __webpack_require__(0);

var _BaseConnection3 = _interopRequireDefault(_BaseConnection2);

var _WebSocket = __webpack_require__(11);

var _WebSocket2 = _interopRequireDefault(_WebSocket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebSocketConnection = function (_BaseConnection) {
  _inherits(WebSocketConnection, _BaseConnection);

  /**
   * @param address
   * @param {{deferred: boolean}} options
   *  deferred: false 创建连接时马上连接websocket，默认
   *            true  延时在第一次请求时连接websocket
   * @param handler
   * @param secure
   */
  function WebSocketConnection(address, options, handler, secure) {
    _classCallCheck(this, WebSocketConnection);

    var _this = _possibleConstructorReturn(this, (WebSocketConnection.__proto__ || Object.getPrototypeOf(WebSocketConnection)).call(this, address, options, handler, secure));

    _this._protocol = 'ws';
    _this._ws = null;

    var deferred = options && options.deferred === true || false;

    if (deferred === false) {
      _this._connect();
    }
    // 在浏览器环境中，监听离线事件将手动中断ws连接
    if (typeof window !== 'undefined') {
      window.addEventListener('offline', function () {
        return _this.close();
      });
    }
    return _this;
  }

  _createClass(WebSocketConnection, [{
    key: 'getStatus',
    value: function getStatus() {
      return this._ws ? this._ws.readyState : _WebSocket2.default.CLOSED;
    }
  }, {
    key: '_connect',
    value: function _connect() {
      var _this2 = this;

      // 连接创建websocket
      if (typeof _WebSocket2.default !== 'undefined') {
        this._ws = new _WebSocket2.default(this.getAddress());

        // 避免WebSocket上没有状态静态值
        if (_WebSocket2.default.OPEN === undefined) {
          _WebSocket2.default.CONNECTING = this._ws.CONNECTING;
          _WebSocket2.default.OPEN = this._ws.OPEN;
          _WebSocket2.default.CLOSING = this._ws.CLOSING;
          _WebSocket2.default.CLOSED = this._ws.CLOSED;
        }
        this._ws.binaryType = this.options.binaryType || this.options.dataType || 'arraybuffer';

        this._ws.addEventListener('open', function () {
          _this2.trigger(_BaseConnection3.default.EVENT_OPEN);
        });
        this._ws.addEventListener('error', function (err) {
          _this2.trigger(_BaseConnection3.default.EVENT_ERROR, err);
        });
        this._ws.addEventListener('close', function () {
          _this2.trigger(_BaseConnection3.default.EVENT_CLOSE);
        });
        this._ws.addEventListener('message', function (message) {
          _this2.trigger(_BaseConnection3.default.EVENT_MESSAGE, message.data);
          _this2.trigger(_BaseConnection3.default.EVENT_RESPONSE, message.data);
        });
      } else {
        throw Error('Don\'t support WebSocket');
      }
    }
  }, {
    key: 'request',
    value: function request(message) {
      var _this3 = this;

      var msg = message || '';
      if (this.getStatus() === _WebSocket2.default.CLOSED) {
        this._connect();
      }

      if (this.getStatus() !== _WebSocket2.default.OPEN) {
        this._ws.addEventListener('open', function () {
          _this3._ws.send(msg);
          _this3.trigger(_BaseConnection3.default.EVENT_SEND, msg);
          _this3.trigger(_BaseConnection3.default.EVENT_REQUEST, msg);
        });
      } else {
        this._ws.send(msg);
        this.trigger(_BaseConnection3.default.EVENT_SEND, msg);
        this.trigger(_BaseConnection3.default.EVENT_REQUEST, msg);
      }
      return this;
    }
  }, {
    key: 'close',
    value: function close() {
      if (this.getStatus() !== _WebSocket2.default.CLOSED) {
        this._ws.close();
        this._ws = null;
      }
      return this;
    }
  }]);

  return WebSocketConnection;
}(_BaseConnection3.default);

_BaseConnection3.default.ws = function ws(url, options, handler) {
  return new WebSocketConnection(url, options, handler, false);
};

_BaseConnection3.default.wss = function wss(url, options, handler) {
  return new WebSocketConnection(url, options, handler, true);
};

module.exports = _BaseConnection3.default;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// 小程序环境中存在全局对象wx
var xhr2 = {};
if (typeof wx !== 'undefined') {
  xhr2 = __webpack_require__(16);
} else {
  xhr2 = __webpack_require__(28);
}

// 判断环境，浏览器环境存在window对象
if (typeof window !== 'undefined') {

  // 不考虑IE6以下的ActiveX方式
  if (window.XMLHttpRequest) {
    module.exports = window.XMLHttpRequest;
  } else {
    console.warn('当前浏览器不支持XMLHttpRequest');
  }
} else if (typeof XMLHttpRequest !== 'undefined') {
  // eslint-disable-next-line no-undef
  module.exports = XMLHttpRequest;
} else {

  // nodejs中使用xhr2模块
  module.exports = xhr2.XMLHttpRequest || xhr2;
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; /* eslint-disable */


var _XMLHttpRequest = __webpack_require__(13);

var _XMLHttpRequest2 = _interopRequireDefault(_XMLHttpRequest);

var _util = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 模拟jquery的ajax接口
 */

/**
 * 得到ArrayBuffer类型的响应数据
 * @param xhr
 * @returns {ArrayBuffer}
 */
function getArrayBufferResponse(xhr) {
  if (typeof ArrayBuffer === 'undefined') {
    throw new Error('不支持ArrayBuffer类型');
  } else if (xhr.response instanceof ArrayBuffer) {
    return xhr.response;
  } else {

    var text = xhr.responseText;
    var length = text.length;
    var buf = new ArrayBuffer(length);
    var bufView = new Uint8Array(buf);
    for (var i = 0; i < length; i += 1) {

      // "& 0xff"，表示在每个字符的两个字节之中，只保留后一个字节，将前一个字节扔掉。原因是浏览器解读字符的时候，会把字符自动解读成Unicode的0xF700-0xF7ff区段。
      // http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html
      // eslint-disable-next-line no-bitwise
      bufView[i] = text.charCodeAt(i) & 0xff;
    }
    return buf;
  }
}

/**
 * 得到Blob类型的响应数据
 * @param xhr
 */
function getBlobResponse(xhr) {
  if (typeof Blob === 'undefined') {
    throw new Error('不支持Blob类型');
  } else if (xhr.response instanceof Blob) {
    return xhr.response;
  } else {
    var buf = getArrayBufferResponse(xhr);

    // TODO 未知类型
    return new Blob([buf]);
  }
}

// 修改自https://github.com/ForbesLindesay/ajax
var jsonpID = 0,
    nodejs = typeof window === 'undefined',
    document = !nodejs && window.document,
    key,
    name,
    rscript = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    scriptTypeRE = /^(?:text|application)\/javascript/i,
    xmlTypeRE = /^(?:text|application)\/xml/i,
    jsonType = 'application/json',
    htmlType = 'text/html',
    blankRE = /^\s*$/;

var ajax = module.exports = function (options) {
  var settings = Object.assign({}, options || {});
  for (key in ajax.settings) {
    if (settings[key] === undefined) settings[key] = ajax.settings[key];
  }ajaxStart(settings);

  if (!settings.crossDomain) {
    settings.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(settings.url) && !nodejs && !!window.location && RegExp.$2 != window.location.host;
  }

  var dataType = settings.dataType,
      hasPlaceholder = /=\?/.test(settings.url);
  if (dataType == 'jsonp' || hasPlaceholder) {
    if (!hasPlaceholder) settings.url = appendQuery(settings.url, 'callback=?');
    return ajax.JSONP(settings);
  }

  if (!settings.url) settings.url = !nodejs && !!window.location && window.location.toString();
  serializeData(settings);

  var mime = settings.accepts[dataType],
      baseHeaders = {},
      protocol = /^([\w-]+:)\/\//.test(settings.url) ? RegExp.$1 : !nodejs && !!window.location && window.location.protocol,
      xhr = ajax.settings.xhr(),
      abortTimeout;

  if (!settings.crossDomain) baseHeaders['X-Requested-With'] = 'XMLHttpRequest';else if (typeof XDomainRequest !== 'undefined') {
    xhr = new XDomainRequest();
    xhr.onload = function () {
      xhr.readyState = 4;
      xhr.status = 200;
      xhr.onreadystatechange();
    };
    xhr.error = function () {
      xhr.readyState = 4;
      xhr.status = 400;
      xhr.onreadystatechange();
    };
  }
  if (mime) {
    baseHeaders['Accept'] = mime;
    if (mime.indexOf(',') > -1) mime = mime.split(',', 2)[0];
    xhr.overrideMimeType && xhr.overrideMimeType(mime);
  }
  if (settings.contentType || settings.data && settings.type.toUpperCase() != 'GET') baseHeaders['Content-Type'] = settings.contentType || 'application/x-www-form-urlencoded';
  settings.headers = Object.assign(baseHeaders, settings.headers || {});

  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      clearTimeout(abortTimeout);
      var result,
          error = false;
      if (xhr.status >= 200 && xhr.status < 300 || xhr.status == 304 || xhr.status == 0 && protocol == 'file:') {
        dataType = dataType || mimeToDataType(xhr.contentType || xhr.getResponseHeader && xhr.getResponseHeader('content-type'));

        try {
          if (dataType == 'script') (1, eval)(result);else if (dataType == 'xml') result = xhr.responseXML;else if (dataType == 'json') result = blankRE.test(xhr.responseText) ? null : JSON.parse(xhr.responseText);else if (dataType === 'arraybuffer') result = getArrayBufferResponse(xhr);else if (dataType === 'blob') result = getBlobResponse(xhr);else result = xhr.responseText;
        } catch (e) {
          error = e;
        }

        if (error) ajaxError(error, 'parsererror', xhr, settings);else ajaxSuccess(result, xhr, settings);
      } else {
        ajaxError(null, 'error', xhr, settings);
      }
    }
  };

  var async = 'async' in settings ? settings.async : true;
  xhr.open(settings.type, settings.url, async);

  if (dataType == 'arraybuffer' || dataType == 'blob') {

    // 因为IE的问题，只能将设置responseType的操作放在xhr.open之后
    // https://connect.microsoft.com/IE/feedback/details/795580/ie11-xmlhttprequest-incorrectly-throws-invalidstateerror-when-setting-responsetype
    // 判断是否支持设置responseType
    var supported = typeof xhr.responseType === 'string';

    // 支持二进制请求直接设置responseType
    if (supported) {

      // 响应类型默认arraybuffer，可以设置为blob（响应回来使用response取得数据）
      xhr.responseType = options.dataType;
    } else {

      // 不支持则尝试使用用户自定义的字符集方式（响应回来使用responseText取得数据）
      xhr.overrideMimeType ? xhr.overrideMimeType("text/plain; charset=x-user-defined") : xhr.setRequestHeader('Accept-Charset', 'x-user-defined');
    }
  }

  for (name in settings.headers) {
    xhr.setRequestHeader(name, settings.headers[name]);
  }if (ajaxBeforeSend(xhr, settings) === false) {
    xhr.abort();
    return false;
  }

  if (settings.timeout > 0) abortTimeout = setTimeout(function () {
    xhr.onreadystatechange = empty;
    xhr.abort();
    ajaxError(null, 'timeout', xhr, settings);
  }, settings.timeout);

  // avoid sending empty string (#319)
  xhr.send(settings.data ? settings.data : null);
  return xhr;
};

// trigger a custom event and return false if it was cancelled
function triggerAndReturn(context, eventName, data) {
  //todo: Fire off some events
  //var event = $.Event(eventName)
  //$(context).trigger(event, data)
  return true; //!event.defaultPrevented
}

// trigger an Ajax "global" event
function triggerGlobal(settings, context, eventName, data) {
  if (settings.global) return triggerAndReturn(context || document, eventName, data);
}

// Number of active Ajax requests
ajax.active = 0;

function ajaxStart(settings) {
  if (settings.global && ajax.active++ === 0) triggerGlobal(settings, null, 'ajaxStart');
}
function ajaxStop(settings) {
  if (settings.global && ! --ajax.active) triggerGlobal(settings, null, 'ajaxStop');
}

// triggers an extra global event "ajaxBeforeSend" that's like "ajaxSend" but cancelable
function ajaxBeforeSend(xhr, settings) {
  var context = settings.context;
  if (settings.beforeSend.call(context, xhr, settings) === false || triggerGlobal(settings, context, 'ajaxBeforeSend', [xhr, settings]) === false) return false;

  triggerGlobal(settings, context, 'ajaxSend', [xhr, settings]);
}
function ajaxSuccess(data, xhr, settings) {
  var context = settings.context,
      status = 'success';
  settings.success.call(context, data, status, xhr);
  triggerGlobal(settings, context, 'ajaxSuccess', [xhr, settings, data]);
  ajaxComplete(status, xhr, settings);
}
// type: "timeout", "error", "abort", "parsererror"
function ajaxError(error, type, xhr, settings) {
  var context = settings.context;
  settings.error.call(context, xhr, type, error);
  triggerGlobal(settings, context, 'ajaxError', [xhr, settings, error]);
  ajaxComplete(type, xhr, settings);
}
// status: "success", "notmodified", "error", "timeout", "abort", "parsererror"
function ajaxComplete(status, xhr, settings) {
  var context = settings.context;
  settings.complete.call(context, xhr, status);
  triggerGlobal(settings, context, 'ajaxComplete', [xhr, settings]);
  ajaxStop(settings);
}

// Empty function, used as default callback
function empty() {}

ajax.JSONP = function (options) {
  if (!('type' in options)) return ajax(options);

  var callbackName = 'jsonp' + ++jsonpID,
      script = document.createElement('script'),
      abort = function abort() {
    //todo: remove script
    //$(script).remove()
    if (!nodejs && callbackName in window) window[callbackName] = empty;
    ajaxComplete('abort', xhr, options);
  },
      xhr = { abort: abort },
      abortTimeout,
      head = document.getElementsByTagName("head")[0] || document.documentElement;

  if (options.error) script.onerror = function () {
    xhr.abort();
    options.error();
  };

  if (!nodejs) window[callbackName] = function (data) {
    clearTimeout(abortTimeout);
    //todo: remove script
    //$(script).remove()
    delete window[callbackName];
    ajaxSuccess(data, xhr, options);
  };

  serializeData(options);
  script.src = options.url.replace(/=\?/, '=' + callbackName);

  // Use insertBefore instead of appendChild to circumvent an IE6 bug.
  // This arises when a base node is used (see jQuery bugs #2709 and #4378).
  head.insertBefore(script, head.firstChild);

  if (options.timeout > 0) abortTimeout = setTimeout(function () {
    xhr.abort();
    ajaxComplete('timeout', xhr, options);
  }, options.timeout);

  return xhr;
};

ajax.settings = {
  // Default type of request
  type: 'GET',
  // Callback that is executed before request
  beforeSend: empty,
  // Callback that is executed if the request succeeds
  success: empty,
  // Callback that is executed the the server drops error
  error: empty,
  // Callback that is executed on request complete (both: error and success)
  complete: empty,
  // The context for the callbacks
  context: null,
  // Whether to trigger "global" Ajax events
  global: true,
  // Transport
  xhr: function xhr() {
    return new _XMLHttpRequest2.default();
  },
  // MIME types mapping
  accepts: {
    script: 'text/javascript, application/javascript',
    json: jsonType,
    xml: 'application/xml, text/xml',
    html: htmlType,
    text: 'text/plain'
  },
  // Whether the request is to another domain
  crossDomain: false,
  // Default timeout
  timeout: 0
};

function mimeToDataType(mime) {
  return mime && (mime == htmlType ? 'html' : mime == jsonType ? 'json' : scriptTypeRE.test(mime) ? 'script' : xmlTypeRE.test(mime) && 'xml') || 'text';
}

function appendQuery(url, query) {
  return (url + '&' + query).replace(/[&?]{1,2}/, '?');
}

// serialize payload and append it to the URL for GET requests
function serializeData(options) {
  if (_typeof(options.data) === 'object') options.data = (0, _util.param)(options.data);
  if (options.data && (!options.type || options.type.toUpperCase() == 'GET')) options.url = appendQuery(options.url, options.data);
}

ajax.get = function (url, success) {
  return ajax({ url: url, success: success });
};

ajax.post = function (url, data, success, dataType) {
  if (typeof data === 'function') dataType = dataType || success, success = data, data = null;
  return ajax({ type: 'POST', url: url, data: data, success: success, dataType: dataType });
};

ajax.getJSON = function (url, success) {
  return ajax({ url: url, success: success, dataType: 'json' });
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  https://www.w3.org/TR/2011/WD-websockets-20110419/
 */
// https://github.com/stackOverMind/WeApp-adapter/blob/master/src/WebSocket.js
var EventTarget = __webpack_require__(3);
var URL = __webpack_require__(4);

var WebSocket = function () {
  function WebSocket(url) {
    var _this = this;

    _classCallCheck(this, WebSocket);

    if (url == null) {
      throw new TypeError('1 argument needed');
    }
    try {
      var parsed = URL.parse(url);
      if (parsed.protocol != 'wss:') {
        throw new Error('protocol must be wss');
      }
    } catch (e) {
      throw new SyntaxError('url in wrong format,protocol must be wss');
    }
    //根据微信小程序API介绍 websocket是单例的
    if (WebSocket.instance != null) {
      WebSocket.instance.close(); //安全的关闭
    }
    WebSocket.instance = this;
    this.url = url;
    this.readyState = 0;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;
    this.onmessage = null;
    wx.connectSocket({
      url: url //API介绍比较模糊
    });
    wx.onSocketOpen(function () {
      _this.readyState = WebSocket.OPEN;
      if (_this.onopen) {
        _this.onopen.call(_this);
      }
      _this.dispatchEvent({ 'type': 'open' });
    });
    wx.onSocketError(function (e) {
      var event = { 'type': 'error', 'data': e };
      if (_this.onerror) {
        _this.onerror.call(_this, event);
      }
      _this.dispatchEvent(event);
    });
    wx.onSocketMessage(function (data) {

      if (_this.readyState !== WebSocket.OPEN && _this.readyState !== WebSocket.CLOSING) {
        return;
      }
      /* webmessage https://www.w3.org/TR/2010/WD-webmessaging-20101118/  */
      var event = { 'type': 'message', 'data': data.data //TODO origin ...
      };if (_this.onmessage) {
        _this.onmessage.call(_this, event);
      }
      _this.dispatchEvent(event);
    });
    wx.onSocketClose(function () {
      _this.readyState = WebSocket.CLOSED;
      if (_this.onclose) {
        var event = { 'type': 'close', 'wasClean': true, code: 0, reason: '' };
        _this.onclose.call(_this, event);
      }
    });
  }

  _createClass(WebSocket, [{
    key: 'close',
    value: function close() {
      wx.closeSocket();
    }
  }, {
    key: 'send',
    value: function send(data) {
      wx.sendSocketMessage({ data: data });
    }
  }]);

  return WebSocket;
}();

WebSocket.prototype.addEventListener = EventTarget.default.prototype.addEventListener;
WebSocket.prototype.removeEventListener = EventTarget.default.prototype.removeEventListener;
WebSocket.prototype.dispatchEvent = EventTarget.default.prototype.dispatchEvent;

WebSocket.CONNECTING = 0;
WebSocket.OPEN = 1;
WebSocket.CLOSING = 2;
WebSocket.CLOSED = 3;
WebSocket.instance = null;
module.exports = WebSocket;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//https://github.com/stackOverMind/WeApp-adapter/blob/master/src/XmlHttpRequst.js
var EventTarget = __webpack_require__(3);
var URL = __webpack_require__(4);

var XMLHttpRequestResponseTypes = ["", "arraybuffer", "blob", "document", "json", "text"];

var XmlHttpRequest = function () {
    function XmlHttpRequest() {
        _classCallCheck(this, XmlHttpRequest);

        this.onloadstart = null;
        this.onprogress = null;
        this.onabort = null;
        this.onerror = null;
        this.onload = null;
        this.ontimeout = null;
        this.onloadend = null;
        this.onreadystatechange = null;
        this._readystate = 0;
    }

    _createClass(XmlHttpRequest, [{
        key: 'open',
        value: function open() {}
    }, {
        key: 'send',
        value: function send() {}
    }, {
        key: 'abort',
        value: function abort() {}
    }, {
        key: 'getResponseHeader',
        value: function getResponseHeader() {}
    }, {
        key: 'getAllResponseHeaders',
        value: function getAllResponseHeaders() {}
    }, {
        key: 'overrideMimeType',
        value: function overrideMimeType() {}
    }, {
        key: 'readystate',
        get: function get() {
            return this._readystate;
        }
    }, {
        key: 'status',
        get: function get() {}
    }, {
        key: 'statusText',
        get: function get() {}
    }, {
        key: 'response',
        get: function get() {}
    }, {
        key: 'responseText',
        get: function get() {}
    }, {
        key: 'responseXML',
        get: function get() {}
    }]);

    return XmlHttpRequest;
}();

XmlHttpRequest.UNSENT = 0;
XmlHttpRequest.OPENED = 1;
XmlHttpRequest.HEADERS_RECEIVED = 2;
XmlHttpRequest.LOADING = 3;
XmlHttpRequest.DONE = 4;

module.exports = XmlHttpRequest;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseJSON;

var _util = __webpack_require__(2);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function convertToJsonArray(input) {
  if (!input || !input.head) return input;

  var head = input.head;
  var data = input.data;

  return data.map(function (row) {
    var rowObject = {};
    row.forEach(function (cell, columnIndex) {
      rowObject[head[columnIndex]] = convertToJsonArray(cell);
    });
    return rowObject;
  });
}

function parseJSON(input) {
  return Promise.resolve().then(function () {
    var json = typeof ArrayBuffer !== 'undefined' && input instanceof ArrayBuffer ? (0, _util.arrayBufferToString)(input) : input;
    var response = JSON.parse(json);
    if (response.Err !== 0) {
      return response;
    }

    var data = response.Data;
    if (data.JsonTbl) {
      var tbl = convertToJsonArray(data.JsonTbl);
      var key = Object.keys(tbl[0])[0];
      var value = tbl[0][key];
      data = _defineProperty({
        Id: data.Id
      }, key, value);
    }

    return {
      Qid: response.Qid,
      Err: response.Err,
      Counter: response.Counter,
      Data: data
    };
  });
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = uncompress;

var _snappy_decompressor = __webpack_require__(24);

function uncompress(compressed) {
  if (!(compressed instanceof ArrayBuffer)) {
    throw new TypeError('Argument compressed must be type of ArrayBuffer');
  }

  var decompressor = new _snappy_decompressor.SnappyDecompressor(new Uint8Array(compressed));
  var length = decompressor.readUncompressedLength();
  if (length === -1) {
    throw new Error('Invalid Snappy bitstream');
  }
  var uncompressed = new ArrayBuffer(length);
  var uncompressedView = new Uint8Array(uncompressed);
  if (!decompressor.uncompressToBuffer(uncompressedView)) {
    throw new Error('Invalid Snappy bitstream');
  }
  return uncompressed;
}

/***/ }),
/* 19 */
/***/ (function(module, exports) {

// empty (null-loader)

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.1 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.4.1',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(26)(module), __webpack_require__(5)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return map(obj[k], function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.decode = exports.parse = __webpack_require__(21);
exports.encode = exports.stringify = __webpack_require__(22);


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// The MIT License (MIT)
//
// Copyright (c) 2016 Zhipeng Jia
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.



var WORD_MASK = [0, 0xff, 0xffff, 0xffffff, 0xffffffff]

function copyBytes (from_array, from_pos, to_array, to_pos, length) {
  var i
  for (i = 0; i < length; i++) {
    to_array[to_pos + i] = from_array[from_pos + i]
  }
}

function selfCopyBytes (array, pos, offset, length) {
  var i
  for (i = 0; i < length; i++) {
    array[pos + i] = array[pos - offset + i]
  }
}

function SnappyDecompressor (compressed) {
  this.array = compressed
  this.pos = 0
}

SnappyDecompressor.prototype.readUncompressedLength = function () {
  var result = 0
  var shift = 0
  var c, val
  while (shift < 32 && this.pos < this.array.length) {
    c = this.array[this.pos]
    this.pos += 1
    val = c & 0x7f
    if (((val << shift) >>> shift) !== val) {
      return -1
    }
    result |= val << shift
    if (c < 128) {
      return result
    }
    shift += 7
  }
  return -1
}

SnappyDecompressor.prototype.uncompressToBuffer = function (out_buffer) {
  var array = this.array
  var array_length = array.length
  var pos = this.pos
  var out_pos = 0

  var c, len, small_len
  var offset

  while (pos < array.length) {
    c = array[pos]
    pos += 1
    if ((c & 0x3) === 0) {
      // Literal
      len = (c >>> 2) + 1
      if (len > 60) {
        if (pos + 3 >= array_length) {
          return false
        }
        small_len = len - 60
        len = array[pos] + (array[pos + 1] << 8) + (array[pos + 2] << 16) + (array[pos + 3] << 24)
        len = (len & WORD_MASK[small_len]) + 1
        pos += small_len
      }
      if (pos + len > array_length) {
        return false
      }
      copyBytes(array, pos, out_buffer, out_pos, len)
      pos += len
      out_pos += len
    } else {
      switch (c & 0x3) {
        case 1:
          len = ((c >>> 2) & 0x7) + 4
          offset = array[pos] + ((c >>> 5) << 8)
          pos += 1
          break
        case 2:
          if (pos + 1 >= array_length) {
            return false
          }
          len = (c >>> 2) + 1
          offset = array[pos] + (array[pos + 1] << 8)
          pos += 2
          break
        case 3:
          if (pos + 3 >= array_length) {
            return false
          }
          len = (c >>> 2) + 1
          offset = array[pos] + (array[pos + 1] << 8) + (array[pos + 2] << 16) + (array[pos + 3] << 24)
          pos += 4
          break
        default:
          break
      }
      if (offset === 0 || offset > out_pos) {
        return false
      }
      selfCopyBytes(out_buffer, out_pos, offset, len)
      out_pos += len
    }
  }
  return true
}

exports.SnappyDecompressor = SnappyDecompressor


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  isString: function(arg) {
    return typeof(arg) === 'string';
  },
  isObject: function(arg) {
    return typeof(arg) === 'object' && arg !== null;
  },
  isNull: function(arg) {
    return arg === null;
  },
  isNullOrUndefined: function(arg) {
    return arg == null;
  }
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 27 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
});
//# sourceMappingURL=dzhyun-wxapp.js.map