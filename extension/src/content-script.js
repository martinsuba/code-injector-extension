console.log('content script init');

chrome.runtime.sendMessage({ id: 'INIT' });
