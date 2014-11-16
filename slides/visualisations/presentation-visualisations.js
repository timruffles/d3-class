setupExamples()

function px(fn) {
  return function() {
    return fn.apply(null,arguments) + "px"
  }
};

var onPageCbs = [];
var onPage = function (page,fn) {
  onPageCbs.push([page,fn])
}

function revealCode(id,fn) {
  var el = document.getElementById(id); 
  fn || (fn = function(code,script,page) {
    page.appendChild(script);
  });
  // first script
  var script = el.querySelector("script");
  var code = script.innerText
    .split("\n")
    .slice(3) // remove cdata & onPage
    .slice(0,-3) // remove cdata & onPage
    .map(function(s) { return s.replace(/^    /,"") }).join("\n");
  var pre = document.createElement("pre");
  pre.innerText = code;
  fn(code,pre,el); 
  prettyPrint();
}

function setupExamples() {
  var cbs = window.revealPluginMardownCallbacks = window.revealPluginMardownCallbacks || []

  cbs.push(function() {
    var vizOnPage = {}
    Reveal.addEventListener('ready',function(event) {
      runViz(vizOnPage,event.indexh)
    })
    Reveal.addEventListener('slidechanged',function(event) {
      runViz(vizOnPage,event.indexh)
    })
    ;[].forEach.call(document.body.querySelectorAll("[viz]"),example.bind(null,vizOnPage))
  })

}
function runViz(pageRegistry,index) {
  var viz = pageRegistry[index] || []
  viz.forEach(function(v) { v() })
}
function example(vizRegistry,el) {
  var viz = el.getAttribute("viz")
  var viz = window[viz]
  if(!viz) throw new Error("Missing viz setup " + viz)
  var pageNum = pageNumber(el)

  vizRegistry[pageNum] = vizRegistry[pageNumber] || []
  vizRegistry[pageNum].push(function() {
    el.innerHTML = ""
    viz.run(el)
  })
}
function pageNumber(el) {
  var current = el
  while(current && (current != document.body) && (current = el.parentNode)) {
    if(current.tagName.toLowerCase() == "section") {
      var index = [].indexOf.call(current.parentNode.children,current)
      return index
    }
  }
}
