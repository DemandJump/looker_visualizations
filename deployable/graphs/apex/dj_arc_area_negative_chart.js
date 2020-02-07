looker.plugins.visualizations.add({
    options: {
        name: {
            label: 'Name of the look',
            order: 1,
            section: 'Format',
            type: 'string',
            placeholder: 'Enter a name',
            hidden: false
        },
    },
    create: function(element, config) {
        element.innerHTML = `
            <div class="row">
                <div class="col-md-4">
                    <div class="card mb-3 widget-chart">
                        <div class="widget-numbers">1.2M</div>
                        <div class="widget-subheading">Leads Generated</div>
                        <div class="widget-description text-info">
                            <i class="fa fa-ellipsis-h">

                            </i>
                            <span class="pl-1">112.5%</span></div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        // let node = document.getElementById('chart-apex-negative');
        // while(node.firstChild) node.firstChild.remove();
        console.log('These are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', data);

        let name = ' ';
        if (config.name) name = config.name;

        let value = data[0][queryResponse.fields.measures[0].name].value;

        element.innerHTML = `
        <div class="row">
            <div class="col-md-4">
                <div class="card mb-3 widget-chart">
                    <div class="widget-numbers">1.2M</div>
                    <div class="widget-subheading">${name}</div>
                    <div class="widget-description text-info">
                        <i class="fa fa-ellipsis-h">

                        </i>
                        <span class="pl-1">${value}%</span></div>
                </div>
            </div>
        </div>
        `;
        
        /**************** Done! *****************/
        doneRendering(); 
    }
});





























