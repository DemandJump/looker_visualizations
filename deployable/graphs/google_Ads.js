looker.plugins.visualizations.add({
    options: {
        font_size: {
            type: "string",
            label: "Testing selection w/font",
            values: [
                {"Large": "large"},
                {"Medium": "medium"},
                {"Small": "small"}
            ],
            display: "select",
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
    /*************************************
     * Setting up the Dimension Options
    *************************************/
    let options = {};
        // Create an option for each measure in your query
    queryResponse.fields.dimensions.foreach(field =>  {
        id = 'Id_' + field.name;
        options[id] = 
        {
            type: 'string',
            label: field.label_short,
            default: '#887DAB',
            display: 'color'
        }
    })
    this.trigger('registerOptions', options) // register options with parent page to update visConfig




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
                            /* CURRENT VERSION */ 
    console.log('\n\n\n\n\nReplicating the google ads based on a search query the same as you would see when you search for a thing online.');
    // Just comment what your doing becuase looker takes forever to update server js file

          /*//*///* Add more spacing between the nodes, and then make the text more ledgible, and make the links skinnier and less visible   *///*//*/


    /****** Log all these functions to see what we're working with ******/
console.log(` ...UpdateAsync initialized, here is it's data: \n`);
console.log('data', data);
console.log('element', element);
console.log('config', config);
console.log('queryResponse', queryResponse);
console.log('details', details);

    // Playing with dimensions and measures
    console.log('Checking out query resposne dimension fields: ', queryResponse.fields.dimensions);
    console.log('Checking out query resposne measure fields: ', queryResponse.fields.measures);
        // The selector references for dimensions and length 
    let dimensions = queryResponse.fields.dimensions;
    let measures = queryResponse.fields.measures;


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
