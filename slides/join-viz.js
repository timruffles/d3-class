(function() {
  var elements = [];
  var data = [1,2,3,4];

  function I(x) { return "x" }

  function draw() {
    var d = d3.select("#join-demo #data")
      .selectAll("p")
      .data(data);
    d.enter()
      .append("p")
      .text(I);
    d.exit()
     .remove();
    var e = d3.select("#join-demo #elements")
      .selectAll("p")
      .data(elements);
    e.enter()
      .append("p")
      .text(I);
    e.exit()
     .remove();
    
    d3.selectAll("#join-demo #contexts .strip").html("");
    addEls("#join-demo #update");
    addEls("#join-demo #enter");
    addEls("#join-demo #exit");

    var u = d3.select("#join-demo #update")
      .selectAll("p")
      .data(data)
      .text(I);
    
   var e = d3.select("#join-demo #enter")
      .selectAll("p")
      .data(data)
      .enter()
      .append("p")
      .text(I);
   
   var e = d3.select("#join-demo #exit")
      .selectAll("p")
      .data(data)
      .exit()
      .append("p")
      .text(I);
  }
  function addEls(sel) {
    d3.select(sel).selectAll("p")
      .data(elements)
      .enter()
      .append("p")
  }
  function addElement() {
    elements.push(1);
    draw();
  }
  function addData() {
    data.push(1);
    draw();
  }
  function removeElement() {
    elements.shift();
    draw();
  }
  function removeData() {
    data.shift();
    draw();
  }
  d3.map({
    ".addEl": addElement, 
    ".removeEl": removeElement, 
    ".addData": addData, 
    ".removeData": removeData, 
  }).forEach(function(k,fn) {
    d3.select("#join-demo " + k).on('click',fn)
  })
  draw();
})()
