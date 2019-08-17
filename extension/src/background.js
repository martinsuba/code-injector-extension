import injectCode from './services/inject-code';

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.extension.getURL('./ui/index.html') });
});

chrome.runtime.onMessage.addListener((request, sender, /* sendResponse */) => {
  const { id } = request;
  console.log(sender);

  switch (id) {
    case 'INIT': {
      const { tab: { id: tabId, url } } = sender;
      injectCode({ url, tabId });
      break;
    }
    default:
      console.warn('Unhandled action');
  }
});
