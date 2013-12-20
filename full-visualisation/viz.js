
// GET data
var data = d3.select("#csv").text();
data = d3.csv.parse(data);
console.log(data);

// FORMAT data - turn human formatted numbers into JS numbers
data.forEach(function(datum){
	datum["Total Box Office"] = parseInt(
		datum["Total Box Office"].replace(/,/,"").replace("$","")
	);
	datum["Released"] = parseInt(datum["Released"]);
});

data = d3.nest(function(datum){
	return data["Released"];
})

data.sort(function(a,b){
	return b["Released"] - a["Released"];
})

// SETUP representation
// setup X-Axis - we want smallest data to be 0% accross screen
// max to be 100% across
var xAxis = d3.scale.linear()
	.domain(
		d3.extent(data,function(datum){
			return datum.length
		})
	)
	.range(["0%","100%"]);

// standard d3

d3.select("body")
	.append("div")
	.selectAll("div")
	.data(data)
	.enter()
	.append("div")
	.text(function(d){
		return  d[0]["Released"]
	})
	.style("background","orange")
	.style("width",function(d) {
		return xAxis(d.length)
	})


