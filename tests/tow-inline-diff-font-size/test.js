var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDANiDwHxPjVtjjJPjKAAAAAElFTkSuQmCC')
      .end();
  }
};