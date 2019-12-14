/* Register a new custom visualization with loooker by calling the
        * looker.plugins.visualizations.add ~ function and passing it a visualization object 
    */
   looker.plugins.visualizations.add({
    id: 'hello_world_test',
    label: 'Looker Custom Visualization Test',
    options: {
      aResetColors: {
        label: 'Use default colors',
        order: 0.1,
        type: 'boolean', 
        section: 'Styling',
        default: false
      }, 

      notes: {
        label: "Title notes",
        order: .4,
        section: "Styling",
        type: "sentence_maker",
        words: [
            { type: "separator", text: "Choose the color for each corresponding dimension" }
        ]
      }
    },

    // Onto the create section 
create: function(element, config) {
    let d3 = d3v5; // Pull in d3 selector as it's normal reference
    this._counter = 0;
    this._hidden = false; // Set it to true for the commented out options values
    this._resetColors = true;
    this._collapseAmount = 0;


  d3.select('body')
      .style('position', 'fixed')
      .style('left', '0')
      .style('right', '0')
      .style('top', '0')
      .style('bottom', '0')
      .style('margin', '0')
      .style('overflow', 'hidden')
      .style('display', 'block')


    element.innerHTML = `
        <style>

        body {
          position: fixed;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: 0;
          overflow: hidden;
          display: block;
        }

        /* Import the Roboto font for us to use. */
        @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

        
        .djctNode djctCircle {
          fill: #fff;
          stroke: steelblue;
          stroke-width: 3px;
        }
        
        .djctNode text {
          font: 12px sans-serif;
        }
        
        .djctLink {
          fill: none;
          stroke: #ccc;
          stroke-width: 2px;
        }
        
        .djctText, text { /* Cool trick to make the captions on the links more readable! */
            text-shadow:
             -1px -1px 3px white,
             -1px  1px 3px white,
              1px -1px 3px white,
              1px  1px 3px white;
            pointer-events: none; /* This hides the edit cursor when you hover over the labels */
            font-family: 'Playfair Display', serif;
        }
        svg { border: 1px solid black; }
        </style>
        `;

       this._svg = d3.select(element).append('svg')
            .attr('class', 'container');


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
    console.log('\n\n\n\nOriginal settings', this.options);
    console.log('config', config);
    console.log('queryResponse', queryResponse);
    console.log('data', data);

    /**********************
     * Error Clauses 
    **********************/
    if (queryResponse.fields.dimensions.length == 0) {
        this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        return;
    }

    /************************************************************************************
    * Setting up the Dimension Options
    ************************************************************************************/
    let dimensions = queryResponse.fields.dimension_like;
    let measures = queryResponse.fields.measure_like;
    let defaultColors = ['#999999', '#B6DCB7', '#FF6B00', '#008CCD', '#F8B0A3', '#FDBC40', '#D9524A', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999', '#999999'];
    let colorCounter = 0;


        // This is a loop for all the dimensions to color 
    dimensions.forEach((dimension, index) => {
        this.options[dimension.name] = {
            label: dimension.label_short, 
            order: index + 1,
            type: 'string',
            section: 'Styling',
            display: 'color',
            default: defaultColors[colorCounter]
        }
        colorCounter++;
    });

      // This is the color for the measures altogether
    this.options['djdh_measures'] = {
        label: 'measures',
        order: 11,
        type: 'string',
        section: 'Styling', 
        display: 'color',
        default: '#FFE09B'
    };

    this.options['collapseDepth'] = {
        label: 'Expand the tree out multiple levels',
        order: 0,
        type: 'string', 
        display: 'select',
        section: 'Styling',
        values: [],
        default: '0'
    }

    let dimensionLength = dimensions.length; 
    for(let i = 0; i < dimensionLength; i++) {
        let key = `${i}`;
        let valuepair = `${i}`; 
        let val = {};
        val[key] = valuepair;
        this.options['collapseDepth'].values.push(val);
    }

    if (this._counter == 0) {
      this._counter ++;
      this.trigger('registerOptions', this.options);
    }
    
    // if (dimensions.length != this._collapseAmount) changed = true; 
    // console.log('This is changed', changed);
    // if (changed) this.trigger('registerOptions', this.options);

/****************************************************************
        * Update the Options
****************************************************************/

            /* // Chosen colors is an array that will be used in a function, we're preloading the data so it doesn't build this for every iteration // */
    let chosenColors = ['#009DE9', '#3ec173', '#38e883', '#4a4aff', '#163796', '#5cf3ff', 
    '#F9BE3D', '#E2FF6E', '#acea49', '#ff3e5f', '#ac7eb7', '#5c3bc3', 
    '#5278ce', '#a1edff', '#05ce5a', '#4a8c04', '#3abbcf', '#ece428',
     '#999999']; // Construct the colors of each dimension order by depth
    dimensions.forEach(dim => {
      let currentDim = dim.name;
        // Find the current dim's color value through config!
      let currentColor = config[currentDim];
      chosenColors.push(currentColor);
    })
    chosenColors.push(config['djdh_measures']);


    if (config.aResetColors == true) chosenColors = defaultColors; 
    // console.log('chosen colors', chosenColors);
    /***************************************************************************************************************************
                        * Update the Visualization *
    ***************************************************************************************************************************/
  let maxDimensions = queryResponse.fields.dimensions.length;
  let maxMeasures = queryResponse.fields.measures.length;
  let i = 0; // This is a counter for all the individual instantiated nodes originially used to test the collapse function
  let duration = 500;
  let nested = this.burrow(data, queryResponse.fields.dimension_like);
  let width = element.clientWidth;
  let height = element.clientHeight;

  let container = this._svg 
      .html('')
      .attr('width', width)
      .attr('height', height);

  let svg = container.append('g')
      .attr('class', 'everything');
  let zoom_handler = d3.zoom()
      .on('zoom', zoom_actions);
  function zoom_actions() {
    svg.attr('transform', d3.event.transform);
  }
  let treemap = d3.tree().size([height, width]);
  let root = d3.hierarchy(nested, function(d) { return d.children });
    root.x0 = height / 2;
    root.y0 = 0;
  container.call(zoom_handler);


  let updatInit = 0;
  let mNodeRef = []; // Add all the measures as nodes within the visualization!
  let mNodeLabel = []; // so first find all the names of the measures so we can reference them
  let mCounter = 0; // We need this for the nodeLabel to be in sync with the foreach iteration of the Node Reference
  measures.forEach(measure => {
      mNodeRef.push(measure.name);
      mNodeLabel.push(measure.label_short);
  });
  root.leaves().forEach(leaf => {
    let newChildren = [];
    mNodeRef.forEach(mnode => { // We're replicating the node within the node!
      // childeren object for this jazz
      let newDepth = leaf.depth + 1
      let mNodeObj = {
        mCount: mNodeLabel[mCounter], 
        data: leaf.data.data[mnode],
        depth: newDepth,
        parent: leaf
      }
      mNodeObj.data["name"] = mNodeObj.data.value;
        // Pass it into leaf children as collapsed descendants
      newChildren.push(mNodeObj);
      mCounter++;
    })
    leaf._children = null;
    leaf.children = newChildren; // Pass in the array of children you just created (hopefully they calculate it's position in the update function with just this data!)
    mCounter = 0; // Reset the counter for the next leaf node
  });


      // This is for the initial run of the update function, to calculate the data then collapse the leaf nodes before we run the visualization
  let maxDepth = 0;
  if (measures.length != 0) {
      root.descendants().forEach(node => { if (maxDepth < node.depth) maxDepth = node.depth; })
      root.descendants().forEach(node => {
        if (node.depth == maxDepth - 1) { // Right before the leaf nodes, we're collapsing the children
          node._children = node.children;
          node.children = null;
        }
      })
      // console.log('This is the new max depth', maxDepth);
  }


  if (config.collapseDepth) this._collapseAmount = Number(config.collapseDepth);
  root.children.forEach(collapse);
  function collapse(d) {
      if(d.children) {
          if (d.depth > config.collapseDepth) {
              d._children = d.children;
              d._children.forEach(collapse);
              d.children = null;
          } else {
              d.children.forEach(collapse);
          }
      }
  }
  


  update(root);
  function update(source) {
  let leaves = root.leaves();
  height = 84 * leaves.length; // This calculates the space between the nodes!
  treemap = d3.tree().size([height, width]);
  let treeData = treemap(root);
  let nodes = treeData.descendants();
  let links = treeData.descendants().slice(1);
  console.log('\n\nnodes', nodes); //
  console.log('links', links); // 
  let linkAddition = "";  
  data.forEach(datum => {
    var keys = [];
    for (var key in datum) {      
        if (datum.hasOwnProperty(key)) keys.push(key);
    } // Put keys into an array then display them in the data set
    for (var k = 0 ; k<keys.length; k++) { 
      // console.log(keys[k], datum[keys[k]]); // This is referencing the name key, then the value pair of each specific one!
      let currentString = datum[keys[k]].value;
      if(currentString != null) {
        if(linkAddition.length < currentString.length) {
          linkAddition = currentString;
        }
      }
   }
    i++; // Used to show current iteration we're on
  });
  // console.log('Calculated longest string!', linkAddition);

  // ****************** Move camera to center of tree ***************************

  if (updatInit == 0) {
      updatInit++;
      // console.log(`Coordinates to head to => x: ${root.x}, and y: ${root.y}.`);
      // zoom_handler.translateBy(container, root.x, root.y);
      // d3.select('.everything').transition().duration(1000).call(zoom_handler.translateBy, root.x, root.y);

      // let x = -1 * (root.x - (window.innerHeight / 2)); // 2 
      // let y = root.y + (window.innerWidth / 4); // 4
      // container.transition().duration(1200).call(
      //   zoom_handler.transform,
      //   d3.zoomIdentity.translate(y, x).scale(1) // 1
      // );
      
      container.transition().duration(740).call(
        zoom_handler.transform,
        d3.zoomIdentity.translate(window.innerWidth / 2, window.innerHeight / 2).scale(1).translate(-root.y, -root.x),
      );

  }
  
  // ****************** Link width ***************************

  // Normalize for fixed-depth. because of collapse function 
  nodes.forEach(function(d){ // This calculates the depth between the nodes!
    if(linkAddition.length >= 54) {
      d.y = d.depth * (linkAddition.length * 20);
    } else {
      d.y = d.depth * 1450;
      // console.log('d.y = ', d.y);
    }
  });
//   console.log('new Nodes: ', nodes)

  // ****************** Nodes section ***************************

  // Update the nodes...
  var node = svg.selectAll('g.djctNode')
      .data(nodes, function(d) {return d.id || (d.id = ++i); });

  // Enter any new modes at the parent's previous position.
  var nodeEnter = node.enter().append('g')
      .attr('class', 'djctNode')
      .attr("transform", function(d) {
        return "translate(" + source.y0 + "," + source.x0 + ")";
    })
    .on('click', click);

     
  // Add Circle for the nodes
  nodeEnter.append('circle')
      .attr('class', 'djctCircle')
      .attr('r', '25px')
      .style('fill', "#008CCD")
      .style('stroke', '#999999');


  // Add labels for the nodes
  nodeEnter.append('text')
      .attr('class', 'djctText')
      .attr("dy", ".35em")
      .attr("x", d => {
        if(d.mCount) { return "20px" }
        else { return d.children || d._children ? "-31.4px" : "29.4px"; }
      })
      .style("font-size", d => d.children || d._children ? textSize(d) : "2rem" )
      .attr("text-anchor", d => {
        if(d.mCount) { return "start" }
        else { return d.children || d._children ? "end" : "start"; }
      })
      .text(d => d.data.name);

  if(measures[0] != null) {
         // Second label for measure leaf nodes only
    nodeEnter.append('text')
      .attr('class', 'djctText')
      .attr('dy', '.35em')
      .attr('x', d => {
        if (d.mCount) { return "-20px" }
        return d.children || d._children ? "29.4px" : "-31.4px";
      })
      .style('font-size', d => d.children || d._children ? "2rem" : textSize(d) )
      .attr('text-anchor', d => {
        if (d.mCount) { return "end"; }
        else { return d.children || d._children ? "start" : "end"; }
      })
      .text(d => {
        if (d.mCount) { // If this is a looker measure, then we're appending this
          return d.mCount;
        }
      })
  }

  // UPDATE
  var nodeUpdate = nodeEnter.merge(node);

  // Transition to the proper position for the node
  nodeUpdate.transition()
    .duration(duration)
    .attr("transform", function(d) { 
        return "translate(" + d.y + "," + d.x + ")";
     });

  // Update the node attributes and style
  nodeUpdate.select('circle.djctNode')
    .attr("r", d => d.children || d._children ? '25px' : '12.5px' )
    .style('fill', d => {
        return d.children ? chosenColors[d.depth] // "#008CCD" 
        : !d.children && !d._children ? chosenColors[d.depth] // "#FEBF43" 
        : "#008CCD";
    })
    .style('stroke', d => {
      return d.children ? '#008CCD' : '#999999';
    })
    .attr('cursor', 'pointer');


  // Remove any exiting nodes
  var nodeExit = node.exit().transition()
      .duration(duration)
      .attr("transform", function(d) {
          return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

  // On exit reduce the node circles size to 0
  nodeExit.select('circle')
    .attr('r', 1e-6);

  // On exit reduce the opacity of text labels
  nodeExit.select('text')
    .style('fill-opacity', 1e-6);

  // ****************** links section ***************************

  // Update the links...
  var link = svg.selectAll('path.djctLink')
      .data(links, function(d) { return d.id; });

  // Enter any new links at the parent's previous position.
  var linkEnter = link.enter().insert('path', "g")
      .attr("class", "djctLink")
      .attr("opacity", "0.64")
      .style("stroke", "#008CCD")
      .attr('d', function(d){
        var o = {x: source.x0, y: source.y0}
        return diagonal(o, o)
      });

  // UPDATE
  var linkUpdate = linkEnter.merge(link);

  // Transition back to the parent element position
  linkUpdate.transition()
      .duration(duration)
      .attr('d', function(d){ return diagonal(d, d.parent) });

  // Remove any exiting links
  var linkExit = link.exit().transition()
      .duration(duration)
      .attr('d', function(d) {
        var o = {x: source.x, y: source.y};
        return diagonal(o, o);
      })
      .remove();

  // Store the old positions for transition.
  nodes.forEach(function(d){
    d.x0 = d.x;
    d.y0 = d.y;
  });

//   Creates a curved (diagonal) path from parent to the child nodes
  function diagonal(s, d) {

    path = `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`

    return path;
  }

    // We're gonna need to create a zoom function reference
  var zoom = d3.zoom();

  // Toggle children on click.
  function click(d) {
    if (d.children == null) {
        d.children = d._children;
        d._children = null;
      } else {
        d._children = d.children;
        d.children = null;
      }
    update(d);
    console.log('this is the clicked node data', d);    
    d3.event.stopPropagation();
    container.transition().duration(740).call(
      zoom_handler.transform,
      d3.zoomIdentity.translate(window.innerWidth / 2, window.innerHeight / 2).scale(0.5).translate(-d.y, -d.x),
      d3.mouse(container.node())
    );
  }

  function colorCircles(d) {
    // We're using defaultColors array, and the settings have the vlaues ew need, but the dimensions array pulls them in the order we need. 
        // Start from d level 1, 0 can have a unique styling
    for(i = 0; i < maxDepth; i++) {
      if (i == d.depth) {
        return chosenColors[i];
      }
    }
  }

  function textSize(d) {
    return d.depth == 0 ? '8rem'
    : d.depth == 1 ? '4.5rem'
    : d.depth == 2 ? '4rem'
    : d.depth == 3 ? '3.4rem'
    : d.depth == maxDepth ? '2rem'
    : '2.25rem';
  }

} // End of update function

    /**************** Done! *****************/
    doneRendering() 
}
});










