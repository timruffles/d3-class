main();

function main() {
  yourVisualisation(getData());
}

function yourVisualisation(data) {
  // go mad!
}


function getData() {
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


  data.sort(function(a,b){
  	return b["Released"] - a["Released"];
  })

  data = d3.nest(function(datum){
  	return data["Released"];
  })
  return data;
}



