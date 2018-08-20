class YoutubePlayer {
  constructor() {
    this._document = document || window.document

    if (document.readyState == 'complete') {
      this._nextButton = this._document.querySelector('.ytp-next-button')
      this._prevButton = this._document.querySelector('.ytp-prev-button')
      this._pauseButton = this._document.querySelector('.ytp-play-button')
    } else {
      window.addEventListener('load', () => {
        this._nextButton = this._document.querySelector('.ytp-next-button')
        this._prevButton = this._document.querySelector('.ytp-prev-button')
        this._pauseButton = this._document.querySelector('.ytp-play-button')
      })
    }

    // bind class methods
    this.playPrev = this.playPrev.bind(this)
    this.playNext = this.playNext.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.dispatchClickEvent = this.dispatchClickEvent.bind(this)
    this.sendKeys = this.sendKeys.bind(this)
  }

  playPrev() {
    this.dispatchClickEvent(this._prevButton)
  }

  playNext() {
    this.dispatchClickEvent(this._nextButton)
  }

  togglePause() {
    this.dispatchClickEvent(this._pauseButton)
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
  if (request.message === 'playNext') {
    youtubePlayer.playNext()
  } else if (request.message === 'playPrev') {
    youtubePlayer.playPrev()
  } else if (request.message === 'togglePause') {
    youtubePlayer.togglePause()
  }
})
