document.addEventListener('DOMContentLoaded', function() {
  const nextButton = document.querySelector('.next-button')
  const prevButton = document.querySelector('.prev-button')
  const playButton = document.querySelector('.play-button')

  nextButton.onclick = () => sendMessageToAllTabs({ message: 'playNext' })
  prevButton.onclick = () => sendMessageToAllTabs({ message: 'playPrev' })
  playButton.onclick = () => sendMessageToAllTabs({ message: 'togglePause' })
})

function sendMessageToCurrentTab({ message }) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message }, function(response) {
      // do something with response
    })
  })
}

function sendMessageToAllTabs({ message }) {
  chrome.tabs.query({}, function(tabs) {
    tabs.forEach(function(tab) {
      chrome.tabs.sendMessage(tab.id, { message }, function(response) {
        // do something with response
      })
    })
  })
}
