
visualise()

window.onresize = visualise;

function visualise() {
  var width = document.body.clientWidth;
  var height = document.body.clientHeight;

  var data = [
    {name: "d3", popularity: 0.2},
    {name: "jquery", popularity: 1},
    {name: "dojo", popularity: 1e-9},
  ]

  var minMax = [10, width / data.length / 2];

  // TODO you're responsible for setting up the scales
  var popularityToRadius = d3.scale.linear()
  // TODO set the domain to the extent of the popularity values
  // TODO set the range to minMax

  // TODO copy the previous scale but change its output range
  // to work on colors
  var popularityToColor = popularityToRadius;


  // just read below this, no modifications necessary
  var svg = d3.select("svg")
    .attr({width: width, height: height})

  var update = svg
     .selectAll("circle")
    .data(data)

  var enter = update.enter()
    .append("circle")
    .attr("cy",225);

  update
    .attr("cx",function(d,i) {
      return (i + 1) * 250
    })
    .attr("r",function(d) {
      return popularityToRadius(d.popularity)
    })
    .style("fill",function(datum) {
      return popularityToColor(datum.popularity)
    })
}
