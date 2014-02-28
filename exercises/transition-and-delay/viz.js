d3.select("body")
  .append("h1")
  .text("foo")
  .style("background","grey")
    .append("a")
    .attr("href","http://google.com")
	.text("Click to visit google");

var update = d3.select("#update-only")
  .selectAll("li")
  .data([
	  {text:"a"},
	  {text:"b"},
	  {text:"c"}
  ]);
  
var delayByOneSecond = function(d,i) {
  	  return i * 1000;
  }; 
 
update.transition(1000)
  .style("color","blue")
  .style("background","orange")
  .delay(delayByOneSecond)
  // UPDATE context - elements with data
  .text(function(dataItem,indexOfDataItem) {
	  debugger;
	  return dataItem.text + indexOfDataItem;
  })  
  .style("color","red");
  
var enter = update.enter()
  .append("li")
  .text(function(dataItem,indexOfDataItem) {
	  return dataItem.text + indexOfDataItem;
  });
  
var exit = update.exit()
   				 .remove();
				 
				 
				 
