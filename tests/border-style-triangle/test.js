var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', 'data:image/png;base64,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')
      .end();
  }
};
