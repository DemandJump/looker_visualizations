/* Register a new custom visualization with loooker by calling the
        * looker.plugins.visualizations.add ~ function and passing it a visualization object 
    */
looker.plugins.visualizations.add({
    id: 'hello_world_test',
    label: 'Looker Custom Visualization Test',
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

        <h1>Ready to render!</h1>
        `;
            // Then add the inline-styling with the h1 html to see it!
            element.innerHTML = html;




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
    var html = "";
		for(var row of data) {
			var cell = row[queryResponse.fields.dimensions[0].name];
			html += LookerCharts.Utils.htmlForCell(cell);
		}
		// element.innerHTML = html; // This is to test the data 


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

/*
    git status
    git add . 
    git commit -m "experimenting"
    git push -u origin master 
*/