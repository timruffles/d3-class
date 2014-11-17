var draw = function() {
    function I(x) { return x; }

    var root = d3.select("#change-demo")
  
    var colors = d3.scale.linear().domain([-2,2]).range(["#FF0000","#0000FF"]);
  
    var s = root.selectAll("div").data(d3.range(Math.round(Math.random()  * 10)).map(d3.random.normal()));
  
    // update method
    s.transition()
      .style("color",function(d)  { return colors(d) })
      .text(I);
  
    // data without elements
    s.enter()
        .append("div")
        .style({opacity: 0})
        .text(I)
        .transition()
          .delay(function(d,i) { return i * 250 })
          .style("color",function(d)  { return colors(d) })
          .style({opacity: 1})
  
    // elements without data
    s.exit()
        .transition()
        .delay(function(d,i) { return i * 250 })
        .style({opacity: 0})
        .remove();
}