// TODO add <g id=first></g> to the svg
var g = d3.select("svg")
  .append("g")
  .attr("id", "first");

// inside <g>, add a <circle r=100> and...
var circle = g.append("circle")
  .attr("r", 100);

// add a <text>hello</text>
var text = g.append("text")
  .text("I like d3");


// the <circle> and <text> are siblings, so think about contexts
