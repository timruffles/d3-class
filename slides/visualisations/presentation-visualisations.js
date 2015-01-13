setupExamples()

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

function revealCodeByXhr(src, element) {
    function getXHR(){
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        else {
            try {
                return new ActiveXObject("Msxml2.XMLHTTP");
            } 
            catch (e) {
                try {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                } 
                catch (e) {
                }
            }
        }
        
        throw new Exception("XHR isn't supported by your browser");
    }

    var xhr = getXHR();
    xhr.open('GET', src, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            element.innerHTML = xhr.responseText;
            hljs.highlightBlock(element);
        }
    }
    xhr.send(null);
}

function setupExamples() {
  var cbs = window.revealPluginMardownCallbacks = window.revealPluginMardownCallbacks || []

  cbs.push(function() {
    var vizOnPage = {}

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
  viz = window[viz]
  if(!viz) throw new Error("Missing viz setup " + viz)
  var pageNum = pageNumber(el)

  vizRegistry[pageNum] = vizRegistry[pageNumber] || []
  vizRegistry[pageNum].push(function() {
    el.innerHTML = ""
    viz.run(el);

    if (typeof viz.showDemoCode === "function") {
        viz.showDemoCode(el);
    }
  })
}
function pageNumber(el) {
  var current = el
  while(current && (current != document.body) && (current = el.parentNode)) {
    if(current.tagName.toLowerCase() == "section") {
      var sections = current.parentNode.querySelectorAll("section");
      var index = [].indexOf.call(sections, current)
      return index
    }
  }
}

function px(fn) {
  return function() {
    return fn.apply(null,arguments) + "px"
  }
};

