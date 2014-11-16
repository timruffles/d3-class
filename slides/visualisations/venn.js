var presentationTopicVenn = (function() {
  var data = [
    {
      name: "Data",
      children: [
        { name: "d3.scale" },
        { name: "d3 array methods" },
        { name: "d3 data loaders" }
      ]
    },
    {
      name: "Documents",
      children: [
        { name: "DOM" },
        { name: "SVG" },
        { name: "three.js" },
        { name: "CSS & D3" }
      ]
    },
    {
      name: "Driven",
      children: [
        { name: "d3.layout" },
        { name: "d3.scale" },
      ]
    }
  ];

  data.forEach(function(d) {
    d.children.forEach(function(c) {
      c.parent = d;
    });
  });

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
      .text(function(d) {
        return d.name
      })
      .attr("transform",function(d,i) {
        return translate(-this.offsetWidth/2,this.offsetHeight/2);
      });
    ;

    enter
      .selectAll("text.children")
      .data(function(d) {
        return d.children
      })
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
        .text(function(d) {
          return d.name
        })
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

