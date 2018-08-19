chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({ pageUrl: {} })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })
})

chrome.commands.onCommand.addListener(function(command) {
  sendMessageToAllTabs({ message: command })
})

function sendMessageToAllTabs({ message }) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, { message }, function(response) {
        // do something with response
      })
    })
  })
}
