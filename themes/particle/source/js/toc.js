;(function () {
  var $toc = document.getElementById('post-toc')
  if (!$toc) return

  var menuHeight = 34
  var startTop = 280
  function tocFixed() {
    if (this.window.scrollY >= menuHeight) {
      $toc.style.position = 'fixed'
      $toc.style.top = menuHeight + 'px'
    } else {
      $toc.style.position = 'absolute'
      $toc.style.top = startTop + 'px'
    }
  }

  window.addEventListener('scroll', tocFixed)
})(window)
