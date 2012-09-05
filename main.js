(function() {
  var d, qsa, p, showPage, sections, changePage, LEFT_KEY, RIGHT_KEY;

  d = document;
  qsa = function(q) {
    return [].slice.call(d.querySelectorAll(q))
  }

  p = {
    page: parseInt(location.hash.replace(/^#/,"")) || 0
  }

  sections = qsa("section")

  showPage = function() {
    qsa(".displayed").forEach(function(el) { el.classList.remove("displayed") });
    sections[p.page].classList.add("displayed")
    onPageCbs.forEach(function(idAndFn) {
      if(sections[p.page].id === idAndFn[0]) idAndFn[1]();
    });
    window.location.hash = "#" + p.page;
  }
  changePage = function(change) {
    if(p.page + change < 0 || p.page + change >= sections.length) return;
    p.page += change
    showPage()
  }

  showPage()

  LEFT_KEY = 37
  RIGHT_KEY = 39
  d.body.onkeyup = function(e) {
    switch(e.keyCode) {
      case LEFT_KEY: return changePage(-1);
      case RIGHT_KEY: return changePage(1);
    }
  };
})();
