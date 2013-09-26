var attendees = [];

function showData() {
	var people = d3.select("#class-members")
	  .selectAll("li")
	  .data(attendees);
	  
   people
      .select("span")
	  .text(function(d) {
		  return d.name
	  });
	  	  
   people.exit().remove();
	  
	  // <li><span class=person>Bob</span><a class=remove>X</a></li>
	var newPerson = people.enter()
	  .append("li");
	  
	newPerson
      .append("span")
	  .classed("person",true)
	  .text(function(d) {
		  return d.name
	  });
	  
  	newPerson
      .append("a")
  	  .classed("remove",true)
  	  .text("X")
	  .on("click",function(data){
		  var attendee = attendees.indexOf(data);
		  console.log("before",attendees);
		  attendees.splice(attendee,1);
		  console.log("after",attendees)
		  showData();
	  })
}


function addMember() {
	
	
}

function main() {
	
	// setup the form handling
	d3.select("#add-member")
	.on("submit",function() {
		d3.event.preventDefault();
		var name = d3.select("#name").property("value");
		attendees.push({name: name});
		
		showData();
	})
}


main();