var data = [
  {name: "d3"},
  {name: "jquery"},
  {name: "elm"},
]

var container = d3.select("body")

draw()
setInterval(draw,500)

function draw() {
  data.sort(function(a,b) {
    return Math.random() - 0.5
  })

  var items = container.selectAll("p")

  var update = items.data(data,function(datum,index) {
      return datum.name
    })

  update.enter()
    .append("p")
    .text(function(d) {
      return d.name
    })

  // UPDATE + ENTER
  update
    .style("top",function(d,i) {
      return (i * 2.5) + "em"
    })
}
