
// append an h1 to body, and say hello
d3.select("body")
  .append("h1")
  .text("hello")
  .style({"color":"pink"})

var parent = d3.select("body")
  .append("div")
parent.append("h2").text("heading one")
parent.append("h2").text("heading two")

  // .on(event String,fn Function)
parent.on("click",function(data,index) {
  alert(d3.event.target.innerText)
})
