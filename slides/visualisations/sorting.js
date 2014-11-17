;(function() {

var users = [
  { name: "bob" },
  { name: "sue" },
  { name: "alice" },
];

whenMarkdownRendered(function() {
  sortingEg("#sort-with", function(d,i) { return d.name });
  sortingEg("#sort-without", function(d,i) { return i });
});

function sortingEg(sel, key) {
  d3.selectAll(sel + " li")
    .datum(function(d,i) {
      return users[i];
    });
  render();

  d3.select(sel + "-btn")
    .on("click", function() {
        d3.shuffle(users);
        render();
    });

  function render() {
    var update = d3.select(sel)
      .selectAll("li")
      .data(users, key)
      .text(function(d, i) { return d.name + " (<li> " + 

          [].indexOf.call(this.parentElement.children,this) + 
           ")" })
      .style("top", function(_d, i) {
        return i * 1.5 + "em";
      });
  }
}

})();
