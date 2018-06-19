const DzhyunDataParserPlugin = require('dzhyun-dataparser/plugin');

class DzhyunSDKPlugin {
  constructor(options = {}) {
    this.options = options;
  }

  apply(compiler) {
    compiler.apply(new DzhyunDataParserPlugin(this.options));

    const rules = compiler.options.module.rules || [];
    if (this.options.http === false) {
      rules.push({
        test: /HttpConnection\.js$/,
        use: 'null-loader',
      });
    }
    if (this.options.websocket === false) {
      rules.push({
        test: /WebSocketConnection\.js$/,
        use: 'null-loader',
      });
    }
    if (this.options.wxapp !== true) {
      rules.push({
        test: /wxadapter/,
        use: 'null-loader',
      });
    }
  }
}
module.exports = DzhyunSDKPlugin;
