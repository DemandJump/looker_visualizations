// These svg layouts need specific styling for their templates to position properly, we can edit it as needed though!

// d3.json('data.json')
d3.csv('swimming-pool-with-id.csv')
    .then( data => {
        console.log('data', data)

            // Turning links into a hierarchy with stratify method
        let stratify = d3
            .stratify()
            .id(d => d["child_id"])
            .parentId(d => d["parent_id"]);
        let stratified = stratify(data);

        console.log('stratified data!', stratified);
            

// Get a bag chance - potato salad tyler - father stretch my hands kanye - i thought about killing you kanye - the man taylore

        /***********************************************
         * Dimensions and margins of the diagram
        ***********************************************/
        var margin = {top: 0, right: 00, bottom: 0, left: 0},
        width = document.body.clientWidth - margin.left - margin.right;
        // height = (leaves * 100) - margin.bottom - margin.top;
        height = (document.body.clientHeight * 125) - margin.top - margin.bottom;


        var treemap = d3.tree().size([height, width]); // Assigns parent, children, height, depth
        // Bringing this in early to change the height of the svg based on leaf nodes
        root = d3.hierarchy(stratified, function(d) { return d.children; });
            root.x0 = height / 2;
            root.y0 = 0;
            // console.log('root stuff', root ); //
        
        var leaves = root.leaves();
            // console.log('leaf data', leaves) //

        

    
        /***********************************************
         * Initialize the svg, and creating the template
        ***********************************************/
        var svg = d3.select("body").select("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
        .select("g.data")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");        
        var i = 0,
            duration = 745,
            root;
        var g = d3.select('svg.zoomContainer')
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom);

        // Adding Zoom functionality
        var zoom = d3.zoom().on('zoom', () => {
            svg.attr('transform', d3.event.transform)
        });
        g.call(zoom)
            .on("dblclick.zoom", null);
            // .on("wheel.zoom", null);            
            
        /***********************************************
         * Create the treemap via tree(json)
        ***********************************************/
    
        // Collapse after the second level
        // root.children.forEach(collapse);
        update(root);
        // Collapse the node and all it's children
        function collapse(d) {
          if(d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
          }
        }
        
        function update(source) {
            // console.log('i', i) //

        
          // Assigns the x and y position for the nodes
          var treeData = treemap(root);
        
          // Compute the new tree layout.
          var nodes = treeData.descendants(),
              links = treeData.descendants().slice(1);

            console.log('nodes', nodes); //
            // console.log('links', links); // 
        
          // Normalize for fixed-depth. because of collapse function 
          nodes.forEach(function(d){ d.y = d.depth * 1450});
        //   console.log('new Nodes: ', nodes)
        
          // ****************** Nodes section ***************************
        
          // Update the nodes...
          var node = svg.selectAll('g.node')
              .data(nodes, function(d) {return d.id || (d.id = ++i); });
        
          // Enter any new modes at the parent's previous position.
          var nodeEnter = node.enter().append('g')
              .attr('class', 'node')
              .attr("transform", function(d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);
        
          // Add Circle for the nodes
          nodeEnter.append('circle')
              .attr('class', 'node')
              .attr('r', '25px')
              .style('fill', d => d._children ? "#a5a5a5" : "#008CCD")

        
          // Add labels for the nodes
          nodeEnter.append('text')
              .attr("dy", ".35em")
              .attr("x", function(d) {
                  return d.children || d._children ? "-26.4px" : "15px";
              })
              .style("font-size", d => d.children || d._children ? "2rem" : "1.5rem" )
              .attr("text-anchor", d => d.children || d._children ? "end" : "start" )
              .text(d => d.data.data.child_text);
        
          // UPDATE
          var nodeUpdate = nodeEnter.merge(node);
        
          // Transition to the proper position for the node
          nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function(d) { 
                return "translate(" + d.y + "," + d.x + ")";
             });
        
          // Update the node attributes and style
          nodeUpdate.select('circle.node')
            .attr("r", d => d.children || d._children ? '25px' : '12.5px' )
            // .style('fill', d => d._children ? "#0480BB" : "#a5a5a5")
            .style('fill', d => {
                return d._children ? "#999999" :
                !d._children && !d.children ? "#FEBF43" :
                "#008CCD" 
            })
            .style('stroke', d => {
                return d._children ? "#008CCD" :
                "#999999"
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
          var link = svg.selectAll('path.link')
              .data(links, function(d) { return d.id; });
        
          // Enter any new links at the parent's previous position.
          var linkEnter = link.enter().insert('path', "g")
              .attr("class", "link")
              .style("stroke", "black")
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
                var o = {x: source.x, y: source.y}
                return diagonal(o, o)
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
        
            return path
          }
        
          // Toggle children on click.
          function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
              } else {
                d.children = d._children;
                d._children = null;
              }
            update(d);
          }
        }

    })
       