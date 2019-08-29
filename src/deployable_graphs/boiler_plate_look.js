// Toss in the version you want to use, v4 is proven to work, v5 isn't
require('./d3v5.js');

(function() {

    /* Register a new custom visualization with loooker by calling the
        * looker.plugins.visualizations.add ~ function and passing it a visualization object 
    */
    looker.plugins.visualizations.add({
        id: 'visualization-id',
        label: 'Visualization Title Description',
        options: {},
    create: function(element, config) {
        var d3 = d3v5; // Pull in your own d3 and overwrite the global selector
        console.log('this is d3', d3);

        // Element is the Dom element that looker would like us to put our visualization into
            // Looker formats it to the proper size, you just need to put the stuff here
        // We're essentially using vanilla javascript to create a visualization for looker to append!

        // Insert a <style> tag with some styles we'll use later.
        var css = element.innerHTML = ``;

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
           // You can clean up the error console as you iterate or even create custom errors
        // Clear any errors from previous updates.
        this.clearErrors();

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