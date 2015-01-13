(function() {

main(document.querySelector("svg"), 100);

function main(el, hue) {

  d3.select(el)
    .selectAll("circle")
    .transition()
    .duration(500)
    .styleTween("fill", function() {
      return d3.interpolateHsl(d3.select(this).style("fill")
        , "hsl(" + hue + ", 80%, 80%)");
    });

  setTimeout(main, 500, el, (hue + 10) % 360);
}



})();
