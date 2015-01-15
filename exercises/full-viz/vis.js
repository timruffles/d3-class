;(function() {

// API
window.redditPack = main;

// code
var REDDIT_URL = "http://reddit.com";
var REDDIT_DATA_URL = "/data";


// TODO fix all 'TOODs' inside this function
function vis(el,dataRoot) {

  // https://github.com/mbostock/d3/wiki/Pack-Layout

  var svg = d3.select(el).select("svg");
  
  var diameter = Math.min(svg.attr("width"),svg.attr("height"))
    * 0.9;

  // TODO configure this layout
  // - diameter
  // - how it finds children nodes
  // - how it determines the size of a node (body.length)
  var layout = d3.layout.pack();
       
  // this attaches our data to the svg, and then binds the nodes
  var nodes = svg
    .datum(dataRoot)
    .selectAll(".story")
    .data(layout.nodes);
  
  // here we're creating elements we'll style up
  // below in the enter+update context
  var entered = nodes.enter()
    .append("g")
    .classed("story",true)
    .attr("transform","translate(0,0)")
    .append("circle")
    .attr("r",0);
  
  nodes
    // TODO set the 'leaf` class on nodes that are a leaf
    .transition()
    .attr("transform",function(d) {

      // TODO set the transform according to the position attributes
      // the pack layout provides us
      var transform = "";

      return transform;
    })
    // TODO set the radius on the circles - make sure we're working with circles
    

  // TODO handle exiting nodes
}

function main(el,stories,index) {
  var story = stories[(index || 0) % stories.length];
  getRedditStoryComments(story,function(data) {
    clearLoading(el);
    vis(el,data);
  });
  setTimeout(function() {
    main(el,stories,(index || 0) + 1);
  },2500);
}



function getRedditStoryComments(url,cb) {
  d3.json(REDDIT_DATA_URL + url,function(err,data) {
    if(err) return error(err);
    cb(formatStoryComments(data)); 
  });
}

function formatStoryComments(data) {
  var story = data[0].data.children[0].data;
  var comments = data[1];
  var baseUrl = REDDIT_URL + story.permalink;

  story.replies = comments.data.children.filter(removeMore)
    .map(formatComment);

  return story;

  function formatComment(comment) {
    var data = comment.data;
    if(data.replies) {
      data.replies = data.replies.data.children.filter(removeMore)
        .map(formatComment);
    } else {
      data.replies = [];
    }
    data.permalink = baseUrl + "/" + data.id;
    return data;
  }

  function removeMore(comment) {
    return comment.kind == "t1";
  }
}

function error(err) {
  console.error(err);
}

function clearLoading(el) {
  d3.select(el).select(".loading").remove();
}

})();












