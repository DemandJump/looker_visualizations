looker.plugins.visualizations.add({
    options: {},
    create: function(element, config) {
        this.clearElements = 0;
        element.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Stacked Horizontal Bars</h5>
                            <div id="chart-apex-stacked"></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        let elem = document.getElementById('chart-apex-stacked');
        elem.innerHtml = '';

        console.log('These are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', data);

        if (this.clearElements >= 1) {

            // Apex Charts
            window.Apex = {
                dataLabels: {enabled: false},
                stroke: {width: 2}
            };


            // Stacked Bar

            var options4 = {
                chart: {
                    height: 350,
                    type: 'bar',
                    stacked: true,
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    },

                },
                stroke: {
                    width: 1,
                    colors: ['#fff']
                },
                series: [{
                    name: 'Marine Sprite',
                    data: [44, 55, 41, 37, 22, 43, 21]
                }, {
                    name: 'Striking Calf',
                    data: [53, 32, 33, 52, 13, 43, 32]
                }, {
                    name: 'Tank Picture',
                    data: [12, 17, 11, 9, 15, 11, 20]
                }, {
                    name: 'Bucket Slope',
                    data: [9, 7, 5, 8, 6, 9, 4]
                }, {
                    name: 'Reborn Kid',
                    data: [25, 12, 19, 32, 25, 24, 10]
                }],
                title: {
                    text: 'Fiction Books Sales'
                },
                xaxis: {
                    categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014],
                    labels: {
                        formatter: function (val) {
                            return val + "K";
                        }
                    }
                },
                yaxis: {
                    title: {
                        text: undefined
                    },

                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return val + "K";
                        }
                    }
                },
                fill: {
                    opacity: 1

                },

                legend: {
                    position: 'top',
                    horizontalAlign: 'left',
                    offsetX: 40
                }
            };


            var chart4 = new ApexCharts(
                document.querySelector("#chart-apex-stacked"),
                options4
            );


            // Apex Charts Init
            if (document.getElementById('chart-apex-stacked')) {
                chart4.render();
            }
        }
        
        this.clearElements++;
        /**************** Done! *****************/
        doneRendering(); 
    }
});




