looker.plugins.visualizations.add({
    options: {},
    create: function(element, config) {
        this.clearElements = 0;
        element.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Vertical Columns</h5>
                            <div id="chart-apex-column"></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        let element = document.getElementById('chart-apex-column');
        element.innerHtml = '';

        
        if (this.clearElements >= 1) {
            
            // Apex Charts
            window.Apex = {
                dataLabels: {enabled: false},
                stroke: {width: 2}
            };


            // Column

            var options3 = {
                chart: {
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        endingShape: 'rounded',
                        columnWidth: '55%',
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                series: [{
                    name: 'Net Profit',
                    data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
                }, {
                    name: 'Revenue',
                    data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
                }, {
                    name: 'Free Cash Flow',
                    data: [35, 41, 36, 26, 45, 48, 52, 53, 41]
                }],
                xaxis: {
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                },
                yaxis: {
                    title: {
                        text: '$ (thousands)'
                    }
                },
                fill: {
                    opacity: 1

                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "$ " + val + " thousands";
                        }
                    }
                }
            };


            var chart3 = new ApexCharts(
                document.querySelector("#chart-apex-column"),
                options3
            );


            // Apex Charts Init
            if (document.getElementById('chart-apex-column')) {
                chart3.render();
            }

        }
  
        this.clearElements++;
        /**************** Done! *****************/
        doneRendering(); 
    }
});




