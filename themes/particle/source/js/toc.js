function tocInit() {
  var toc = document.getElementById('post-toc')
  if (!toc) return

  var menuHeight = 34
  var startTop = 280
  function tocFixed() {
    if (this.window.scrollY >= menuHeight) {
      toc.style.position = 'fixed'
      toc.style.top = menuHeight + 'px'
    } else {
      toc.style.position = 'absolute'
      toc.style.top = startTop + 'px'
    }
  }

  var currentIndex = 0

  function tocActive() {
    var tocLink = document.getElementsByClassName('toc-link')
    var headerLink = document.getElementsByClassName('headerlink')
    var headerLinkLength = headerLink.length
    var headerLinkTop = new Array(headerLinkLength)

    function getOffsetTopByBody(el) {
      let offsetTop = 0
      while (el && el.tagName !== 'BODY') {
        offsetTop += el.offsetTop
        el = el.offsetParent
      }
      return offsetTop
    }

    for (var i = 0; i < headerLinkLength; ++i) {
      headerLinkTop[i] = getOffsetTopByBody(headerLink[i])
    }

    for (var i = 0; i < tocLink.length; ++i) {
      if (
        window.scrollY >= headerLinkTop[i] - 1 &&
        (i + 1 === tocLink.length || window.scrollY < headerLinkTop[i + 1])
      ) {
        for (var j = 0; j < tocLink.length; ++j) {
          tocLink[j].className = 'toc-link'
        }
        if (currentIndex != i) {
          toc.scrollBy(0, currentIndex < i ? 30 : -30)
          currentIndex = i
        }
        tocLink[i].className += ' active'
      }
    }
  }

  window.addEventListener('scroll', function (e) {
    tocFixed()
    tocActive()
  })
}
window.addEventListener('load', tocInit)

// window.addEventListener('load', tocInit)
