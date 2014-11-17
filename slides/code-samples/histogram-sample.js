var drawHistogram = function() {
    var randomData = d3.range(1000).map(d3.random.irwinHall(10));

    var width = 800;
    var height = 500;

    var x = d3.scale.linear()
        .domain([0, 1])
        .range([0, width]);

    var data = d3.layout.histogram()
        .bins(x.ticks(20))
        (randomData);

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var svg = d3.select("#histogram-1").append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.selectAll("rect")
        .data(data)
        .enter()
            .append("rect")
            .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; })
            .attr("width", x(data[0].dx) - 1)
            .attr("height", function(d) { return height - y(d.y); });
}
