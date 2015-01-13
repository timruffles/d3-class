
var line = dynamicLine()
  .tickLength(n)
  .start(function() {
    line.attr("x1", function(d) {
        return d.x1;
      })
    line.attr("x2", function(d) {
        return d.x2;
      })
  });




function dynamicLine() {

  var tickLength = 250;

  var dispatcher = d3.dispatch("start", "end", "tick");

  var interval;

  layout.start = function() {
    interval = setInterval(update, tickLength) 
    return layout;
  }
  layout.tickLength = function(n) {
    tickLength = n;
    return layout;
  }

  layout.on = dispatcher.on;
  layout.off = dispatcher.off;


  return layout;

  function layout(data) {
  }

  function update() {
    // update data
    dispatcher.emit("tick");
  }
}
