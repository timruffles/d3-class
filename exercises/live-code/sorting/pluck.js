


d3.selectAll("sth")
  .attr("top",function(d,i) {
    return d.age;
  })


function pluck(k) {
  return function(datum) {
    return datum[k];
  }
}

d3.selectAll("sth")
  .attr("top",pluck("age"))
