%section
	%h1 Data viz with d3.js

%section
	%h2 d3.js is a standards based, data visualisation library

%section
	%h2 What does it do

	%script
		:javascript


%section
	%h2 Works on elements

	SVG, HTML

%section
	%h2 Works on data

	We assign datums to elements

%section
	%h2 Philosophy

	Don't invent a propritatory API - use SVG, HTML. You'll see 'g' elements just like in SVG, not new names for old things (eg jQuery - `dataType` not `responseType`)

	A toolkit for visualisations, not lots of prebaked ones

	Therefore, definitely not a charting library

%section
	%h2 Three key tasks

	%ol
		%li Grab some elements
		%li Bind data
		%li Reflect change in data

%section
	%h2 Grabbing elements

	%p Similar to jQuery, but with hierarchy

	%pre
		:preserve
			for(var i = 0;i<5;i++) $("body").append("<div />");
			$("div").each(function(i,el) { 
				for(var i = 0;i<5;i++) el.append("<span>hello</span>");
			});
			// 25 spans, ungrouped
			var $title = $("div span")
			// 5 groups of 5 spans
			var ∂titles = d3.selectAll("div").selectAll("span")
		
%section
	%h2 Binding data

	This is great for data - if we had 5 rows of 5 columns, we could easily bind that data

	%pre
		:preserver

			var ∂titles = d3.selectAll("div").selectAll("span")
			∂titles.data([
				[1,2,3,4,5],
				[1,2,3,4,5],
				[1,2,3,4,5]
			]);

%section
	%h2 Reflecting change

	%pre
		:preserve
			var s = d3.select("body").selectAll("div").data([1,2,3,5,6,7,8]);
			s.enter().append("div").style({opacity: 0}).text("foo").transition().style({opacity: 1});
			s.exit().transition().style({opacity: 0}).remove();

	%p Two types - change in values, data leaving stage

%section
	%h2 Key functions

	%p If we change data, we need a way for d3 (and us) to know it's actually referring to the same thing.

	%p Key fn tells d3 which of the values is a unique key.

%section
	%h2 Change in values

%section
	%h2 Leaving stage

%section
	%h2 Animation

%section
	%h2 Ranges and domains

	%p Domain is the range of values something has

	%p Range is a visual representation of that domain

	%p We map between them

%section
	%h2 Functional scales

	%p d3 can create our scales, so we don't need to.

	%pre
		:preserve
			var mapping = d3.scale.linear()
				.domain([d3.min(data), d3.max(data)])
				.range([0,VISUAL_SIZE_DESIRED]);

	%p Has built in colour scales that look lovely

%section
	%h2 Layouts

	%p Don't lay things out

	%p Calculate useful data _to_ lay things out.

	%p Most generic part of a layout is the algorithm to create values, that's what d3 gives you.

	%p Bound to the data, accessed as if you had a `dx` and `dy` in your data.

%section
	%h2 Our visualisation

	%p Browser history

%section
	%h2 Time series data

%section
	%h2 Pull data out of SQLite

%section
	%h2 First iteration - moving timeseries

%section
	%h2 Second iteration - adding sites

%section
	%h2 Third iteration
