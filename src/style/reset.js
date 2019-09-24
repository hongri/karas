const RESET = {
  position: 'static',
  display: 'block',
  borderSizing: 'content-box',
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto',
  marginTop: 0,
  marginRight: 0,
  marginBottom: 0,
  marginLeft: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  fontSize: 16,
  fontFamily: 'arial',
  color: '#000',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal',
  borderTopWidth: 0,
  borderRightWidth: 0,
  borderBottomWidth: 0,
  borderLeftWidth: 0,
  borderTopColor: '#000',
  borderRightColor: '#000',
  borderBottomColor: '#000',
  borderLeftColor: '#000',
  borderTopStyle: 'solid',
  borderRightStyle: 'solid',
  borderBottomStyle: 'solid',
  borderLeftStyle: 'solid',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  verticalAlign: 'baseline',
  width: 'auto',
  height: 'auto',
  flexGrow: 0,
  flexShrink: 1,
  flexBasis: 'auto',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  textAlign: 'left',
  visibility: 'visible',
  fill: '#000',
  stroke: '#000',
  strokeWidth: 0,
  strokeDasharray: [],
};

let reset = [];

Object.keys(RESET).forEach(k => {
  let v = RESET[k];
  reset.push({
    k,
    v,
  });
});

export default reset;
