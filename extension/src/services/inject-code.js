import { loadCodes } from './storage';

function executeScript({ tabId, content, type }) {
  const details = {
    code: content
  };

  if (type === 'js') {
    chrome.tabs.executeScript(tabId, { file: 'jquery.min.js' }, () => {
      chrome.tabs.executeScript(tabId, details);
    });
  } else {
    chrome.tabs.insertCSS(tabId, details);
  }
}

export default async function injectCode({ url, tabId }) {
  const codes = await loadCodes();

  codes.forEach(({ site, content, type }) => {
    const siteArray = site.split(',');
    const urlMatch = siteArray.some(siteString => url.includes(siteString.trim()));
    if (urlMatch) {
      executeScript({ tabId, content, type });
    }
  });
}
