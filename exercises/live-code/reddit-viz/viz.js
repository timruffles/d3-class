var width;
var height;

var PADDING = 50;
var COLUMNS = 8;
var previousData;

function getData() {
  d3.jsonp(
   "http://reddit.com/.json?jsonp={callback}",
   handleData
  );
}

function setupViz() {
  // one off setup
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  d3.select("body")
    .append("svg")
    .attr("id","viz")
    .attr("width",width - PADDING)
    .attr("height",height - PADDING);
}

function handleData(data) {
  var formatted = data.data.children.map(function(d) {
    return d.data;
  });

  // create a map of id -> previous story data
  var previousById = (previousData || []).reduce(function(byId,d) {
    byId[d.id] = d;
    return byId
  },{});

  // set previous data, and calculate diff
  formatted.forEach(function(d) {
    if(!previousById[d.id]) return;
    d.previous = previousById[d.id];
    d.scoreChange = d.score - d.previous.score;
  });

  previousData = formatted;

  var root = d3.select("#viz");

  var maxRadius = width / COLUMNS;

  var radiusScale = d3.scale.linear()
    .domain(d3.extent(formatted,function(d) {
      return d.score
    }))
    .range([maxRadius / 10,maxRadius]);

  var stories = root.selectAll(".story")
    .data(formatted,function(d) {
      return d.id
    });

  var storiesEntering = stories.enter()
    .append("g")
    .classed("story",true);

  storiesEntering
    .append("circle");
  
  stories
    .attr("transform",function(d,i) {
      var row = Math.floor(i / COLUMNS);
      var column = i % COLUMNS;
      var x = column * maxRadius * 2;
      var y = row * maxRadius * 2;
      return "translate(" + x + "," + y + ")";
    })
    .select("circle")
    .classed("up",function(d) {
      return d.scoreChange > 0
    })
    .classed("down",function(d) {
      return d.scoreChange < 0
    })
    .attr("r",function(d) {
      return radiusScale(d.score);
    });
}

setupViz();
setInterval(getData,3000);
getData();

