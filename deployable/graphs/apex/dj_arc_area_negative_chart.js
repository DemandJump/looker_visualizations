looker.plugins.visualizations.add({
    options: {},
    create: function(element, config) {
        this.clearElements = 0;
        element.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <h5 class="card-title">Area with Negative Values</h5>
                            <div id="chart-apex-negative"></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        let node = document.getElementById('chart-apex-area');
        while(node.firstChild) {
            node.firstChild.remove();
        }
        console.log('\n\n\n\nThese are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', data);

        // Configuration for chart
        let alignTitle = 'left';
        // if (config.alignTitle) alignTitle = 'right';

        let alignLabel = 'left';
        if (config.alignLabel) alignLabel = 'right';

        let title = queryResponse.fields.measures[0].label;
        if (config.title) {
            if (config.title != '') title = config.title;
        }

        let label = queryResponse.fields.dimensions[0].label;
        if (config.label) {
            if (config.label != '') label = config.label;
        }

        let hoverLabel = queryResponse.fields.measures[0].label_short
        if (config.hoverLabel) {
            if (config.hoverLabel != '') hoverLabel = config.hoverLabel;
        }

        let curve = 'straight';
        if (config.curve) curve = config.curve;


        // Grab the data
        let dataSeries = {};
        dataSeries.dates = [];
        dataSeries.values = [];
        data.forEach(row => {
            dataSeries.dates.push(row[queryResponse.fields.dimensions[0].name].value);
            dataSeries.values.push(row[queryResponse.fields.measures[0].name].value);
        });
        console.log('dataSeries data', dataSeries);

        // Apex Charts
        window.Apex = {
            dataLabels: {enabled: false},
            stroke: {width: 2}
        };


        // Area Negative
        var options2 = {
            chart: {
                height: 350,
                type: 'area',
                // zoom: {
                //     enabled: false
                // }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: curve
            },
            series: [{
                name: 'north',
                data: [
                    {x: 1996,y: 322},
                    {x: 1997,y: 324},
                    {x: 1998,y: 329},
                    {x: 1999,y: 342},
                    {x: 2000,y: 348},
                    {x: 2001,y: 334},
                    {x: 2002,y: 325},
                    {x: 2003,y: 316},
                    {x: 2004,y: 318},
                    {x: 2005,y: 330},
                    {x: 2006,y: 355},
                    {x: 2007,y: 366},
                    {x: 2008,y: 337},
                    {x: 2009,y: 352},
                    {x: 2010,y: 377},
                    {x: 2011,y: 383},
                    {x: 2012,y: 344},
                    {x: 2013,y: 366},
                    {x: 2014,y: 389},
                    {x: 2015,y: 334}
                ]
            }, {
                name: 'south',
                data: [
                    {x: 1996,y: 162},
                    {x: 1997,y: 90},
                    {x: 1998,y: 50},
                    {x: 1999,y: 77},
                    {x: 2000,y: 35},
                    {x: 2001,y: -45},
                    {x: 2002,y: -88},
                    {x: 2003,y: -120},
                    {x: 2004,y: -156},
                    {x: 2005,y: -123},
                    {x: 2006,y: -88},
                    {x: 2007,y: -66},
                    {x: 2008,y: -45},
                    {x: 2009,y: -29},
                    {x: 2010,y: -45},
                    {x: 2011,y: -88},
                    {x: 2012,y: -132},
                    {x: 2013,y: -146},
                    {x: 2014,y: -169},
                    {x: 2015,y: -184}
                ]
            }],
            title: {
                text: 'Area with Negative Values',
                align: 'left',
                style: {
                    fontSize: '14px'
                }
            },
            xaxis: {
                type: 'datetime',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                tickAmount: 4,
                floating: false,

                labels: {
                    style: {
                        color: '#8e8da4',
                    },
                    offsetY: -7,
                    offsetX: 0,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false
                }
            },
            fill: {
                opacity: 0.5,
                gradient: {
                    enabled: false
                }
            },
            tooltip: {
                x: {
                    format: "yyyy", // Pretty sure: {year: 'yyyy',month: 'MMM \'yy',day: 'dd MMM',hour: 'HH:mm',minute: 'HH:mm:ss'}
                },
                fixed: {
                    enabled: false,
                    position: 'topRight'
                }
            },
            grid: {
                yaxis: {
                    lines: {
                        offsetX: -30
                    }
                },
                padding: {
                    left: 20
                }
            },
        };


        var chart2 = new ApexCharts(
            document.querySelector("#chart-apex-negative"),
            options2
        );


        // Apex Charts Init
        if (document.getElementById('chart-apex-negative')) {
            // document.getElementById('chart-apex-negative').innerHtml = ''; 
            chart2.render();
        }
        
        this.clearElements++;
        /**************** Done! *****************/
        doneRendering(); 
    }
});




