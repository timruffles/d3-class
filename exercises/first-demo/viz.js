
main();


function main() {
  
  pollData(function(data) {
    console.log(data);
    update(data);
  })
  
}

var ITEMS_PER_ROW = 5;
var CIRCLE_MAX_R = 100;
var CIRCLE_PADDING = 10;

function update(data) {
  
  data.sort(function(a,b) {
    return a.score === b.score ? 0 :
      a.score > b.score ? -1 : 1;
  });
  
  var update = d3.select("#viz")
    .selectAll(".story")
    .data(data,function(datum) {
      return datum.title
    });
    
  var length = data.length;
  
  var colorScale = d3.scale.category20b();
  
  var radiusScale = d3.scale.linear()
    .domain(d3.extent(data,function(datum) {
      return datum.score
    }))
    .range(["10",CIRCLE_MAX_R])
    
  var enter = update
    .enter()
    .append("circle")
    .classed("story",true)
    
  update
    .transition()
    .attr("r",function(datum) {
      return radiusScale(datum.score);
    })
    .style("fill",function(datum,index) {
      return colorScale(index);
    })
    .attr("cx",function(datum,index) {
      return (index % ITEMS_PER_ROW) 
        * CIRCLE_MAX_R + CIRCLE_PADDING;
    })
    .attr("cy",function(datum,index) {
      return Math.floor(index / ITEMS_PER_ROW) * CIRCLE_MAX_R + CIRCLE_PADDING;
    });
  
}

function pollData(cb) {
  setInterval(function() {
    d3.jsonp("http://reddit.com/r/javascript.json?jsonp={callback}",function(data) {
      var formatted = data.data.children.map(function(data) {
        return data.data;
      })
      cb(formatted);
    })
  },500);
}