function drawHistogramPolar() {
    var randomData = d3.range(1000).map(d3.random.irwinHall(10));

    var width = 800;
    var height = 500;
    var BINS = 20;

    var bw = 10;

    var r = Math.min(width, height) / 2;

    var data = d3.layout.histogram()
        .bins(BINS)
        (randomData);

    var angle = d3.scale.linear()
        .domain(d3.extent(data, function(d) { return d.x }))
        .range([-Math.PI/2, Math.PI * 1.5]);

    var y = d3.scale.linear()
        .domain(d3.extent(data, function(d) { return d.y }))
        .range([0, r]);

    var svg = d3.select("#histogram-1").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + r + "," + r + ")")



    var CIRCLE_DEG = 360;
    var CIRCLE_RAD = Math.PI * 2;

    function rad2deg(rad) {
      return (rad / CIRCLE_RAD) * CIRCLE_DEG;
    }

    svg.selectAll("rect")
        .data(data)
        .enter()
            .append("rect")
            .style("transform", function(d) {
              var a = angle(d.x);
              var baseX = Math.cos(a);
              var baseY = Math.sin(a);
              var rotate = rad2deg(a);
              return "translate(" + baseX + "px," + baseY + "px)  rotate(" + rotate + "deg)"; 
            })
            .style("transform-origin", "50% 0%")
            .attr("width", bw)
            .attr("height", 0)
                    .style("opacity", 0)
        .transition()
        .duration(150)
        .delay(function(d, i) {
          return i * 150;
        })
        .duration(350)
        .style("opacity", 1)
            .attr("height", function(d) {
              var heightY = y(d.y);
              return r - heightY;
            })
}
