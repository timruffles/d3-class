
function visualise(width,height) {
}

visualise(document.body.clientWidth,document.body.clientHeight)


var data = [
  {name: "d3",popularity: 0.2},
  {name: "jquery",popularity: 1},
  {name: "dojo",popularity: 1e-9},
]

var svg = d3.select("body").append("svg")
  .attr({width: 1000,height: 500})

var popularityToRadius = d3.scale
  .linear()
  .domain(d3.extent(data,function(datum) {
    return datum.popularity
  }))
  .range([10,200])

var popularityToColor = popularityToRadius
    .copy()
    .range(["#ff0000","#0000ff"])

draw()

function draw() {
  var update = svg.selectAll("circle")
    .data(data)

  var enter = update.enter()
    .append("circle")
    .attr("cx",function(d,i) {
      return (i + 1) * 250
    })
    .attr("cy",225) 
    .attr("r",function(d) {
      return popularityToRadius(d.popularity)
    })
    .style("fill",function(datum) {
      return popularityToColor(datum.popularity)
    })

}

