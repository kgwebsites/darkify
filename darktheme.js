'use strict';

function invertColors(turnItDark) {
  const currentlyDark = document.querySelector('body').style.filter === 'invert(1)';

  if (turnItDark && !currentlyDark) {
    document.querySelector('body').style.filter = 'invert(1)'
    document.querySelectorAll('img')
      .forEach(img => img.style.filter = 'invert(1)');
    document.querySelectorAll('[style*=background-image]').forEach(e => e.style.filter = 'invert(1)')
  }

  if (!turnItDark && currentlyDark) {
    document.querySelector('body').style.filter = ''
    document.querySelectorAll('img')
      .forEach(img => img.style.filter = '');
    document.querySelectorAll('[style*=background-image]').forEach(e => e.style.filter = '')
  }

}

function darkTheme(callback) {
  chrome.storage.sync.get('dark', store => callback(store));
}

darkTheme(({dark}) => invertColors(dark) );
