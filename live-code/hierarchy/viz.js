var data = [
  {
    name: "jquery",
    attributes: [
      { name: "dom", score: 1 },
      { name: "svg", score: 0 }
    ]
  },  
  {
    name: "d3",
    attributes: [
      { name: "dom", score: 0.8 },
      { name: "svg", score: 1 }
    ]
  }  
];

var topLevelElements = d3.select("body")
                          .selectAll("div")
                          .data(data)
                          .enter()
                          .append("div");
topLevelElements
  .append("h2")
  .text(function(d) {
    return d.name
  });
// see pane to right ------------->


topLevelElements
  .selectAll("p")
  .data(function(d) {
    return d.attributes
  })
  .enter()
    .append("p")
    .text(function(d) {
      return d.name
    })


