karas.render(
  <canvas width="360" height="360">
    <$sector style={{width:50,height:50}} begin="0" end="30" edge="true"/>
    <$sector style={{width:50,height:50}} begin="0" end="30"/>
    <$sector style={{width:50,height:50,stroke:'linear-gradient(#F00,#00F)'}} begin="0" end="200" edge="true"/>
  </canvas>,
  '#test'
);
