looker.plugins.visualizations.add({
    options: {},

    create: function(element, config) {
        /***** Create the built-in styling to center our svg, (haven't tried this before!) *****/
        var css = element.innerHTML = `
        <style>
        .node circle {
          fill: #fff;
          stroke: steelblue;
          stroke-width: 3px;
        } 
        .node text {
          font: 12px sans-serif;
        }
        .link {
          fill: none;
          stroke: #ccc;
          stroke-width: 2px;
        }
        /* Not needed, used to test svgs dimensions */
        svg { border: 1px solid black; }
        body { /* this is used in all tidy svgs! */
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: 0;
            overflow: hidden;
            display: block;
          }
          text { /* Cool trick to make the captions on the links more readable! */
            text-shadow:
             -1px -1px 3px white,
             -1px  1px 3px white,
              1px -1px 3px white,
              1px  1px 3px white;
            pointer-events: none; /* This hides the edit cursor when you hover over the labels */
            font-family: 'Playfair Display', serif;
          }
        </style>
        `;


            /***** Create the nodes to add in *****/
        // Create the zoom container for our svg        
        let zoomContainer = document.createElement('svg');
        zoomContainer.setAttribute('id', 'zoomContainer');
        zoomContainer.setAttribute('class', 'zoomContainer'); // Add it's class 
    
        // Create the base of the tree svg
        let treeSvg = document.createElement('svg');
        treeSvg.setAttribute('id', 'treeSvg');
        treeSvg.setAttribute('class', 'treeSvg');

        // Create the svg group that holds the data
        let group = document.createElement('g');
        group.setAttribute('id', 'data');
        group.setAttribute('class', 'data');


        /***** Append them into looker *****/
        let container = element.appendChild(zoomContainer);
        container.className = "d3-holder-vis";

            /*~ Hopefully I can just attach the rest to zoomContainer like vanilla js ~*/
        document.getElementById('zoomContainer').appendChild(treeSvg);
        document.getElementById('treeSvg').appendChild(group);


    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering){
        
    }
});
