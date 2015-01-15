setTimeout(function() {
  // TODO select all circle elements and change their stroke style to red
  d3.selectAll("circle").style("stroke", "red").style("stroke-width", 2);
  // TODO select second circle and change it's r attribute to 500
  d3.selectAll("circle:nth-child(2)").transition().attr("r", 500);
  // TODO select third circle and change its cx attribute to 650
  //
  d3.select(document.querySelector(".third")).transition().attr("cx", 650);
}, 100);


// TODO up to you :)
