var data = [
  { year: 1999,  poolDeaths: 109 , cageFilms: 2 },
  { year: 2000,  poolDeaths: 102 , cageFilms: 2 },
  { year: 2001,  poolDeaths: 102 , cageFilms: 2 },
  { year: 2002,  poolDeaths: 98  , cageFilms: 3 },
  { year: 2003,  poolDeaths: 85  , cageFilms: 1 },
  { year: 2004,  poolDeaths: 95  , cageFilms: 1 },
  { year: 2005,  poolDeaths: 96  , cageFilms: 2 },
  { year: 2006,  poolDeaths: 98  , cageFilms: 3 },
  { year: 2007,  poolDeaths: 123 , cageFilms: 4 },
  { year: 2008,  poolDeaths: 94  , cageFilms: 1 },
  { year: 2009,  poolDeaths: 102 , cageFilms: 4 },
];


var CAGE_FILMS = "cageFilms"

// TODO select groups (.film), bind data
var films = d3.selectAll(".film")
  .data(data);

films.attr("transform", function(d, i) {
  //  - each group's x is 80px to right of previous
  var x = (80 + i * 80);
  //  - each group's y is (200 - (d.cageFilms * 20 + 20)) px
  var y = (200 - (d[CAGE_FILMS] * 20 + 20));

  // end up with string like: translate(10px, 20px)
  // transform: scale(0), rotate(0)
  return "translate(" + x + ", " + y + ")";
});

// TODO make each circle's radius (poolDeaths / 4) pixels
// CSS units always have a unit - visual unit, e.g em, ex, px, pt
// SVG units in SVG attributes - unitless
var circles = films
  .select("circle")
  .attr("r", function(d, i) {
    return d.poolDeaths / 4;
  })


// TODO set each <text>'s content to d.year
var text = films.select("text")
  .text(function(data, index) {
    return data.year; 
  });
  























