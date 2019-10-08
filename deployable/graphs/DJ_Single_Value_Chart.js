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
    let d3 = d3v5; // Pull in d3 selector as it's normal reference
    this._counter = 0;

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = ``;



    this._container = d3.select(element).append('div')
        .attr('class', 'container')
        .attr('id', 'container');
    
        // Clear out all the data upon startup! 
    this._container.selectAll("*").remove();

},
    // Onto the update async section
updateAsync: function(data, element, config, queryResponse, details, doneRendering) { let d3 = d3v5; // Important!
/**************************************************************************************************************************************
    * Error Clauses 
**************************************************************************************************************************************/
        // Clear any errors from previous updates.
    this.clearErrors();

        // You can create different cases for potential errors that could occur
    // Throw some errors and exit if the shape of the data isn't what this chart needs.
    if (queryResponse.fields.dimensions.length == 0) {
        this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        return;
    }
/**************************************************************************************************************************************
                                                                                                    * End of Error Clause
**************************************************************************************************************************************/


/**************************************************************************************************************************************
    * Initialization / Setup
**************************************************************************************************************************************/

                /* CURRENT VERSION */ // Just comment what your doing becuase looker takes forever to update server js file
    console.log('\n\n\n\n\nReplicating the google ads based on a search query the same as you would see when you search for a thing online.');
    /****** Log all these functions to see what we're working with ******/
console.log(` ...UpdateAsync initialized, here is it's data:`);
console.log('\n data', data);
console.log('element', element);
console.log('config', config);
console.log('queryResponse', queryResponse);
console.log('details', details);
    // Playing with dimensions and measures
    let dimensions = queryResponse.fields.dimensions;
    let measures = queryResponse.fields.measures;
    console.log('Checking out query resposne dimension fields: ', dimensions);
    console.log('Checking out query resposne measure fields: ', measures);

    console.log('config', this.options);
/**************************************************************************************************************************************
                                                                                                    * End of Dimension Initialization
**************************************************************************************************************************************/

    
/**************************************************************************************************************************************
    * Setting up the Dimension Options
**************************************************************************************************************************************/

}

});