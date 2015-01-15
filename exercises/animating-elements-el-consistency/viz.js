var data = [
	{id: 0, name: "Apple"},
	{id: 1, name: "Pear"},
	{id: 2, name: "Banana"}
];

// this is called when you click 'jumble'
function updateUi() {
	
	d3.shuffle(data);
  console.log(JSON.stringify(data));


  // el <-> d
  // el <-> d
  // el <-> d

	
	// TODO select fruit and bind all data
	var update = d3.select("#fruit")
    	.selectAll("li")
      .data(data, function(d, i) {
        return d.id;
      });
		
	// TODO create els
  update.enter().append("li");

  var updateEnter = update
      .text(function(d) {
        return d.name;
      })
      .style("top", function(d) {
        return d.name;
      })
}

updateUi();












