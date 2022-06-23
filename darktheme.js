'use strict';

function invertColors(dark) {
  if (dark) {
    document.querySelector('body').style.filter = 'invert(1)'
  } else location.reload();
}

function darkTheme(callback) {
  chrome.storage.sync.get('dark', store => callback(store));
}

darkTheme(({dark}) => invertColors(dark) );
