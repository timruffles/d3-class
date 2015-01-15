
var data = [
    { color: "red" },
    { color: "green" },
    { color: "blue" },
  ];

// TODO select circles, bind data
var circle = d3.selectAll("circle")
  .data(data)
  .on("mouseout", onout);

circle
  .on("mousemove", onmove);
  // TODO make 'onmove' handler for for `mousemove` event
  // TODO make 'onout' handler for for `mouseout` event
  // on("eventName", ƒ)


function onmove(d, i) {
  // TODO change the fill of current element
  d3.select(this)
    .style("fill", d.color)
    .attr("transform","scale(1.1)")
}

function onout(d, i) {
  // TODO reset fill to original (style null)
  // style("fill", null)
}

