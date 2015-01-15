var data = [
  {text: "hi", value: 10},
  {text: "there", value: 30},
  {text: "d3", value: 20}
]

render();
tick();

function render() {
  // TODO select elements
  var update = d3.select("#bind-to-me")
      .selectAll("li")
      .data(data)
      .text(function(d) {
        return d.text;
      })
  //
  // TODO handle new elements
  var enter = update.enter();
  enter.append("li")
    .text(function(d) {
      return d.text;
    })

  //
  // TODO elements that need to leave
  var exit = update.exit();

  exit.remove();
}

function tick() {
  setInterval(function() {

    if(Math.random() > 0.5) {
      var v = Math.random() * 1000 | 0;
      data.push({
        text: "item " + v,
        value: v
      })
    } else {
      var half = (data.length / 2 | 0);
      d3.shuffle(data);
      data = data.slice(0, half + (Math.random() * half | 0))
    }

    render();

  }, 100);
}
