import Services from 'external-services';

console.log(Services);

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.extension.getURL('./ui/index.html') });
});
