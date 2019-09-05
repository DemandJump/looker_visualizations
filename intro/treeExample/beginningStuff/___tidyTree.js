// (function (d3) {
    // 'use strict';
  
    const svg = d3.select('svg');
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;
  
    const margin = { top: 0, right: 00, bottom: 0, left: 00};
    // This keeps the image from being cutoff from the sides
    const innerWidth = width - margin.left - margin.right; 
    // This keeps the image from being cutoff at the top/perhaps bottom
    const innerHeight = height - margin.top - margin.bottom; 
    
    // tree() is the tidyTree layout, then you can specify the size of the svg
    const treeLayout = d3.tree().size([innerHeight, innerWidth]);
   
    const zoomG = svg // Margin breaks when we zoom, This is the outer group element
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'zoomzoom')
      .append('g')
      .attr('class', 'zoomG-g'); // Grouping all child elements to one svg container, so transform doesn't break the conglomerate svg
  
    const g = zoomG.append('g') // in the second g (zoomZ)
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .attr('class', 'g-class');
        // Now all svg elements translated together in unison
  
    svg.call(d3.zoom().on('zoom', () => { // on zoom, runs a callback function that in it's body, sets the transform of g. D3 visualtization to help pan and zoom through the svg
      zoomG.attr('transform', d3.event.transform);
    }));
  


    d3.json('data.json') // Pulls an external data file named data.json for us to create a tree 
      .then(data => { // Promise that consructs the json into a d3 hierarchy and tree
        const root = d3.hierarchy(data);
        root.x0 = height / 2;
        root.y0 = 0;

        const nodes = treeLayout(root).descendants()
        console.log('nodes', nodes)
        const links = treeLayout(root).links(); // tree(hierarchy(data)).links w/size declared 
        // console.log(data)
        const linkPathGenerator = d3.linkHorizontal() // maps out the lineSegments via x,y node vars
          .x(d => d.y)
          .y(d => d.x);
        

          // This is what actually builds all the links(line-segments)
        g.selectAll('path').data(links) // Selects all paths from root to leaf and the 
          .enter().append('path') // This appends the paths of all the nodes from root(source) to all the descending targets 
            .attr('d', linkPathGenerator); // This maps out the 
            
        g.selectAll('g').data(nodes) // Selects all paths from root to leaf and the 
          .enter().append('circle')
            .attr('class', 'node')
            .attr('r', '10px')
            .attr('transform', nodes => {
              console.log('link data', nodes)
              return `translate(` + nodes.y + `, ` + nodes.x + `)`}
            )
            .style('fill', 'lightsteelblue');


 
            // This is what actually builds all the pieces of text to the links
        g.selectAll('text').data(root.descendants()) // Gives us all nodes of hierarchy
          .enter().append('text') // Add text elements 
            .attr('x', d => d.y) // They accept x + y attr
            .attr('y', d => d.x) // We return the coordinates of each node to it 
            .attr('dy', '0.32em')  // This aligns the text to be centered on the respective segment
            // So we want to set the text anchor for the leaf nodes to be different than all the other nodes alignment. So we use a function to dynamically style the elements specific to what's needed 
            .attr('text-anchor', d => d.children 
            ? 'middle' // If there are children, then use middle! 
            : 'start' // Otherwise(for leaf nodes) use children!
        )
            .attr('font-size', d => 3.25 - d.depth + 'em') // Dynamic font-size based on node depth 
            .text(d => d.data.data.id); // TextContent. We pass in the name(id) 


      });

  
//   }(d3));




