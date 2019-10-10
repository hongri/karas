var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",14.484375],["fill","#000"],["font-family","arial"],["font-size","16px"]],"content":"456"}]}],"transform":[],"type":"dom"}],"transform":[],"type":"dom","defs":[]}')
      .moveToElement('svg', 1, 1)
      .mouseButtonClick(0)
      .assert.value('input', '1')
      .end();
  }
};
