function drawHistogram(el) {
    var randomData = d3.range(1000).map(d3.random.irwinHall(10));

    var width = 800;
    var height = 500;

    var BINS = 20;

    var extent = d3.extent(randomData, function(d) { return d });

    var x = d3.scale.linear()
        .domain(extent)
        .range([0, width]);

    var y = d3.scale.linear()
        .domain(extent)
        .range([height, 0])

    var colors = d3.scale.linear()
      .domain([0, BINS - 1])
      .range(["hsl(198, 100%, 77%)", "hsl(213, 100%, 50%)"])
      .interpolate(d3.interpolateHsl);

    var histogram = d3.layout.histogram(true)
        .bins(y.ticks(BINS));

    var data = histogram(randomData);

    // histogram will give us 0..1 ranges for bin heights
    y = y.copy().domain(d3.extent(data, function(d) { return d.y }));

    var svg = d3.select(el).append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("width", function(d) {
          return x(d.x + d.dx) - x(d.x) - 1
        })
        .attr("height", 0)
        .style("fill", function(_d, i) {
          return colors(i);
        })
        .transition()
        .tween("transform", function(d) {
           var el = d3.select(this);
           return function(t) {
             var oy = y(d.y) + (1 - t) * (height - y(d.y));
             el.attr("transform", 
               "translate(" + x(d.x) + "," + oy + ")");
           }
        })
        .attr("height", function(d) {
          return height - y(d.y);
        })
        .duration(175)
        .delay(function(d, i) {
          return i * 55;
        });
}
