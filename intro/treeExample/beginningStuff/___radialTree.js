        var width = document.body.clientWidth,
        height = document.body.clientHeight; 
        const margin = { top: 0, right: 0, bottom: 0, left: 0};
        // This keeps the image from being cutoff from the sides
        const innerWidth = width - margin.left - margin.right;
        // This keeps the image from being cutoff at the top/perhaps bottom
        const innerHeight = height - margin.top - margin.bottom; 
        svg = d3.select("svg")
          .attr("width", width)
          .attr("height", height),
        g = svg.append("g"),
        cluster = d3.cluster()
            .size([2 * Math.PI, innerWidth / 2]) // without math.pi it will break
        fontSize = d3.scaleSqrt()
          .range([30, 7]);

    svg.append("rect")
      .attr("width", width)
      .attr("height", height)
      .style("fill", "none") // Crucial for creating all shapes in trees
      .style("pointer-events", "all")
      .call(d3.zoom() // Zoom function
          .scaleExtent([1 / 2, 4])
          .on("zoom", zoomed));

    function zoomed() { // Zoom event handler
      g.attr("transform", d3.event.transform);
    }
    
    d3.json("data.json") // pass in the data to be mapped out 
        .then( data => { // v5 Promise create the structure to map
      var hierarchy = d3.hierarchy(data); // Add hierarchy
      cluster(hierarchy); // Add cluster style 
      var descendants = hierarchy.descendants(); // We fan this out like a waterfall, so you use descendants
      // In tidytree you use .link to map out the function correctly
      
      // Input scaling font size based on the depth of the node, how far down the tree hole (^:;
      fontSize.domain(d3.extent(descendants, function (d){ return d.depth; }))
      
      var link = g.selectAll(".link")
          .data(descendants.slice(1)) 
        .enter().append("path")
          .attr("class", "link")
          .attr("d", d => {
            if(d.parent === descendants[0]){ // These map out all the line segments on the radTree
              return "M" + project(d.x, d.y) // They really create the curves in our segments
                + " " + project(d.parent.x, d.parent.y);
            } else {
              return "M" + project(d.x, d.y)
                + "C" + project(d.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, (d.y + d.parent.y) / 2)
                + " " + project(d.parent.x, d.parent.y);
            }
          });
      
      var node = g.selectAll(".node") 
          .data(descendants)
        .enter().append("g")
          .attr("transform", function(d) {
            return "translate(" + project(d.x, d.y) + ")";
          });

      node.append("text")
        .text(function (d){ // adds node's id data(name) to each node(line segment) created 
          return d.data.data.id;
        })
        .attr("font-size", function (d){ // sets the font-size based on the node depth 
          return fontSize(d.depth) + "pt";
        })
        .attr("transform", function(d) { // Sets the angle of the text based on these if clauses
          var theta = -d.x / Math.PI * 180 + 90;
          if(d.x > Math.PI){ // if x is negative it flips the text around so it's readable
            theta += 180;
          }
          if(d.depth !== 3 && Math.abs(theta) < 30){
            theta = 0; // This realigns the text for bigger titles for more readability
          }
          if(d.depth > 1){ // This makes sure that all nodes rotate based on the degrees given 
            return "rotate(" + theta + ")";
          } else {
            return "";
          }
        })
        .attr("text-anchor", function (d){
          if(d.depth === 3){
            return (d.x > Math.PI)
            ? "end" // if x is negative, return string at end of node
            : "start"; // if x is positive, return string at beginning
          } else { 
            return "middle"; // otherwise, return string in the middle!
          }
        })
        .attr("dx", function (d){ // Puts spacing on leaf nodes (technically end nodes) from text and line segment 
          if(d.depth === 3){ 
            return (d.x > Math.PI) 
            ? "-2px" // negative if the text is to the left(if d.x is negative)
            : "2px"; // positive if the text is to the right(if d.x is positive)
          } else {
            return "0px";
          }
        })
        .classed("glow", d => {
          return d.depth !== 3;
        })
        .attr("alignment-baseline", "central"); // realigns the text to the center of the node 
    });
    
    function project(theta, r){
      return [
        width / 2 + r * Math.sin(theta),
        height / 2 + r * Math.cos(theta)
      ]
    }