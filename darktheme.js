'use strict';

function rgbTrim(rgb) {
  return rgb.split('(')[1].split(')')[0].split(',').map(v => v.trim());
}

function invertColors(dark) {
  if (dark) {
    document.querySelectorAll('*').forEach(node => {
      const styles = window.getComputedStyle(node);
      const rgbBg = rgbTrim(styles.backgroundColor);
      const rgbTxt = rgbTrim(styles.color);
      const bg = rgbToHsl(...rgbBg);
      const txt = rgbToHsl(...rgbTxt);
      const bk = hsl => hslToRgb(hsl[0], hsl[1], .2);
      const wh = hsl => hslToRgb(hsl[0], hsl[1], .8);
      const rgbWh = rgb => `rgb(${wh(rgb)[0]}, ${wh(rgb)[1]}, ${wh(rgb)[2]})`;
      const rgbBk = rgb => `rgb(${bk(rgb)[0]}, ${bk(rgb)[1]}, ${bk(rgb)[2]})`;

      if (bg[2] >= 0.8) {
        node.style.setProperty('background-color', rgbBk(bg), 'important');
        node.style.setProperty('color', rgbWh(txt), 'important');
      }
      if (txt[2] <= 0.4) node.style.setProperty('color', rgbWh(txt),'important');
    });
  } else location.reload();
}

function darkTheme(callback) {
  chrome.storage.sync.get('dark', store => callback(store));
}

darkTheme(({dark}) => { if(dark) invertColors(dark) });