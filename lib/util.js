'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _util = require('dzhyun-connection/lib/util');

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