var comparisons = {
  run: function(el) {

    var demoEl = d3.select(el)
    var ctrlsEl = demoEl
      .append("div")
      .classed("ctrls",true)
    ctrlsEl.append("h2").text("Best at")
    ctrlsEl.append("div")
          .classed("radios",true)

    demoEl.append("div")
          .classed("graphs",true)
    
     var data = [
      {"name":"jquery", data: [["dom",1], ["svg",0], ["data",0], ["open",0.7 ]]},
      {"name":"d3", data: [ ["dom",0.6], ["svg",1], ["data",1], ["open",1 ]]},
      {"name":"highcharts", data:[ ["dom",0], ["svg",0.1], ["data",0.6], ["open",0 ]]},
      {"name":"raphael", data: [["dom",0], ["svg",1], ["data",0], ["open",0.5 ]]},
      {"name":"processing", data:[ ["dom",0], ["svg",0], ["data",0.5], ["open",0.2 ]]}
    ];

    var titles = {
      open: "Uses existing APIs",
      dom: "DOM tools",
      svg: "SVG tools",
      data: "Facilities for working with data"
    };

    var reorder;
    // selection behaviour
    var cats = data[0].data.map(function(d,i) { return { name: d[0], selected: i === 0 } });

    var radios = d3.select(el).select(".radios").selectAll("radio").data(cats).enter()
      .append("label");

      radios
        .append("input")
        .attr("name","sort")
        .attr("value",function(d) {
          return d.name
        })
        .attr("type","radio")
        .on("change",function(data) {
          cats.forEach(function(c) { c.selected = false });
          data.selected = true;
          reorder();
        });
      el.querySelector("input[value=dom]").checked = true;
      radios.append("span").text(function(d) { return titles[d.name] });
      

    data.forEach(function(d) {
      d.dict = d.data.reduce(function(h,kv) {
        h[kv[0]] = kv[1];
        return h;
      },{});
    });

    var getSelected = function() { for(var c in cats) if(cats[c].selected) return cats[c] };

    reorder = function() {
      var selected = getSelected().name;
      data = data.sort(function(a,b) {
        return b.dict[selected] - a.dict[selected];
      });
      render();
    };

    var render = function() {

      var sections = d3.select(el).select(".graphs").selectAll("div");

      var bound = sections.data(data,function(d) { return d.name })


      var enter = bound.enter()
                    .append("div")
                    .classed("data-framework",true)
                    ;

      // update + enter
      bound.style("top",function(d,i) {
        return i * 128 + "px";
      });

      enter.append("h2")
          .text(function(d) { return d.name })

          ;

      var colors = d3.scale.category10();
      var width = d3.scale.linear().domain([0,1]).range([1,800]);

      var divs = enter.append("div")
        .classed("graph",true)
        .selectAll("div")
        .data(function(d) {
          return d.data
        });
            
      divs.enter().append("div")
        .text(function(d) {
          return d[0]
        })
        .attr("class",function(d) { return "bar " + d[0] })
        .style("background",function(d,i) { return colors(i) })
        .style("width",function(d) {
          return width(d[1]) + "px"
        })


    };

    reorder();
  }
}

