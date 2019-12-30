import * as d3 from './node_modules/d3';


console.log('Rendering the dj collapsible graph')
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
    console.log('Before we make this bad boy dynamic, run it with a dataset of 420 and make it scale!');
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
    /* Object { // !!!Initial data given, we're gonna have to account for variation after this!!!
            djb_scores.dj_score: { value: float, rendered:  num } // circle size 
            djb_scores.phrase: { value: string } // child 
            djb_scores.query_string: { value: string }  // parent
    }
    */

        // First mutate the data/dimensions given to create a dataset 
    let mutadata = data;
    let rootChildren = []; // We may need to hold the root children 
    let thisParent = ``; 
    let initialIteration = 0; // for first iteration
    mutadata.forEach(obj => {
                // object's parent (source)
        obj.source = obj["djb_scores.query_string"]["value"];
            delete obj["djb_scores.query_string"];
                // object value (target)
        obj.target = obj["djb_scores.phrase"]["value"];
            delete obj["djb_scores.phrase"];
                // Dj score
        obj.dj_score = obj["djb_scores.dj_score"]["rendered"];
            delete obj["djb_scores.dj_score"];
                    /*
                    // Now the returned data for each object should be 
                        obj {
                            source: djb_scores.query_string.value
                            target: djb_scores.phrase.value
                            dj_score: djb_scores.dj_score.rendered
                        }
                    */
                // We need to create an index(id) for each and every one
                // We must create objects(targets) for the query strings and have them link2root

        /* 
        if (initialIteration == 0) { // Rendered useless since the roots are connected to themselves, we just need to connect them to a single root called "query strings"
            initialIteration++; 
            // Gotta initialize this by pulling in the first var around the logic
            thisParent = obj.source;
            rootChildren.push(thisParent); // Store it in rootChildren
        }
        if (thisParent != obj.source) {
            thisParent = obj.source; 
            rootChildren.push(thisParent);
        }
        */

        // Okay so we don't need to create root children because every query string is a phrase, and they put one phrase in with it's query string as the same. We just need to change it's source(once was query string) to root(varname: 'query string')
        if (obj.source == obj.target) {
            obj.source = "query strings"; // Wayy easier to do ;P
        }

    });
    console.log('mutadata without root and rootChildren', mutadata);
    /*
    console.log('RootChildren data', rootChildren);
    // Reverse the array to take into account how unshift works and how we iterated through before
    rootChildren.reverse();
    rootChildren.forEach(srcname => {
        let current = { // Current object made to put into mutadata based on rootChildren~
            source: "query strings",
            target: srcname,
            dj_score: "100"
        };
        mutadata.unshift(current);
    });
    */
    // Then we'll add the root
    mutadata.unshift(
        {
            source: "",
            target: "query strings",
            dj_score: "145"
        }
    );
    console.log('finished mutadata', mutadata);


        // Turning links into a hierarchy with stratify method
    let stratify = d3
        .stratify()
        .id(d => d["target"])
        .parentId(d => d["source"]);
    let stratified = stratify(mutadata);
    console.log('stratified data!', stratified);


        // Now let's see what we can do with this data in d3 force
            /*** Create the hierarchy layout ***/
    let root = d3.hierarchy(stratified);
    let links = root.links();
    let nodes = root.descendants();
    console.log('root data', root);
    console.log('link data', links);
    console.log('node data', nodes);


            /*** Initialize the simulation ***/
    /* My own linkDistance setup */
        // First Let's pull the max depth, and create a scale based on it 
    var maxDepth = Math.max.apply(Math, links.map(function(o) { return o.target.depth; }));
            /*!!! Can we make a dynamic amount for a ternary clause? Scaling this force graph will get hairy !!!*/
        
        // For now we're gonna make it easier by distancing the beginning and letting the rest be less spaced out
    let forceLink = d3
        .forceLink(links).id(d => d.data.id)
        .distance(d => {
            // console.log('d for distance ', d)
            return d.target.depth == 0 ? 0 // Root doesn't link to anything, and shouldn't have a distance
            : d.target.depth == 1 ? 40000 // This should be plenty of space for everything to breath, but we'll see
            : d.target.depth == 2 ? 6000 // 3 hierarchical steps out, root(1) > rootChildren(2) > rootGrandChildren(3)
            : d.target.depth == 3 ? 45 // Hopefully this is alright, but we'll find a better way to scale later
            : 11; 
        })
        .strength(1);


    let simulation = d3.forceSimulation(nodes)
        // .force('link', d3.forceLink(links).id(d => d.target).distance(125).strength(1))
        .force('link', forceLink)
        .force('charge', d3.forceManyBody().strength(-20000))
        .force('x', d3.forceX())
        .force('y', d3.forceY())
        .force('collision', d3.forceCollide().radius(d => {
            // d.data.data.dj_score * 4
            return d.depth == 0 ? 0 // Root doesn't link to anything, and shouldn't have a distance
            : d.depth == 1 ? 2000 // This should be plenty of space for everything to breath, but we'll see
            : d.depth == 2 ? 425 // 3 hierarchical steps out, root(1) > rootChildren(2) > rootGrandChildren(3)
            : d.depth == 3 ? d.data.data.dj_score * 4.2 // Hopefully this is alright, but we'll find a better way to scale later
            : 11; 
        }));

            /*** Initialize the svg shapes's layout ***/
    // let width = document.body.clientWidth;
    // let height = document.body.clientHeight;
    let width = element.clientWidth;
    let height = element.clientHeight;
    
    let container = this._svg
        .html('')
        // .attr('viewBox', [0 - width, 0 - height * 2, width, height * 2]);
        .attr('width', width)
        .attr('height', height);

    // Before you build anything make a selector to hold everything
    const svg = container.append('g')
        .attr('class', 'everything');
    // Zoom stuff // 
    var zoom_handler = d3.zoom()
        .on("zoom", zoom_actions);
    zoom_handler(container); // Select the svg to do the zoom stuff
    function zoom_actions(){ // The function itself (^:;
    svg.attr("transform", d3.event.transform)
    }


            // LINKS
    let link = svg.append('g')
            .attr('class', 'links')
            .attr('stroke-opacity', '0.6')
        .selectAll('line')
        .data(links)
        .enter().append('line')
            .attr('stroke-width', '2.5')
            .attr('stroke', d => {
                // Maybe a scale from bad to good for it's color based on dj_score
                return '#000';
            })

            // NODE GROUPS
    let group = svg.append('g') // Holds respective text and circle for each node <neatly>
            .attr('class', 'node')
            .selectAll('g')
            .data(nodes)
            .enter().append('g');

            // CIRCLES
    let node = group
            .attr('class', 'circle')
            .attr('stroke-width', 1.25)
        .append('circle')
            .attr('fill', d => { // circle color
                return d.data.depth == 0 ? '#FEBF43'
                : !d.data.children ? '#008CCD'
                : '#999999'
            })
            .attr('stroke-width', "4px")
            .attr('stroke', "#999999")
            .attr('r', d => d.data.data.dj_score * 4)
            .call(drag(simulation));

            // TEXT
    let labels = group
        .append('text')
            // .transition()
            // .duration(5000)
            // .attr('fill-opacity', 1)
            .text(d => d.data.data.target)
            .style("text-anchor", "middle")
            .style("font-family", "Palatino, Sans-serif")
            .style("font-size", '1.6rem');
     

            /*** Initialize the simulation's movement physics ***/
    simulation.on('tick', () => {
        link
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y);

        node    
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
        d3.selectAll('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y);

        // invalidation.then(() => simulation.stop()); // Deprecated ?
        return svg.node();
    })


            /* Section for all our functions */
    // Drag node on click physics function
    function drag(simulation) {
  
        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }
    
        function dragged(d) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }
    
        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    
    return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
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

/*
    git status
    git add . 
    git commit -m "experimenting"
    git push -u origin master 
    git status

*/

/* 
        // * Pulled out of update the visualization * // 
    // Basic interaction of given data through iteration, console log data to further understand
    var html = "";
		for(var row of data) {
			var cell = row[queryResponse.fields.dimensions[0].name];
            html += LookerCharts.Utils.htmlForCell(cell);
            console.log('iterated cell', cell);
        }
        element.innerHTML = html; // This is to test the data 
        console.log('The last cell given: ', cell);

*/