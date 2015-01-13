
var tpl = require("./tpl/form-tpl.html");

describe("class handler form", function() {

  var el;

  beforeEach(function() {
    el = $(tpl)[0];
  });

  it("adds a new element when form submitted, re-rendering the display", function() {

    classHandler(el);

    $(el).find("input").val("bob");

    $(el).find("form button").click();

    expect(
      el.innerHTML
    ).toMatch(/bob/);

  });



});
