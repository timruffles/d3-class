d3.select("body")
  .append("h1")
  .text("foo")
  .style("background","grey")
    .append("a")
    .attr("href","http://google.com")
	.text("Click to visit google");

d3.select("#update-only")
  .selectAll("li")
  .data([
	  {text:"a"},
	  {text:"b"},
	  {text:"c"}
  ])
  // UPDATE context - elements with data
  .text(function(dataItem,indexOfDataItem) {
	  return dataItem.text + indexOfDataItem;
  })
  .style("color","red")
  .enter()  // talking about lonely data items that lack an element
  // ENTER context - data without elements
	  .append("li")
	  .style("color","blue")
	  .text(function(dataItem,indexOfDataItem) {
		  return dataItem.text + indexOfDataItem;
	  });
