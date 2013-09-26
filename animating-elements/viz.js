var data = [
	{id: 0, name: "Apple"},
	{id: 1, name: "Pear"},
	{id: 2, name: "Banana"}
];

var yAxis = d3.scale.linear().domain([0,data.length - 1])
							 .range(["3em","5em"]);

function updateUi() {
	
	data = data.sort(function() { return Math.random() - 0.5 })
	
	// select fruit
	var update = d3.select("#fruit")
    	.selectAll("li")
		.data(data,function(data,index){
			return data.id;
		});
		
	// enter context
	update.enter()
    	.append("li")
		
    // both ENTER & UPDATE
	update
		.style("top",function(d,i){
			return yAxis(i);
		})
		.text(function(d,i) {
			return d.name + " " + i
		});
}


updateUi();