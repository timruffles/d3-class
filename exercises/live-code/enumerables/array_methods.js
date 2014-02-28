
var people = [
  {age: 7},
  {age: 12},
  {age: 24},
  {age: 36},
];


var ages = [];
for(var i = 0; i < people.length; i++) {
  ages[i] = people[i].age;
}

var agesUsingMap = people.map(function(person) {
  return person.age
})
var agesUsingUnderscore = _.pluck(people,"age");


var totalAge = 0;
for(var i = 0; i < people.length; i++) {
  totalAge += people[i].age;
}

var totalAgeReduce = people.reduce(function(sum,person) {
  return sum + person.age;
},0);


var adults = [];
for(var i = 0; i < people.length; i++) {
  if(people[i].age >= 18) {
    ages.push(people[i]);
  }
}

var adultsUsingFilter = people.filter(function(person) {
  return person.age >= 18;
});

var allAdults = people.every(function(person) {
  return person.age >= 18;
});
var atLeastOneAdult = people.some(function(person) {
  return person.age >= 18;
});


