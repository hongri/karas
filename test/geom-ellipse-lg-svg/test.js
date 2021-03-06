var path = require('path');
var fs = require('fs');

module.exports = {
  'init': function(browser) {
    browser
      .url('file://' + path.join(__dirname, 'index.html'))
      .waitForElementVisible('body', 1000)
      .assert.value('input', '{"bb":[],"children":[{"bb":[],"children":[{"type":"item","tagName":"ellipse","props":[["cx",25],["cy",25],["rx",25],["ry",25],["fill","url(#karas-defs-0-1)"],["stroke","url(#karas-defs-0-0)"],["stroke-width",1]]}],"transform":[],"opacity":1,"type":"geom"},{"bb":[],"children":[{"type":"item","tagName":"ellipse","props":[["cx",25],["cy",75],["rx",12.5],["ry",12.5],["fill","url(#karas-defs-0-3)"],["stroke","url(#karas-defs-0-2)"],["stroke-width",1]]}],"transform":[],"opacity":1,"type":"geom"}],"transform":[],"opacity":1,"type":"dom","defs":[{"tagName":"linearGradient","props":[["x1",25],["y1",50],["x2",25],["y2",0]],"children":[{"tagName":"stop","props":[["stop-color","#F00"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","#00F"],["offset","100%"]]}],"uuid":"karas-defs-0-0"},{"tagName":"linearGradient","props":[["x1",25],["y1",-3.552713678800501e-15],["x2",25],["y2",50]],"children":[{"tagName":"stop","props":[["stop-color","#F00"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","#00F"],["offset","100%"]]}],"uuid":"karas-defs-0-1"},{"tagName":"linearGradient","props":[["x1",25],["y1",100],["x2",25],["y2",50]],"children":[{"tagName":"stop","props":[["stop-color","#F00"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","#00F"],["offset","100%"]]}],"uuid":"karas-defs-0-2"},{"tagName":"linearGradient","props":[["x1",25],["y1",50],["x2",25],["y2",100]],"children":[{"tagName":"stop","props":[["stop-color","#F00"],["offset","0%"]]},{"tagName":"stop","props":[["stop-color","#00F"],["offset","100%"]]}],"uuid":"karas-defs-0-3"}]}')
      .end();
  }
};
