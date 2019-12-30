require('./d3v5.js.js');

(function() {
    var d3 = d3v5;
    console.log('this is d3', d3);

    /* Register a new custom visualization with loooker by calling the
        * looker.plugins.visualizations.add ~ function and passing it a visualization object 
    */
    looker.plugins.visualizations.add({
        options: {
            font_size: {
                type: "string",
                label: "Font Size",
                values: [
                    {"Large": "large"},
                    {"Small": "small"}
                ],
                display: "radio",
                default: "large"
            }
        },
        // Onto the create section 
    create: function(element, config) {
        // Element is the Dom element that looker would like us to put our visualization into
            // Looker formats it to the proper size, you just need to put the stuff here
    // We're essentially using vanilla javascript to create a visualization for looker to append!

        // Insert a <style> tag with some styles we'll use later.
        var css = element.innerHTML = `
            <style>
                .hello-world-vis { 
                    // Vertical centering
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center; 
                    text-align: center;
                }
                .hello-world-text-small {
                    font-size: 18px;
                }
                .hello-world-text-large { 
                    font-size: 72px;
                }
            </style>
            `;

        // Create a container element to let us center the text.
        var container = element.appendChild(document.createElement('div'));
        container.className = "hello-world-vis";

        // Create an element to contain the text 
            // -> This is a selector reference variable for updateASync
        this._textElement = container.appendChild(document.createElement('div'));



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

            // Create different cases for potential errors that could occur
        // Throw some errors and exit if the shape of the data isn't what this chart needs.
        if (queryResponse.fields.dimensions.length == 0) {
            this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
            return;
        }


        /***********************************
         * Update the Visualization *
        ***********************************/
        console.log('Initialized...'); // just to see if it initialize
        // Grab the first row of data 
        let firstRow = data[0];
        let firstCell  = firstRow[queryResponse.fields.dimensions[0].name];

        // Insert the data into the page. 
        this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);


        /**********************
         * Update the Options
        **********************/
        // Here's a check we add to the end of the update function to implement the options 
        if (config.font_size == "small") {
            this._textElement.className = "hello-world-text-small";
          }
        if (config.font_size == "large") {
            this._textElement.className = "hello-world-text-large";
          }


        /**************** Done! *****************/
        // Always call done to indicate a visualization has finished rendering
        doneRendering() 
    }
});

})
