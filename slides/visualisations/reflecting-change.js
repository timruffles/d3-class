var reflectingChange = (function() {
    return {
        run: function() {
            d3.select("#change-btn").on("click", draw);
            draw();
        },

        showDemoCode: function(el) {
            setTimeout(function() {
                var codeElem = d3.select("#demo-code-17 code");
                revealCodeByXhr('code-samples/reflecting-change-sample.js', codeElem[0][0]);
            }, 2500);
        }
    }
})()
