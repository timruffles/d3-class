var xToColor = d3.scale.linear()
  .domain([0,document.body.clientWidth])
  .range(["#ff0000","#0000ff"]);

d3.select("body")
  .on("mousemove",function() {
    d3.select(this)
      .style("background",xToColor(d3.event.clientX));
  });

var data = [
  { name: "superjail", excellence: 0.8 },
  { name: "ren & stimpy", excellence: 1 },
  { name: "family guy", excellence: 0.7 },
  { name: "american dad", excellence: 0.2 },
];

// d3.extent, d3.min, d3.max
var excellenceExtent = d3.extent(data,function(d) {
  return d.excellence;
});

var excellenceScale = d3.scale.linear()
  .domain(excellenceExtent)
  .range(["1em","4em"]);

d3.select("body").selectAll("h2")
  .data(data).enter()
  .append("h2")
  .text(function(d) { return d.name })
  .style("font-size",function(d) { 
    return excellenceScale(d.excellence) 
  });

