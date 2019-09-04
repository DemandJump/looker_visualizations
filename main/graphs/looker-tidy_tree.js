// Toss in the version you want to use, v4 is proven to work, v5 isn't
require('./d3v4.js');

(function() {

    /* Register a new custom visualization with loooker by calling the
        * looker.plugins.visualizations.add ~ function and passing it a visualization object 
    */
    looker.plugins.visualizations.add({
        options: {},
    create: function(element, config) {
        var d3 = d3v4; // Pull in your own d3 and overwrite the global selector
        console.log('this is our stable d3', d3);

        // Element is the Dom element that looker would like us to put our visualization into
            // Looker formats it to the proper size, you just need to put the stuff here
        // We're essentially using vanilla javascript to create a visualization for looker to append!

        // Insert a <style> tag with some styles we'll use later.
        var css = element.innerHTML = `
    <style>
.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 3px;
}

.node text {
  font: 12px sans-serif;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}

/* Not needed, used to test svgs dimensions */
svg { border: 1px solid black; }

body { /* this is used in all tidy svgs! */
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: 0;
    overflow: hidden;
    display: block;
}

text { /* Cool trick to make the captions on the links more readable! */
    text-shadow:
     -1px -1px 3px white,
     -1px  1px 3px white,
      1px -1px 3px white,
      1px  1px 3px white;
    pointer-events: none; /* This hides the edit cursor when you hover over the labels */
    font-family: 'Playfair Display', serif;
}
    </style>
        `;

        this._svg = d3.select(element).append('svg');

        /* 
            So create is where you setup the visualization, then we render it in updateAsync
                Note: Create is a convenient place t o do setup that only needs to happen once 
        */

    },
        // Onto the update async section
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        // This helps us visualize the interactive data!
        // This function is called any time the chart is supposed to visualize changes, or when any other event happens that might affect how your chart is rendered.

        /**********************
         * Error Clauses 
        **********************/
            // Clear any errors from previous updates.
        // this.clearErrors(); /* !!! Important try keeping this off for now !!!

            // You can clean up the error console as you iterate and even create custom errors

        /***********************************
         * Update the Visualization *
        ***********************************/

        /**********************
         * Update the Options
        **********************/

        /************ 
         * Done!
        ************/
            // Always call done to indicate a visualization has finished rendering
        doneRendering() 
    }

// Close it up 
    }); // looker.plugins.visualization.add({});
}) // (Function() {}) 