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
                {"Medium": "medium"},
                {"Small": "small"}
            ],
            display: "radio",
            default: "large"
        }
    },

    // Onto the create section 
create: function(element, config) {
    let d3 = d3v5; // Pull in d3 selector as it's normal reference
    // Element is the Dom element that looker would like us to put our visualization into
        // Looker formats it to the proper size, you just need to put the stuff here
// We're essentially using vanilla javascript to create a visualization for looker to append!

    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
        <style>
            /*
            svg {
                border: 1px solid black;
            }
            */
            text { /* Cool trick to make the captions on the links more readable! */
                text-shadow:
                 -1px -1px 3px white,
                 -1px  1px 3px white,
                  1px -1px 3px white,
                  1px  1px 3px white;
                pointer-events: none; /* This hides the edit cursor when you hover over the labels */
                font-family: 'Playfair Display', serif;
            }
            body { margin:0;position:fixed;top:0;right:0;bottom:0;left:0; }

        </style>
        `;
        /*
        <svg class="container">
            <svg class="content">
            </svg>
        </svg>
        */
       this._svg = d3.select(element).append('svg')
            .attr('class', 'container');

            

    /* 
        So create is where you setup the visualization, then we render it in updateAsync
            Note: Create is a convenient place t o do setup that only needs to happen once 
    */

},
burrow: function(table, taxonomy) {
  // create nested object
  var obj = {};
  table.forEach(function(row) {
    // start at root
    var layer = obj;

    // create children as nested objects
    taxonomy.forEach(function(t) {
      var key = row[t.name].value;
      layer[key] = key in layer ? layer[key] : {};
      layer = layer[key];
    });
    layer.__data = row;
  });

  // recursively create children array
  var descend = function(obj, depth) {
    var arr = [];
    var depth = depth || 0;
    for (var k in obj) {
      if (k == '__data') { continue; }
      var child = {
        name: k,
        depth: depth,
        children: descend(obj[k], depth+1)
      };
      if ('__data' in obj[k]) {
        child.data = obj[k].__data;
      }
      arr.push(child);
    }
    return arr;
  };

  // use descend to create nested children arrys
  return {
    name: 'root',
    children: descend(obj, 1),
    depth: 0
  };
},
    // Onto the update async section
updateAsync: function(data, element, config, queryResponse, details, doneRendering) { 
    let d3 = d3v5; // Pull in the d3 selector as it's normal reference 
    // This helps us visualize the interactive data!
    // This function is called any time the chart is supposed to visualize changes, or when any other event happens that might affect how your chart is rendered.
    
                            /* CURRENT VERSION */ 
    console.log('D3 force with burrow and scaling ');
        // Just comment what your doing becuase looker takes forever to update server js file

        // Try implementing d3
    console.log('d3v5 initialized', d3);
        /****** Log all these functions to see what we're working with ******/
    console.log(`\n\n\n\n\nUpdateAsync initialized, here is it's data: `);
    console.log('data', data);
    console.log('element', element);
    console.log('config', config);
    console.log('queryResponse', queryResponse);
    console.log('details', details);

    /**********************
     * Error Clauses 
    **********************/
        // Clear any errors from previous updates.
    // this.clearErrors(); /* !!! Important try keeping this off for now !!!


        // Create different cases for potential errors that could occur
    // Throw some errors and exit if the shape of the data isn't what this chart needs.
    if (queryResponse.fields.dimensions.length == 0) {
        this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        return;
    }


    /**********************************************************************
                        * Update the Visualization *
    **********************************************************************/
        // Playing with dimensions and measures
    console.log('Checking out query resposne dimension fields: ', 
        queryResponse.fields.dimensions);
    console.log('Checking out query resposne measure fields: ', 
        queryResponse.fields.measures);
    console.log('Checking out query resposne dimension fields: ',   
        queryResponse.fields.dimensions.length);
    console.log('Checking out query resposne measure fields: ',         
        queryResponse.fields.measures.length);
        // Dimension and Measure length 
    let maxDimensions = queryResponse.fields.dimensions.length;
    let maxMeasures = queryResponse.fields.measures.length;
        // The selector references for dimensions and length 
    let dimensions = queryResponse.fields.dimensions;
    let measures = queryResponse.fields.measures;



    /****************************************************
              * Initialize the infrastructure *
    ****************************************************/


          //*// Burrowing into the Data //*//
    let nested = this.burrow(data, queryResponse.fields.dimension_like);
    console.log('burrow function results on raw data: ', nested);

        // Initial dimensions, plus instantiating some variables
    let width = element.innerWidth, // Dimensions w & h
    height = element.innerHeight,
    treemap = d3.tree().size([height, width]), // Tree layout (hierarchy must be applied to data before this will work)
    notch = 0, // Notch is the counter for our good ol daters
    maxDepth = 0,
    minMeasure = 100000000000,
    maxMeasure = 0,
    collisionInitialization = 0,
    totalnodes = 100, // This is for the scaling based on the data that is given
    scaleFactor = 0.1,
    nodes,
    links,
    dragNodes,
    dragLinks,
    dragABranch,
    simulation,
    reset = false,
    friction = .05; // This determines the link length based on the data that's given


                // Mutate the data to have everything you need for the visualizations looks upon startup and stuff // 
    root = d3.hierarchy(nested, d => d.children);
    console.log('this is root(hierarchy): ', root);

    console.log('root descendants', root.descendants());
    root.descendants().forEach(node => {
        node.size = Math.floor((Math.random() * 100) + 1); // Calculating the size in place of looker's given measures!

            // Use this to find the min and max measure for the scale factors for the nodes, put them in place of the domain values
        if(node.size < minMeasure) { minMeasure = node.size; }
        if(node.size > maxMeasure) { maxMeasure = node.size; }
    });   console.log(`The min measure is ${minMeasure} and the max measure is ${maxMeasure}`); // It works!

            // Now that we've instantiated the min and max measures based on (looker measures(for us our made up random values))
        // Let's go ahead and create the scale functions based on the notch focus   
    scaleC = d3.scaleLinear().domain([minMeasure, maxMeasure]).range([1, 25]);
    scaleB = d3.scaleLinear().domain([minMeasure, maxMeasure]).range([30, 60]);
    scaleA = d3.scaleLinear().domain([minMeasure, maxMeasure]).range([70, 120]);

        // Take in the finished scale functions to calculate the radius before we calculate the simulation
    root.descendants().forEach(node => {    // Scale in the size based on the depth = notch starts at zero
            // So on d = 0 then scale a, d = 1 then scale b, else then d = scale c
        if(node.depth == 0) { node.radius = scaleA(node.size); } 
        if(node.depth == 1) { node.radius = scaleB(node.size); } 
        else { node.radius = scaleC(node.size); }
    })

    /****************************************************
                 * End of Initialization *
    ****************************************************/



    /*****************************************
                * Build the svg *
    *****************************************/
    let container = this._svg 
        .html('')
        .attr('width', width)
        .attr('height', height);
        // Selector to hold everything
    let svg = container.append('g')
        .attr('class', 'everything');
        // Zoom Stuff // 
    let zoom_handler = d3.zoom()
        .on('zoom', zoom_actions);
    zoom_handler(container);
    function zoom_actions() {
        svg.attr('transform', d3.event.transform)
    }


        // When we're ready and have built the infrastructure, and formatted the data properly.
    update();
    /*****************************************
                * End of build *
    *****************************************/



/**************************************************************************************************
* UPDATE FUNCTION - Handles grabbing the user edited data and changing the visuals based on that
**************************************************************************************************/
function update() { /* Initialize some parameters that we will need for */
    nodes = root.descendants(); console.log('Nodes: ', nodes);
    links = root.links(); console.log('links: ', links);
    console.log('notch: ', notch);
    let totalnodes = -1 * (root.descendants().length * scaleFactor)
    dragNodes = root.descendants().map(map => map.index);
    
    
            // Physics function section for the simulation layout
    let collision = d3.forceCollide().radius(d => d.radius + 5).iterations(5); // The iterations smooth out the collision's rendering (it's very useful)
    let repelforce = d3.forceManyBody().strength(30).distanceMax(55).distanceMin(110)
    let attractforce = d3.forceManyBody().strength(-40).distanceMax(500).distanceMin(20)
            // Initialize the simulation // 
    let simulation = d3.forceSimulation()
        .force('center', d3.forceCenter(height / 2, width / 2))
        .force('link', d3.forceLink().id(d => d.index))
        .force('attract', attractforce) // This spaces things out, with repel it can be messy
        .force('repel', repelforce) // This pulls things in, Very useful!
        .force('collision', collision) // This spaces out the nodes to give everything room to breathe
            .alphaDecay(friction) // This slows down the simulation over time (it's friction!)
            // .alpha(1)
            // .alphaTarget(.05)
                .on('tick', ticked)
    
        // Restart the force layout: This what runs the data and reshapes it
    if (reset) {
        simulation.restart();
        reset = false;
    }
        // Essential to update our data
    simulation // Give it the new nodes
        .nodes(nodes)
        .force('collision')
    simulation.force('link')
        .links(links)
    simulation
        .restart();
            
    
        // Onto instantiating the nodes 
            let node = svg.selectAll('.node')
            let link = svg.selectAll('.link')
            let clickedBranch;
// Create and update the nodes
    node = node.data(nodes, d => d.id);
    let nodeEnter = node.enter().append('g') // Enter only edits newly instantiated elements
        .attr('class', 'node')
        .attr('id', d => { if(d.depth == 0){return "root";} }) // Give root the id for notch selector
        .on('click', click)
        .call(drag(simulation));
// Create the circle
    nodeEnter.append('circle') // Only edits the entering circles
        .attr('border', border)
        .attr('r', notchRadius)
        .style('fill', color);
// Create the text for the node
    nodeEnter.append('text')
        .attr('dx', textSpacing)
        .attr('dy', '.35em')
        .style('font-size', fontSize)
        .text(d => d.data.name); // This inputs the text
    
//Create and update the links 
    link = link.data(links, d => d.id);
    link.enter().insert('line', '.node')
        .attr('class', 'link')
        .attr('stroke', '#008CCD')
        .attr('stroke-width', '5')
        .attr('opacity', '0.52')
    
            //Exit Section
        node.exit().remove();
        link.exit().remove();
    
    
            // Setup for future update functions
        collisionInitialization++; // This is for the beginnging of the physics
        friction = 0.1;
    }/*************************************************************************************************
    *                      END OF UPDATE      =>=>=>=>      ONTO FUNCTIONS                         *
    **************************************************************************************************/
                                        /********************************************
                                                                  Functions section *
                                        ********************************************/
    /*********************************************************************
     * Simulation Physics 
    *********************************************************************/
    // Simulation physics // 
    function ticked() { // On each tick, specifify these parameters for this stuff
        d3.selectAll('.link')
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });
        d3.selectAll('.node').attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }
    
    function drag(simulation) { // This is for moving the nodes around with user input functions and events
        let clickDate = new Date(); // This is to see if you double click for dragended
        let difference_ms;
        function dragstarted(d) { // On click to start the physics
    
            if (!d3.event.active) simulation.alphaTarget(0.05).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
        function dragged(d) { // While holding click and moving the mouse and node around
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }  
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
                // Time between 2 ends of drag:
            difference_ms = (new Date()).getTime() - clickDate.getTime();
            clickDate = new Date();
                // if the time between these 2 ends of drag is short enough, then
                // it's considered a double click:
            if (difference_ms < 200) {
                    // And we can release the node:
                simulation.alphaTarget(0).restart()
                d3.event.subject.fx = null;
                d3.event.subject.fy = null;
            }
        }
    
        return d3.drag() // .on instantiates these functions
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended);
    }
    
    function resetNodes() {
        nodes.forEach(function(d) {
            d.fx = d.fy = null;
        });
        collisionInitialization = 0;
        // friction = .05;
        reset = true;
        update();
        simulateClick(document.getElementById('root'), 'click');
        simulateClick(document.getElementById('root'), 'click');
    }
    
    
    /*********************
     * Styling Functions    
    *********************/
    function color(d) { // Calculates the color     
        // Notch based color function 
      return d.depth == 0 ? "#c6dbef"
        : d.notch == 'a' ? "#008CCD"
        : d.notch == 'b' ? "#fd8d3c"
        : "#999999"
    }
    
    function border(d) {    // Calculates the border
        return d._children ? "#c6dbef" // collapsed node
            : d.children ? "#008CCD" // expanded node
            : "#fd8d3c" // leaf node
    }
    
    function notchRadius(d) {   // Calculates the radius based on the depth of the node and the current notch you're on.
        if(d.depth == notch) {
            d.notch = 'a';
            d.radius = scaleA(d.size);
            return d.radius;
        } if(d.depth == notch -1 || d.depth == notch - 1) {
            d.notch = 'b';
            d.radius = scaleB(d.size);
            return d.radius;
        } else {
            d.notch = 'c';
            d.radius = scaleC(d.size);
            return d.radius;
        }
        // console.log('end of notch radius', d);
    }
    
    function textSpacing(d) {
        console.log('this is text spacing', d )
        let spacing = 2 * d.r * Math.cos(Math.PI / 4),
        dx = d.r - spacing / 2; 
        return dx;
    }
    
    function fontSize(d) { // Calculate the font size based on the depth
        //console.log('text stuff', d);
        return d.notch == 'a' ? '2.1rem'
        : d.notch == 'b' ? '1.4rem'
        : '.2rem'
    }
    
    
    /*********************
     * Utility Functions    
    *********************/
        // Toggle children on click.
    function click(d) {
        console.log('d', d);
        clickedBranch = dragNodes;
        if (d3.event.defaultPrevented) return; // ignore drag
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(); // Rerun the function with the new data
    }
    
        // Button functions
    function notchDown() {
        if(notch != 0) {
            notch --; // To navigate the depth
            d3.select('.seeNotch').text(d => { return `Focus: ${notch}`}); // Changes the text based on click 
            update(); // Rerun the simulation (notch calculates node size)
            simulateClick(document.getElementById('root'), 'click'); // Reset the collision physics by clicking the nodes
            simulateClick(document.getElementById('root'), 'click'); // Double click to cancel the collapse
        }
    }
    function notchUp() {
        if(notch < maxDepth) {
            notch ++;
            d3.select('.seeNotch').text(d => { return `Focus: ${notch}`});
            update(); 
            simulateClick(document.getElementById('root'), 'click');
            simulateClick(document.getElementById('root'), 'click');
        }
    }
    
        // This is the function that simulates a click on a selected element
    function simulateClick(el, etype){
        if (el.fireEvent) {
            el.fireEvent('on' + etype);
        } else {
            var evObj = document.createEvent('MouseEvents');
            evObj.initEvent(etype, true, false);
            var canceled = !el.dispatchEvent(evObj);
            if (canceled) { // A handler called preventDefault.
                console.log("automatic click canceled");
            } else {
                // None of the handlers called preventDefault.
            } 
        }
    }










    /**********************
     * Update the Options
    **********************/
    // Here's a check we add to the end of the update function to implement the options 





    /**************** Done! *****************/
    // Always call done to indicate a visualization has finished rendering
    doneRendering() 
}
});
