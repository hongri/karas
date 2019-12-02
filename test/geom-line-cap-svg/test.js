var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"path","props":[["d","M0,0 L100,100"],["fill","none"],["stroke","#000"],["stroke-width",10],["stroke-linecap","round"]]}],"transform":[],"opacity":1,"type":"geom"}],"transform":[],"opacity":1,"type":"dom","defs":[]}')
      .end();
  }
};
