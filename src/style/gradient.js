import util from "../util";

function getLinearDeg(v) {
  let deg = 180;
  if(v[0] === 'to top') {
    deg = 0;
  }
  else if(v[0] === 'to top right') {
    deg = 45;
  }
  else if(v[0] === 'to right') {
    deg = 90;
  }
  else if(v[0] === 'to bottom right') {
    deg = 135;
  }
  else if(v[0] === 'to bottom') {
  }
  else if(v[0] === 'to bottom left') {
    deg = 225;
  }
  else if(v[0] === 'to left') {
    deg = 270;
  }
  else if(v[0] === 'to top left') {
    deg = 315;
  }
  // 数字角度，没有的话取默认角度
  else {
    let match = /([\d.]+)deg/.exec(v[0]);
    if(match) {
      deg = parseFloat(match[1]);
    }
    else {
      v.unshift(null);
    }
  }
  while(deg >= 360) {
    deg = deg % 360;
  }
  while(deg < 0) {
    deg += 360;
  }
  return deg;
}

// 获取color-stop区间范围，去除无用值
function getColorStop(v, length) {
  let list = [];
  // 先把已经声明距离的换算成[0,1]以数组形式存入，未声明的原样存入
  for(let i = 1, len = v.length; i < len; i++) {
    let item = v[i];
    // 考虑是否声明了位置
    let arr = item.trim().split(/\s+/);
    if(arr.length > 1) {
      let c = arr[0];
      let p = arr[1];
      if(/%$/.test(p)) {
        list.push([c, parseFloat(p) * 0.01]);
      }
      else {
        list.push([c, parseFloat(p) / length]);
      }
    }
    else {
      list.push(arr[0]);
    }
  }
  // 首尾不声明默认为[0, 1]
  if(list.length > 1) {
    if(!Array.isArray(list[0])) {
      list[0] = [list[0], 0];
    }
    if(!Array.isArray(list[list.length - 1])) {
      list[list.length - 1] = [list[list.length - 1], 1];
    }
  }
  else if(!Array.isArray(list[0])) {
    list[0] = [list[0], 0];
  }
  // 不是数组形式的是未声明的，需区间计算，找到连续的未声明的，前后的区间平分
  let start = list[0][1];
  for(let i = 1, len = list.length; i < len - 1; i++) {
    let item = list[i];
    if(Array.isArray(item)) {
      start = item[1];
    }
    else {
      let j = i + 1;
      let end = list[list.length - 1][1];
      for(; j < len - 1; j++) {
        let item = list[j];
        if(Array.isArray(item)) {
          end = item[1];
          break;
        }
      }
      let num = j - i + 1;
      let per = (end - start) / num;
      for(let k = i;k < j; k++) {
        let item = list[k];
        list[k] = [item, start + per * (k + 1 - i)];
      }
      i = j;
    }
  }
  // 每个不能小于前面的，canvas/svg不能兼容这种情况，需处理
  for(let i = 1, len = list.length; i < len; i++) {
    let item = list[i];
    let prev = list[i - 1];
    if(item[1] < prev[1]) {
      item[1] = prev[1];
    }
  }
  // 0之前的和1之后的要过滤掉
  for(let i = 0, len = list.length; i < len - 1; i++) {
    let item = list[i];
    if(item[1] > 1) {
      list.splice(i + 1);
      break;
    }
  }
  for(let i = list.length - 1; i > 0; i--) {
    let item = list[i];
    if(item[1] < 0) {
      list.splice(0, i);
      break;
    }
  }
  // 可能存在超限情况，如在使用px单位超过len或<len时，canvas会报错超过[0,1]区间，需手动换算至区间内
  let len = list.length;
  // 在只有1个的情况下可简化
  if(len === 1) {
    list[0][1] = 0;
  }
  else {
    // 全部都在[0,1]之外也可以简化
    let allBefore = true;
    let allAfter = true;
    for(let i = len - 1; i >= 0; i--) {
      let item = list[i];
      let p = item[1];
      if(p > 0) {
        allBefore = false;
      }
      if(p < 1) {
        allAfter = false;
      }
    }
    if(allBefore) {
      list.splice(0, len - 1);
      list[0][1] = 0;
    }
    else if(allAfter) {
      list.splice(1);
      list[0][1] = 0;
    }
    // 部分在区间之外需复杂计算
    else {
      let first = list[0];
      let last = list[len - 1];
      // 只要2个的情况下就是首尾都落在外面
      if(len === 2) {
        if(first[1] < 0 && last[1] > 1) {
          getCsLimit(first, last, length);
        }
      }
      // 只有1个在外面的情况较为容易
      else {
        if(first[1] < 0) {
          let next = list[1];
          let c1 = util.rgb2int(first[0]);
          let c2 = util.rgb2int(next[0]);
          let c = getCsStartLimit(c1, first[1], c2, next[1], length);
          first[0] = `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
          first[1] = 0;
        }
        if(last[1] > 1) {
          let prev = list[len - 2];
          let c1 = util.rgb2int(prev[0]);
          let c2 = util.rgb2int(last[0]);
          let c = getCsEndLimit(c1, prev[1], c2, last[1], length);
          last[0] = `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
          last[1] = 1;
        }
      }
    }
  }
  // 防止精度计算溢出[0,1]
  list.forEach(item => {
    if(item[1] < 0) {
      item[1] = 0;
    }
    else if(item[1] > 1) {
      item[1] = 1;
    }
  });
  return list;
}

// 根据角度和圆心获取渐变的4个点坐标
function calLinearCoords(deg, length, cx, cy) {
  let x0;
  let y0;
  let x1;
  let y1;
  if(deg >= 270) {
    let r = util.r2d(360 - deg);
    x0 = cx + Math.sin(r) * length;
    y0 = cy + Math.cos(r) * length;
    x1 = cx - Math.sin(r) * length;
    y1 = cy - Math.cos(r) * length;
  }
  else if(deg >= 180) {
    let r = util.r2d(deg - 180);
    x0 = cx + Math.sin(r) * length;
    y0 = cy - Math.cos(r) * length;
    x1 = cx - Math.sin(r) * length;
    y1 = cy + Math.cos(r) * length;
  }
  else if(deg >= 90) {
    let r = util.r2d(180 - deg);
    x0 = cx - Math.sin(r) * length;
    y0 = cy - Math.cos(r) * length;
    x1 = cx + Math.sin(r) * length;
    y1 = cy + Math.cos(r) * length;
  }
  else {
    let r = util.r2d(deg);
    x0 = cx - Math.sin(r) * length;
    y0 = cy + Math.cos(r) * length;
    x1 = cx + Math.sin(r) * length;
    y1 = cy - Math.cos(r) * length;
  }
  return [x0, y0, x1, y1];
}

// 获取径向渐变半径
function calRadialRadius(v, iw, ih, cx, cy, x2, y2, x3, y3) {
  let size = 'farthest-corner';
  let r; // 半径
  if(/circle|ellipse|at|closest|farthest/i.test(v[0])
    || !/#[0-9a-f]{3,6}/i.test(v[0]) && !/\brgba?\(.*\)/i.test(v[0])) {
    let i = v[0].indexOf('at');
    let at;
    let s;
    if(i > -1) {
      at = v[0].slice(i + 2);
      s = v[0].slice(0, i - 1);
    }
    s = /(closest|farthest)-(side|corner)/.exec(s);
    if(s) {
      size = s[0];
    }
    // 指定宽高后size失效，置null标识
    else {
      s = /\s+(-?[\d.]+(?:px|%))\s*(-?[\d.]+(?:px|%))?/.exec(s);
      if(s) {
        size = null;
        if(s[1].indexOf('px') > -1) {
          r = parseFloat(s[1]) * 0.5;
        }
        else {
          r = parseFloat(s[1]) * iw * 0.005;
        }
      }
    }
    if(at) {
      s = /\s+(-?[\d.]+(?:px|%))\s*(-?[\d.]+(?:px|%))?/.exec(at);
      if(s) {
        if(s[1].indexOf('px') > -1) {
          cx = x2 + parseFloat(s[1]);
        }
        else {
          cx =  x2 + parseFloat(s[1]) * iw * 0.01;
        }
        // y可以省略，此时等同于x
        let by = s[2] || s[1];
        if(by.indexOf('px') > -1) {
          cy = y2 + parseFloat(by);
        }
        else {
          cy = y2 + parseFloat(by) * ih * 0.01;
        }
      }
    }
  }
  else {
    v.unshift(null);
  }
  if(size) {
    if(size === 'closest-side') {
      // 在边外特殊情况只有end颜色填充
      if(cx <= x2 || cx >= x3 || cy <= y2 || cy >= y3) {
        r = 0;
      }
      else {
        let xl;
        let yl;
        if(cx < x2 + iw * 0.5) {
          xl = cx - x2;
        } else {
          xl = x3 - cx;
        }
        if(cy < y2 + ih * 0.5) {
          yl = cy - y2;
        } else {
          yl = y3 - cy;
        }
        r = Math.min(xl, yl);
      }
    }
    else if(size === 'closest-corner') {
      let xl;
      let yl;
      if(cx < x2 + iw * 0.5) {
        xl = cx - x2;
      }
      else {
        xl = x3 - cx;
      }
      if(cy < y2 + ih * 0.5) {
        yl = cy - y2;
      }
      else {
        yl = y3 - cy;
      }
      r = Math.sqrt(Math.pow(xl, 2) + Math.pow(yl, 2));
    }
    else if(size === 'farthest-side') {
      if(cx <= x2) {
        r = x2 - cx + iw;
      }
      else if(cx >= x3) {
        r = cx - x3 + iw;
      }
      else if(cy <= y2) {
        r = y2 - cy + ih;
      }
      else if(cx >= y3) {
        r = cy - y3 + ih;
      }
      else {
        let xl = Math.max(x3 - cx, cx - x2);
        let yl = Math.max(y3 - cy, cy - y2);
        r = Math.max(xl, yl);
      }
    }
    // 默认farthest-corner
    else {
      let xl;
      let yl;
      if(cx < x2 + iw * 0.5) {
        xl = x3 - cx;
      }
      else {
        xl = cx - x2;
      }
      if(cy < y2 + ih * 0.5) {
        yl = y3 - cy;
      }
      else {
        yl = cy - y2;
      }
      r = Math.sqrt(Math.pow(xl, 2) + Math.pow(yl, 2));
    }
  }
  return [r, cx, cy];
}

// 当linear-gradient的值超过[0,1]区间限制时，计算其对应区间1的值
function getCsStartLimit(c1, p1, c2, p2, length) {
  let [ r1, g1, b1, a1 = 1 ] = c1;
  let [ r2, g2, b2, a2 = 1 ] = c2;
  let l1 = Math.abs(p1) * length;
  let l2 = p2 * length;
  let p = l1 / (l2 + l1);
  let r = Math.floor(r1 + (r2 - r1) * p);
  let g = Math.floor(g1 + (g2 - g1) * p);
  let b = Math.floor(b1 + (b2 - b1) * p);
  let a = a1 + (a2 - a1) * p;
  return [r, g, b, a];
}

function getCsEndLimit(c1, p1, c2, p2, length) {
  let [ r1, g1, b1, a1 = 1 ] = c1;
  let [ r2, g2, b2, a2 = 1 ] = c2;
  let l1 = p1 * length;
  let l2 = p2 * length;
  let p = (length - l1) / (l2 - l1);
  let r = Math.floor(r1 + (r2 - r1) * p);
  let g = Math.floor(g1 + (g2 - g1) * p);
  let b = Math.floor(b1 + (b2 - b1) * p);
  let a = a1 + (a2 - a1) * p;
  return [r, g, b, a];
}

function getCsLimit(first, last, length) {
  let c1 = util.rgb2int(first[0]);
  let c2 = util.rgb2int(last[0]);
  let [ r1, g1, b1, a1 = 1 ] = c1;
  let [ r2, g2, b2, a2 = 1 ] = c2;
  let l1 = Math.abs(first[1]) * length;
  let l2 = last[1] * length;
  let p = l1 / (l1 + l2);
  let r = Math.floor(r1 + (r2 - r1) * p);
  let g = Math.floor(g1 + (g2 - g1) * p);
  let b = Math.floor(b1 + (b2 - b1) * p);
  let a = a1 + (a2 - a1) * p;
  first[0] = `rgba(${r},${g},${b},${a})`;
  first[1] = 0;
  p = (length + l1) / (l1 + l2);
  r = Math.floor(r1 + (r2 - r1) * p);
  g = Math.floor(g1 + (g2 - g1) * p);
  b = Math.floor(b1 + (b2 - b1) * p);
  a = a1 + (a2 - a1) * p;
  last[0] = `rgba(${r},${g},${b},${a})`;
  last[1] = 1;
}

export default {
  getLinearDeg,
  getColorStop,
  calLinearCoords,
  calRadialRadius,
};
