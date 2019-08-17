import { loadCodes } from './storage';

function executeScript({ tabId, content }) {
  const details = {
    code: content
  };
  chrome.tabs.executeScript(tabId, details);
}

export default async function injectCode({ url, tabId }) {
  const codes = await loadCodes();

  codes.forEach(({ site, content }) => {
    if (url.includes(site)) {
      executeScript({ tabId, content });
    }
  });
  console.log(codes);
}
