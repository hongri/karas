var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",145.037109375],["fill","#000"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","40px"]],"content":"hello"}]}],"transform":[],"opacity":1,"type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",0],["y",169.306640625],["fill","#000"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","16px"]],"content":"hello"}]}],"transform":[],"opacity":1,"type":"dom"}],"transform":[],"opacity":1,"type":"dom"},{"bb":[],"children":[{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",100],["y",36.2109375],["fill","#000"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","40px"]],"content":"world"}]}],"transform":[],"opacity":1,"type":"dom"},{"bb":[],"children":[{"type":"text","children":[{"type":"item","tagName":"text","props":[["x",100],["y",100.3125],["fill","#000"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","60px"]],"content":"wor"},{"type":"item","tagName":"text","props":[["x",100],["y",169.306640625],["fill","#000"],["font-family","arial"],["font-weight",400],["font-style","normal"],["font-size","60px"]],"content":"ld"}]}],"transform":[],"opacity":1,"type":"dom"}],"transform":[],"opacity":1,"type":"dom"}],"transform":[],"opacity":1,"type":"dom","defs":[]}')
      .end();
  }
};
