var histogram = (function() {
    return {
        run: function(el) {
            drawHistogram(el);
        },

        showDemoCode: function(el) {
            var codeElem = d3.select("#demo-code-37 code");
            revealCodeByXhr('code-samples/histogram-sample.js', codeElem[0][0]);
        }
    }
}());
