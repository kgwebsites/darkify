'use strict';

function darkTheme(callback) {
  chrome.storage.sync.get('dark', store => callback(store));
}

chrome.browserAction.onClicked.addListener(() => {
  darkTheme(({dark}) => {
    chrome.storage.sync.set({dark: !dark}, () => {
      chrome.tabs.executeScript({code: `invertColors(${!dark});`}, () => {
        if (!dark) chrome.browserAction.setIcon({path: './images/dark16.png'});
        else chrome.browserAction.setIcon({path: './images/light16.png'});
      });
    });
  });
});

darkTheme(({dark}) => {
  if (!dark) chrome.browserAction.setIcon({path: './images/dark16.png'});
  else chrome.browserAction.setIcon({path: './images/light16.png'});
});
