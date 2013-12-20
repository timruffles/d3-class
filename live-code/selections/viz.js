d3.select("body")
  .text("Hello from D3");

// grab body, add header, set text
d3.select("body")
  .append("h2")
  .text("Hello from D3");
// grab body, add header, add anchor, add text
d3.select("body")
  .append("h2")
  // switched to talking about h2 now
  .append("a")
  .text("Hello from D3");

var a = d3.select("body");
var b = a.append("h2");
var c = b.append("a");
var d = c.text("Hello from D3");
// c & d will be the same context

// grab body, add div, add two headers with text
var container = d3.select("body")
  .append("div");

container
  .append("h2")
  .text("Hello from D3");

container
  .append("a")
  .style("color","red")
  .style({"color":"blue","background":"pink"})
  .text("Hello from D3");


// remember: we're chaining so we can store the current
// context in a variable to refer to it as many times as
// required (e.g for multiple children)
