var data = [
	{id: 0, name: "Apple"},
	{id: 1, name: "Pear"},
	{id: 2, name: "Banana"}
];

// this is called when you click 'jumble'
function updateUi() {
	
	d3.shuffle(data);
  console.log(JSON.stringify(data));
	
	// TODO select fruit and bind all data
	var update = d3.select("#fruit")
    	.selectAll("li");
		
	// TODO create els
  // TODO set top based on index
}

updateUi();
