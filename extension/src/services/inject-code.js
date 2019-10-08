import { loadCodes } from './storage';

function executeScript({ tabId, content, type }) {
  const details = {
    code: content
  };

  if (type === 'js') {
    chrome.tabs.executeScript(tabId, details);
  } else {
    chrome.tabs.insertCSS(tabId, details);
  }
}

export default async function injectCode({ url, tabId }) {
  const codes = await loadCodes();

  codes.forEach(({ site, content, type }) => {
    if (url.includes(site)) {
      executeScript({ tabId, content, type });
    }
  });
}
