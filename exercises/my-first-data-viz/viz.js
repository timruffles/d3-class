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
]



// TODO select groups (.film), bind data
var films;
// TODO translate the groups so
//  - each group's x is 80px to right of previous
//  - each group's y is (200 - (d.cageFilms * 20 + 20)) px

// TODO make each circle's radius (poolDeaths / 4) pixels
var circles;


// TODO set each <text>'s content to d.year
var text;
