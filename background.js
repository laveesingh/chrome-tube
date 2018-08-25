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
  let message = ''
  switch (command) {
    case 'playNext':
      message = 'playNext'
      break
    case 'playNextDup':
      message = 'playNext'
      break
    case 'playPrev':
      message = 'playPrev'
      break
    case 'playPrevDup':
      message = 'playPrev'
      break
    case 'togglePause':
      message = 'togglePause'
      break
    case 'togglePauseDup':
      message = 'togglePause'
      break
  }
  sendMessageToAllTabs({ message })
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
