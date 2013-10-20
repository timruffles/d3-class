setupExamples()

var presentationTopicVenn = (function() {
  var data = [
    {
      name: "Data",
      children: [
        { name: "d3.scale" },
        { name: "d3 array methods" },
        { name: "d3 data loaders" },
        { name: "unix" },
        { name: "Google spreadsheet" },
      ]
    },
    {
      name: "Documents",
      children: [
        { name: "DOM" },
        { name: "SVG" },
        { name: "three.js" },
      ]
    },
    {
      name: "Design",
      children: [
        { name: "Colour" },
        { name: "d3.layout" },
        { name: "Principles" },
        { name: "Process" }
      ]
    }
  ];

  data.forEach(function(d) {
    d.children.forEach(function(c) {
      c.parent = d;
    });
  });

  var plucker = function(v) {
    return function(o) {
      return o[v];
    }
  };
  var translate = function(x,y) {
    return "translate(" + x + "," + y + ")";
  };

  var venn = function(opts) {

    var data = opts.data;
    var spread = opts.spread;
    var width = opts.width;
    var height = opts.height;
    var radius = opts.radius;
    var center = {x:width/2,y:height/2};

    var sin = Math.sin;
    var cos = Math.cos;
    var PI = Math.PI;

    var radsPerSegment = Math.PI * 2 / data.length;

    var segment = d3.scale.ordinal().range(["#AB00D9","#FFF600","#009EEF"]).domain(d3.range(0,data.length - 1));

    var g = d3.select("#venn")
              .append("svg")
              .attr("width",width)
              .attr("height",height)
              .append("g");

    var venn = g.selectAll("circle")
                .data(data);

    var segmentAngle = function(i) {
      var verticalZero = 0.5 * Math.PI;
      return (i * radsPerSegment) - verticalZero;
    };

    var enter = venn.enter()
      .append("g")
      .attr("transform",function(d,i) {
        var centerRadius = radius - spread;
        var x = cos(segmentAngle(i)) * centerRadius + center.x;
        var y = sin(segmentAngle(i)) * centerRadius + center.y;
        return translate(x,y);
      });

    enter.append("svg:circle")
      .style("fill",function(d,i) {
        return segment(i)
      })
      .attr("opacity",0.6)
      .attr("r",radius)
      .on("mouseover",function() {
        d3.select(this).transition().attr("r",radius + 5);
      })
      .on("mouseout",function() {
        d3.select(this).transition().attr("r",radius);
      })
      ;

    enter.append("svg:text")
      .text(plucker("name"))
      .attr("transform",function(d,i) {
        return translate(-this.offsetWidth/2,this.offsetHeight/2);
      });
    ;

    enter
      .selectAll("text.children")
      .data(plucker("children"))
      .enter()
      .append("g")
        .attr("transform",function(d,i) {
          var pindex = data.indexOf(d.parent);
          var start = segmentAngle(pindex) - radsPerSegment / 2;
          var end = segmentAngle(pindex) + radsPerSegment / 2;
          var anglePerCategory = (end - start) / d.parent.children.length;
          var angle = i * anglePerCategory + (anglePerCategory / 2) + start;
          var textRadius = radius + 10;
          d.angleRadians = angle;
          return translate(cos(angle) * textRadius,sin(angle) * textRadius) + " rotate(" + angle * 57.2957795 + ")";
        })
        .append("text")
        .text(plucker("name"))
        .attr("transform",function(d) {
          var piRads = d.angleRadians / PI;
          if((piRads < -0.5 && piRads >= -1) || (piRads >= 0.5 && piRads < 1.5)) {
            return "matrix(-1,0,0,-1," + this.clientWidth + ",0)";
          } 
          return "";
        });


  };

  return {
    run: function() {
      venn({
        data: data,
        spread: 15,
        width: 800,
        height: 800,
        radius: 120,
      });
    },
    css: function() {
      return "\
        #venn {\
          font-size: 0.35em; }\
        #covering {\
          float: right;\
          width: 30%; }"
    }
  }
})()

var agenda = {
  run: function() {
    var data = [0.1,0.1,0.1,0.1,0.1,0.2,0.5];

    var colors = d3.scale.linear().domain([0,data.length - 1]).range(["#69C7FF","#ff0000"])
    var width  = d3.scale.linear().domain([0,0.5]).range(["0%","100%"]);

    d3.select("#menu").selectAll("li")
      .data(data)
      .append("div")
      .style({
        "height":"16px",
        "width":function(d) { return width(d) },
        "background":function(d,i) { return colors(i) }
      })
  }
}

var comparisons = {
  run: function() {

    var demoEl = d3.select("#demo1")
    var controlsEl = demoEl.append(".controls")
    controlsEl.append("h2").text("Best at")
    controlsEl.append("div")
          .classed("radios",true)

    demoEl.append("div")
          .classed("graphs",true)
    
     var data = [
      {"name":"jquery", data: [["dom",1], ["svg",0], ["data",0], ["open",0.7 ]]},
      {"name":"d3", data: [ ["dom",0.6], ["svg",1], ["data",1], ["open",1 ]]},
      {"name":"highcharts", data:[ ["dom",0], ["svg",0.1], ["data",0.6], ["open",0 ]]},
      {"name":"raphael", data: [["dom",0], ["svg",1], ["data",0], ["open",0.5 ]]},
      {"name":"processing", data:[ ["dom",0], ["svg",0], ["data",0.5], ["open",0.2 ]]}
    ];

    var titles = {
      open: "Uses existing APIs",
      dom: "DOM tools",
      svg: "SVG tools",
      data: "Facilities for working with data"
    };

    var reorder;
    // selection behaviour
    var cats = data[0].data.map(function(d,i) { return { name: d[0], selected: i === 0 } });

    var radios = d3.select("#demo1 .radios").selectAll("radio").data(cats).enter()
      .append("label");

      radios.append("input").attr("name","sort").attr("value",pluck("name")).attr("type","radio").on("change",function(data) {
        _.each(cats,function(c) { c.selected = false });
        data.selected = true;
        reorder();
      });
      document.querySelector("#demo1 input[value=dom]").checked = true;
      radios.append("span").text(function(d) { return titles[d.name] });
      

    _.each(data,function(d) {
      d.dict = _.reduce(d.data,function(h,kv) {
        h[kv[0]] = kv[1];
        return h;
      },{});
    });

    var getSelected = function() { for(var c in cats) if(cats[c].selected) return cats[c] };

    reorder = function() {
      var selected = getSelected().name;
      data = _.sortBy(data,function(d) {
        return -d.dict[selected];
      });
      render();
    };

    var render = function() {

      var sections = d3.select("#demo1 .graphs").selectAll("div");

      var bound = sections.data(data,pluck("name"));

      // update
      bound.style("top",function(d,i) {
        return i * 128 + "px";
      });

      var enter = bound.enter()
                    .append("div")
                    .style("top",function(d,i) {
                      return i * 128 + "px";
                    })
                    .classed("data-framework",true)
                    ;

      enter.append("h2")
          .text(pluck("name"))

          ;

      var colors = d3.scale.category10();
      var height = d3.scale.linear().domain([0,1]).range([1,600]);

      var divs = enter.append("div")
        .classed("graph",true)
        .selectAll("div")
        .data(pluck("data"));
            
      divs.enter().append("div")
        .text(pluck(0))
        .attr("class",pluck(0))
        .style("background",function(d,i) { return colors(i) })
        .style("width",_.compose(height,pluck(1)));


    };

    reorder();
  },
  css: "#demo1 {\
    position: relative;\
    font-size: 0.25em;\
    overflow: auto; }\
    #demo1 .data-framework {\
      -webkit-transition: all 0.5s;\
      position: absolute; }\
    #demo1 h2 {\
      text-align: left;\
      margin: 0 0 0.5em 0; }\
    #demo1 .graphs {\
      margin-left: 2em;\
      width: 40%;\
      height: 100%; }\
    #demo1 .graph {\
      float: left;\
      margin-bottom: 1em; }\
    #demo1 .data-framework {\
      overflow: auto; }\
    #demo1 .controls {\
      float: left;\
      width: 38%;\
      margin-left: 10%; }\
      #demo1 .controls h2 {\
        font-size: 3em; }\
    #demo1 .graphs {\
      float: left;\
      width: 48%; }\
    #demo1 label {\
      display: block;\
      font-size: 2em;\
      line-height: 2em;\
      cursor: pointer; }\
    #demo1 input {\
      margin-right: 2em; }"
}

function pluck(v) {
  var args = [].slice.call(arguments,1);
  return function(d) {
    return typeof(d[v]) === "function" ? d[v].apply(d,args) : d[v];
  }
}

function I(x) { return x }

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

var peeks = 0;
function peek(fn,name) {
  name || (name = "peek" + (++peeks));
  return function() {
    console.log(name,arguments);
    return fn.apply(null,arguments);
  }
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
  viz.forEach(function(v) {
    v.run()
  })
}
function example(vizRegistry,el) {
  var viz = el.getAttribute("viz")
  var fn = window[viz]
  if(!fn) throw new Error("Missing viz setup " + viz)
  var pageNum = pageNumber(el)

  vizRegistry[pageNum] = vizRegistry[pageNumber] || []
  vizRegistry[pageNum].push(fn)
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
