   // csv layout - "parent_id","parent_text","child_id","child_text"
d3.csv("swimming-pool-with-id.csv") 
.then(data => { console.log('data', data);

    /***** Initialize and Convert to D3 *****/ // Not needed here
        // let stratify = d3
        //     .stratify()
        //     .id(d => d["child_id"])
        //     .parentId(d => d["parent_id"]);
        // let stratified = stratify(data);
        // console.log('stratified', stratified);


        /***** Initial Dimensions *****/
    let width = document.body.clientWidth * 12;
    let height = document.body.clientWidth * 12; // Weird calculations without w & h being the same
    let svg = d3.select('svg.force')
    .attr('viewBox', [0, 0, width, height]); // Different way to style force directed svg
    // .attr('width', width)
    // .attr('height', height);



    // csv layout - "parent_id","parent_text","child_id","child_text"
    let links = []; // We're gonna want: Source, Target, Weight~
    data.forEach(obj => {
        obj.source = obj.parent_id; // Name parent_id Source
        delete obj.parent_id;
        obj.target = obj.child_id; // Name child_id source (for links section)
        delete obj.child_id;
       
        let newObj = {
            source: obj.source,
            target: obj.target
        }; // Pass in source and target into links for nodes(data) 
        links.push(newObj);

        obj.id = obj.target; // Rename target to id for cleaner naming
        delete obj.target;
    }); 
    console.log('New data return!')
    console.log('nodes', data);
    console.log('links', links);

    force(data);
    function force(nodes) {
            /***** Initialize the Simulation *****/
       /* Noteworthy force functions
           *   forceCenter (for setting the center of gravity of the system)
           *   forceManyBody (for making elements attract or repel one another)
           *   forceCollide (for preventing elements overlapping)
           *   forceX and forceY (for attracting elements to a given point) - parent_id x/y
           *   forceLink (for creating a fixed distance between connected elements)
       */

        // For Xscale, we need domain max of parent id value
        var max = Math.max.apply(Math, nodes.map(function(o) { return o.source; }))
        console.log('max', max);

        // xScale needed for d3 simulation
        var xScale = d3.scaleLinear().domain([0, max]).range([-1000, width - 2200]);


        var simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody()) // .strength(5))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collision', d3.forceCollide().radius(d => {return 10;}))
            .force('x', d3.forceX().x(d => xScale(d.source) ))            
            // .force('y', d3.forceY().y(d => {
            //     return 0;
            // }))
            // .force('link', d3.forceLink().links(links).id(d => d.id))

        function ticked() {
            /* Links section */
            var links = svg.select('g.links')
                .attr('stroke', '#999')
                .attr('stroke-opacity', '.5')
                .selectAll('line')
                    .data(links)
                    .join('line')
                        .attr('stroke-width', '1');

            /* Nodes section */
            var nodes = svg.select('g.circles')
                .selectAll('circle')
                .data(nodes);

            nodes.enter()
                .append('circle')
                .attr('r', '10px')
                .merge(nodes)
                // .attr('cx', d => d.x)
                // .attr('cy', d => d.y)
            .call(drag(simulation));
                // nodes.exit.remove();

            simulation.on('tick', () => {
                link
                    .attr('x1', d => d.source.x)
                    .attr('y1', d => d.source.y)
                    .attr('x2', d => d.target.x)
                    .attr('y2', d => d.source.y);

                node
                    .attr('cx', d => d.source.x)
                    .attr('cy', d => d.target.y);
            });
            invalidation.then(() => simulation.stop());

            return svg.node;

        }
    }

});
