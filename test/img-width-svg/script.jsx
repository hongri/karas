let o = karas.render(
  <svg width="360" height="360">
    <img src="../image.png" style={{width:200}}/>
  </svg>,
  '#test'
);
o.on(karas.Event.KARAS_REFRESH, function() {
  var input = document.querySelector('#base64');
  input.value = JSON.stringify(o.virtualDom);
});
