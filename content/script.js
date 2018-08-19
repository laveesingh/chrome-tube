class YoutubePlayer {
  constructor() {
    this._document = document || window.document
    this._nextButton = this._document.querySelector('.ytp-next-button')
    this._prevButton = this._document.querySelector('.ytp-prev-button')

    // bind class methods
    this.playPrev = this.playPrev.bind(this)
    this.playNext = this.playNext.bind(this)
    this.dispatchClickEvent = this.dispatchClickEvent.bind(this)
    this.sendKeys = this.sendKeys.bind(this)
  }

  playPrev() {
    const previousButton = this._document.querySelector('.ytp-prev-button')
    this.dispatchClickEvent(previousButton)
  }

  playNext() {
    const nextButton = this._document.querySelector('.ytp-next-button')
    this.dispatchClickEvent(nextButton)
  }

  dispatchClickEvent(element) {
    const clickEvent = this._document.createEvent('Events')
    clickEvent.initEvent('click', true, false)
    element.dispatchEvent(clickEvent)
  }

  sendKeys(element, keyCode) {
    const keyboardEvent = this._document.createEvent('KeyboardEvent')
    keyboardEvent.initKeyboardEvent('keydown', true, true, window, keyCode)
    element.dispatchEvent(keyboardEvent)
  }
}

// the script starts executing from here
const youtubePlayer = new YoutubePlayer()
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log(request, 'from', sender)
  if (request.message === 'playNext') {
    youtubePlayer.playNext()
  } else if (request.message === 'playPrev') {
    youtubePlayer.playPrev()
  }
})
