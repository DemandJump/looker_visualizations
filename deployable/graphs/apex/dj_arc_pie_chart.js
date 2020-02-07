looker.plugins.visualizations.add({
    options: {
        title: {
            label: 'Enter the title',
            order: 1,
            section: 'Format',
            type: 'string',
            placeholder: 'Enter the title of the chart',
            hidden: false
        }
    },
    create: function(element, config) {
        this.clearElements = 0;
        element.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <canvas id="chart-area"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        let node = document.getElementById('chart-area');
        while(node.firstChild) node.firstChild.remove();
        console.log('These are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', data)
        
        
        // Apex Charts
        window.Apex = {
            dataLabels: {enabled: false},
            stroke: {width: 2}
        };

        let title = ' ';
        if (config.title) title = config.title; 

        let labels = [];
        let dataset = [];
        for(let i = 0; i < queryResponse.fields.measures.length; i++) {
            labels.push(queryResponse.fields.measures[i].name);
            dataset.push(row[queryResponse.fields.measures[i].name].value);
        }

        let colors = [window.chartColors.red,window.chartColors.orange,window.chartColors.yellow,window.chartColors.green,window.chartColors.blue];
        for(let i = 0; i < window.COLORS; i++) {colors.push(window.COLORS[i]);}
        



    
        var configPie = {
            type: 'pie',
            data: {
                datasets: [{
                    data: dataset,
                    backgroundColor: colors,
                    label: title
                }],
                labels: labels
            },
            options: {
                responsive: true
            }
        };

        
        // Apex Charts Init

        if (document.getElementById('chart-area')) {
            let ctx2 = document.getElementById('chart-area').getContext('2d');
            window.myPie = new Chart(ctx2, configPie);
        }
        /**************** Done! *****************/
        doneRendering(); 
    }
});




