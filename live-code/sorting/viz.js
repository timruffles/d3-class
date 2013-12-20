var withKeyFunction = d3.select("body")
                        .append("div");
withKeyFunction.append("h2").text("With key function");
var items = withKeyFunction.append("ul");

function visualiseWithKeyFunction(data) {
  // grab existing items always - we need for update
  // context towork
  var update = items.selectAll("li")
                 .data(data,function(d,i) {
                   // our key function returns 
                   // the id of an item
                    return d.id
                 });
  // ENTER
  update.enter()
        .append("li")

  // UPDATE + ENTER context after enter()
  update.style("top",function(d,i) {
    // here we're setting the position of 
    // the element to be 50 px * its array offset
    return i * 50 + "px"
  })
  .text(function(d) {
    return d.name
  });
}

setInterval(function() {
  var data = [
    {id: 1, name: "d3"},
    {id: 2, name: "jQuery"},
    {id: 3, name: "elm"},
    {id: 4, name: "ClojureScript"},
  ];
  data = data.sort(function() {
    return Math.random() - 0.5 
  });
  visualiseWithKeyFunction(data);
},500);
  
