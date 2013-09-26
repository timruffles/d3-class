d3.select("body")
  .append("h1")
  .text("foo")
  .style("background","grey")
    .append("a")
    .attr("href","http://google.com")
	.text("Click to visit google")
	
	
d3.select("#update-only")
  .selectAll("li")
  .data([
	  {text:"a"},
	  {text:"b"},
	  {text:"c"}
  ])
  .text(function(dataItem,indexOfDataItem) {
	  return dataItem.text + indexOfDataItem;
  });