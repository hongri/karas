let o = karas.render(
  <canvas width="360" height="360">
    <span ref="t" style={{color:'#F00'}}>123</span>
  </canvas>,
  '#test'
);
let t = o.ref.t;
let animation = t.animate([
  {
    color: '#F00',
  },
  {
    color: '#00F',
  }
], {
  duration: 200,
});
let input = document.querySelector('input');
let n = 0;
o.on(karas.Event.KARAS_REFRESH, () => {
  input.value += '/' + ++n + ',' + t.computedStyle.color;
});
animation.finish();
input.value = o.__refreshLevel;
