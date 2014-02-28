
d3.select("body")
  .selectAll("h2")
  .data([
    { text: "Hello" },
    { text: "d3" },
    { text: "data!" }
  ])
  .enter()
  .append("h2")
  .style("font-size",function(d,i) {
    return i*i + 1 + "em";
  })
  .text(function(d,i) {
    return d.text + " " + i;
  });
