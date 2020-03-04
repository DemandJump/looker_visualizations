looker.plugins.visualizations.add({
    id: 'dj_arc_line_chart',
    label: 'Demandjump line chart',
    options: {
        themes: {
            label: `Choose a theme`,
            order: 1,
            section: `Format`,
            type: `string`,
            display: `select`,
            values: [
                {'Classic': 'classic'},
                {'X axis': 'xaxis'},
                {'Y axis': 'yaxis'},
                {'Custom': 'custom'},
            ],
            default: `classic`,
            hidden: false
        },

        title: {
            label: `Title of chart`,
            order: 4,
            section: `Format`,
            type: `string`,
            placeholder: `Enter chart title here`,
            hidden: false
        },

        showTitle: {
            label: `Show title`,
            order: 5,
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: false
        },

        xTitle: {
            label: `X axis label`,
            order: 2,
            section: `Format`,
            type: `string`,
            placeholder: `Enter x axis label`,
            hidden: false
        },

        yTitle: {
            label: `Y axis Label`,
            order: 3,
            section: `Format`,
            type: `string`,
            placeholder: `Enter y axis label`,
            hidden: false
        },

        customSpacing: {
            order: 8,
            section: `Format`,
            type: `sentence_maker`,
            words: [
                {type: 'separator', text: ' '}
            ],
            hidden: false
        },

        customLabel: {
            order: 9,
            section: `Format`,
            type: `sentence_maker`,
            words: [
                {type: 'separator', text: 'Custom configuration:'}
            ],
            hidden: false
        },
        
        // legend: {
        //     label: `Show legend`,
        //     order: 15,
        //     section: `Format`,
        //     type: `boolean`,
        //     default: true,
        //     hidden: false
        // },

        alignLegend: {
            label: `Align legend`,
            order: 16,
            section: `Format`,
            type: `string`,
            display: `select`,
            values: [
                {'Left': 'left'}, 
                {'bottom': 'bottom'}, 
                {'Right': 'right'},
                {'Top': 'top'}
            ],
            default: `bottom`,
            hidden: false
        },
        
        showY: {
            label: `Show y axis`, 
            order: 11, 
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: false
        }, 
        
        showX: {
            label: `Show x axis`,
            order: 12,
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: false 
        },

        aspectRatio: {
            label: `Maintain aspect ratio`,
            order: 13,
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: true
        },

        formatDates: {
            label: `Abbreviate datetime values`, 
            order: 14,
            section: `Format`,
            type: `boolean`,
            default: true, 
            hidden: false
        },
                
        doNotTruncate: {
            label: `Don't Truncate data`,
            order: 15,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false
        },

        // fillLines: {
        //     label: `Fill line's area`,
        //     order: 15,
        //     section: `Format`,
        //     type: `boolean`,
        //     default: true,
        //     hidden: true
        // }
    },
    create: function(element, config) {
        this._custom = ``;
        element.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
            * { font-family: 'Roboto' !important; }
            </style>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <canvas id="line-chart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        let node = document.getElementById(`line-chart`);
        while(node.firstChild) node.firstChild.remove();
        let datum = data;
        let djColors = [`#009DE9`, `#3EC173`, `#38E883`, `#4A4AFF`, `#163796`, `#5CF3FF`, `#F9BE3D`, `#E2FF6E`, `#ACEA49`, `#A53057`, `#AC7EB7`, `#5C3BC3`, `#5278CE`, `#A1EDFF`, `#05CE5A`, `#4A8C04`, `#3ABBCF`, `#ECE428`, `#E53057`, `#FF8571`, `#F9DCA0`, `#8FFFC7`, `#DFA1FF`, `#9C5CF7`, `#0D6D6D`, `#35A8DB`, `#92FFFF`, `#A5C0FF`, `#FFB0B0`, `#931655`];
        let djAlphaColors = [`rgba(0, 157, 233, 0.45)`, `rgba(62, 193, 115, 0.45)`, `rgba(56, 232, 131, 0.45)`, `rgba(74, 74, 255, 0.45)`, `rgba(22, 55, 150, 0.45)`, `rgba(92, 243, 255, 0.45)`, `rgba(249, 190, 61, 0.45)`, `rgba(226, 255, 110, 0.45)`, `rgba(172, 234, 73, 0.45)`, `rgba(165, 48, 87, 0.45)`, `rgba(172, 126, 183, 0.45)`, `rgba(92, 59, 195, 0.45)`, `rgba(82, 120, 206, 0.45)`, `rgba(161, 237, 255, 0.45)`, `rgba(5, 206, 90, 0.45)`, `rgba(74, 140, 4, 0.45)`, `rgba(58, 187, 207, 0.45)`, `rgba(236, 228, 40, 0.45)`, `rgba(229, 48, 87, 0.45)`, `rgba(255, 133, 113, 0.45)`, `rgba(249, 220, 160, 0.45)`, `rgba(143, 255, 199, 0.45)`, `rgba(223, 161, 255, 0.45)`, `rgba(156, 92, 247, 0.45)`, `rgba(13, 109, 109, 0.45)`, `rgba(53, 168, 219, 0.45)`, `rgba(146, 255, 255, 0.45)`, `rgba(165, 192, 255, 0.45)`, `rgba(255, 176, 176, 0.45)`, `rgba(147, 22, 85, 0.45)`];

        console.log(`\n\n\n\n\nThese are the settings`, this.options);
        console.log(`This is the config`, config);
        console.log(`Queryresponse`, queryResponse);
        console.log(`Data`, data);
        
        // Find out whether it's a pivot
        let changed = false;
        let pivot = false;
        let pivotA = false;
        let pivotB = false;
        let pivotC = false; // Period over period 
        let doNotTruncate = false;

        if (config.doNotTruncate) doNotTruncate = config.doNotTruncate;

        pivotCheck(); // Check for pivots
        truncate(); // Truncate the data
        
        
        let theme = `classic`;
        if (config.themes) theme = config.themes;
        let changed = false;
        let colors = [window.chartColors.red,window.chartColors.orange,window.chartColors.yellow,window.chartColors.green,window.chartColors.blue,`#4dc9f6`,`#f67019`,`#f53794`,`#537bc4`,`#acc236`,`#166a8f`,`#00a950`,`#58595b`,`#8549ba`];   
        let title = ` `;
        let showTitle = true;
        let xTitle = queryResponse.fields.dimension_like[0].label;
        let yTitle = ` `;
        let alignLegend = `bottom`;
        let showLegend = true;
        let showX = false;
        let showY = false;
        let aspectRatio = true;
        let formatDates = true;
        let fillLines = false;

        if (theme == `xaxis`) showX = true;
        if (theme == `yaxis`) showY = true;
        if (theme == `classic`) {
            showX = true;
            showY = true;
        }

        if (theme == `classic` || theme == `xaxis` || theme == `yaxis`) {
            if (this._custom != `hidden`) {
                this._custom = `hidden`;
                changed = true;
                this.options.customSpacing.hidden = true;
                this.options.customLabel.hidden = true;
                // this.options.legend.hidden = true;
                this.options.alignLegend.hidden = true;
                this.options.showX.hidden = true;
                this.options.showY.hidden = true;
                this.options.aspectRatio.hidden = true;
                // this.options.fillLines.hidden = true;
                this.options.formatDates.hidden = true;
            }
            showLegend = true;
        }
        
        if (theme == `custom`) {
            if (this._custom != `custom`) {
                this._custom = `custom`;
                changed = true;
                this.options.customSpacing.hidden = false;
                this.options.customLabel.hidden = false;
                // this.options.legend.hidden = false;
                this.options.alignLegend.hidden = false;
                this.options.showX.hidden = false;
                this.options.showY.hidden = false;
                this.options.aspectRatio.hidden = false;
                // this.options.fillLines.hidden = false;
                this.options.formatDates.hidden = false;
            }

            // if (config.legend) showLegend = config.legend;
            if (config.alignLegend) alignLegend = config.alignLegend;
            if (config.showX) showX = config.showX;
            if (config.showY) showY = config.showY;
            if (config.aspectRatio) aspectRatio = config.aspectRatio;
            if (config.formatDates) formatDates = config.formatDates;
            // if (config.fillLines) fillLines = config.fillLines;
        }
        if (changed) this.trigger(`registerOptions`, this.options);

        if (config.title) title = config.title;
        if (config.showTitle) showTitle = config.showTitle;
        if (config.xTitle) xTitle = config.xTitle;
        if (config.yTitle) yTitle = config.yTitle;


        // Grab the series data
        let seriesData = [];
        let xaxis = [];

        if (!pivot) {

            // Series data structure
            for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                let name = queryResponse.fields.measure_like[i].label;
                if (queryResponse.fields.measure_like[i].label_short) name = queryResponse.fields.measure_like[i].label_short;

                let obj = {name: name, className: name.replace(/ /g, `-`), data: [], links: []};
                seriesData.push(obj);
            }

            // Series data
            datum.forEach((row, index) => {
                for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                    let value = 0;
                    let lonks = row[queryResponse.fields.measure_like[i].name].links;
                    if (lonks == null || lonks == undefined) lonks = [];
                    if (row[queryResponse.fields.measure_like[i].name].value != null) value = row[queryResponse.fields.measure_like[i].name].value;
                    seriesData[i].data.push(value);
                    seriesData[i].links.push(lonks);
                }
            });

            // Xaxis
            datum.forEach(row => {
                let nameVal = row[queryResponse.fields.dimension_like[0].name].value;
                let lonks = row[queryResponse.fields.dimension_like[0].name].links;
                if (lonks == null || lonks == undefined) lonks = [];

                if (format == `dateime` && formatDates == true) {
                    let sameMonthChecker = checkIfSameMonth();
                    if (sameMonthChecker) xaxis.push({name: nameVal, links: lonks});
                    else xaxis.push({name: convertDateTime(nameVal), links: lonks});
                } else {
                    xaxis.push({name: nameVal, links: lonks});
                }
            });


        } else {
            if (pivotA) {
                // Labels
                queryResponse.pivots.forEach(p => {
                    let lonks = [];
                    if (p.metadata[queryResponse.fields.pivots[0].name].links) lonks = p.metadata[queryResponse.fields.pivots[0].name].links;
                    if (p.metadata[queryResponse.fields.pivots[0].name].rendered) {
                        if (p.metadata[queryResponse.fields.pivots[0].name].rendered != null) xaxis.push({name: p.metadata[queryResponse.fields.pivots[0].name].rendered, links: lonks});
                    } 
                    else xaxis.push({name: p.key, links: lonks});
                });
    
                // Series construct > the measure and the pivot for each key including data across all labels for each series(measure)
                let series = [];
                queryResponse.fields.measure_like.forEach((row, index) => {
                    let obData = [];
                    let liData = [];
                    let newSeries = [];
                    for(let i = 0; i < queryResponse.pivots.length; i++) {
                        let keyname = queryResponse.pivots[i].key;
                        let value = 0;

                        liData.push(datum[0][row.name][keyname].links);
                        
                        if (datum[0][row.name][keyname].value != null) value = datum[0][row.name][keyname].value;
                        obData.push(value);
                    }

                    let name = row.label;
                    if (row.label_short) name = row.label_short;
                    
                    let obj = {
                        name: name,
                        className: name.replace(/ /g, `-`),
                        data: obData,
                        links: liData
                    }
                    seriesData.push(obj);
                });
            }
            
            if (pivotB) {
                // Labels
                datum.forEach(row => {
                    let lonks = row[queryResponse.fields.dimension_like[0].name].links;
                    if (row[queryResponse.fields.dimension_like[0].name].rendered) xaxis.push({name: row[queryResponse.fields.dimension_like[0].name].rendered, links: lonks});
                    else xaxis.push({name: row[queryResponse.fields.dimension_like[0].name].value, links: lonks});
                });

                // Series Object
                for(let i = 0; i < queryResponse.pivots.length; i++) {
                    let name = queryResponse.pivots[i].data[queryResponse.fields.pivots[0].name];
                    let obj = {
                        name: name,
                        className: name.replace(/ /g, `-`),
                        data: [],
                        links: []
                    };
                    seriesData.push(obj);
                }

                // Series data
                datum.forEach(row => { 
                    for(let i = 0; i < queryResponse.pivots.length; i++) seriesData[i].links.push(row[queryResponse.fields.measure_like[0].name][queryResponse.pivots[i].key].links);
                });

                datum.forEach(row => {
                    for(let i = 0; i < queryResponse.pivots.length; i++) {
                        let value = 0;
                        if (row[queryResponse.fields.measure_like[0].name][queryResponse.pivots[i].key].value != null) value = row[queryResponse.fields.measure_like[0].name][queryResponse.pivots[i].key].value;
                        seriesData[i].data.push(value);
                    }
                });
            }

            if (pivotC) {
                // Labels
                datum.forEach(row => {
                    let links = [];
                    if (row[queryResponse.fields.dimension_like[0].name].links) links = row[queryResponse.fields.dimension_like[0].name].links;

                    if (row[queryResponse.fields.dimension_like[0].name].rendered) xaxis.push({name: row[queryResponse.fields.dimension_like[0].name].rendered, links: links});
                    else xaxis.push({name: row[queryResponse.fields.dimension_like[0].name].value, links: links}); 
                });

                // Series Object
                for(let i = 0; i < queryResponse.pivots.length; i++) {
                    let name = queryResponse.pivots[i].data[queryResponse.fields.pivots[0].name];
                    let obj = {
                        name: name,
                        className: name.replace(/ /g, `-`),
                        data: [],
                        links: []
                    };
                    seriesData.push(obj); 
                }

                // Series Data
                let sql = queryResponse.sql;
                let chop = 0;
                for(let i = 0; i < sql.length; i++) {
                    if (sql[i] == `,` && sql[i+1] == ` ` && sql[i+2] == `-`) {
                        chop = i+3;
                        break;
                    }
                }
                let stringFind = sql.substr(chop, 11);
                let backwardsIteration = parseInt(stringFind, 10);
                console.log(`This is the string find`, stringFind);
                console.log(`This is the backwards iteration`, backwardsIteration);


                seriesData[0].originalAxis = [];
                for(let i = datum.length - 1; i > datum.length - backwardsIteration; i--) {
                    let val = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[1].key].value;
                    let links = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[1].key].value;
                    let xaxisVal = datum[i][queryResponse.fields.dimension_like[0].name].value

                    seriesData[0].data.push(val);
                    seriesData[0].links.push(links);
                    seriesData[0].originalAxis.push(xaxisVal);
                }

                seriesData[1].originalAxis = [];
                for(let i = backwardsIteration; i >= 0; i--) {
                    let val = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[0].key].value;
                    let links = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[0].key].value;
                    let xaxisVal = datum[i][queryResponse.fields.dimension_like[0].name].value;

                    seriesData[1].data.push(val);
                    seriesData[1].links.push(links);
                    seriesData[1].originalAxis.push(xaxisVal);
                }

                console.log(`This is the current`, seriesData[0].data);
                console.log(`This is the previous`, seriesData[1].data);
            }
        }



        // Graph configuration
        var options = {
            series: seriesData,
            chart: {
                id: 'chart2',
                type: 'line',
                height: 230,
                toolbar: {
                    autoSelected: 'pan',
                    show: false
                }
            },
            colors: djColors,
            stroke: {width: 3},
            dataLabels: {enabled: false},
            fill: {opacity: 1,},
            markers: {size: 0},
            xaxis: {type: 'datetime'}
        };
  
          var chart = new ApexCharts(document.querySelector("#chart-line2"), options);
          chart.render();
        
          var optionsLine = {
            series: [{
            data: data
          }],
            chart: {
            id: 'chart1',
            height: 130,
            type: 'area',
            brush:{
              target: 'chart2',
              enabled: true
            },
            selection: {
              enabled: true,
              xaxis: {
                min: new Date('19 Jun 2017').getTime(),
                max: new Date('14 Aug 2017').getTime()
              }
            },
          },
          colors: ['#008FFB'],
          fill: {
            type: 'gradient',
            gradient: {
              opacityFrom: 0.91,
              opacityTo: 0.1,
            }
          },
          xaxis: {
            type: 'datetime',
            tooltip: {
              enabled: false
            }
          },
          yaxis: {
            tickAmount: 2
          }
          };
  

        var chartLine = new ApexCharts(document.querySelector("#chart-line"), optionsLine);
        chartLine.render();
        console.log('Line configuration', configLine);


        // Apex Charts
        window.Apex = {
            dataLabels: {enabled: false},
            stroke: {width: 2}
        };
        
        /****************************************** 
         * Functions
        ******************************************/

        function pivotCheck() {
            if (queryResponse.fields.pivots.length != 0) {
                pivot = true;
                if (queryResponse.fields.dimension_like.length == 0) {
                    pivotA = true;
                    queryResponse.fields._dimension_like = queryResponse.fields.dimension_like;
                    queryResponse.fields.dimension_like = queryResponse.fields.pivots;
                } 
                else if (queryResponse.fields.pivots[0].field_group_label == `Period Over Period` || queryResponse.fields.pivots[0].field_group_variant == `Period Selection`) pivotC = true;
                else pivotB = true;
            }
        }


        function truncate() {
            if (!doNotTruncate) {
                for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                    let truncate = false;
                    datum.forEach(row => {
                        if (row[queryResponse.fields.measure_like[i].name].value > 100) truncate = true;
                    });
                    if (truncate) {
                        datum.forEach(row => {
                            row[queryResponse.fields.measure_like[i].name].original = row[queryResponse.fields.measure_like[i].name].value;
                            row[queryResponse.fields.measure_like[i].name].value = Math.trunc(row[queryResponse.fields.measure_like[i].name].value); 
                        });
                    }
                }
            }
        }


        function convertDateTime(val) {
            let day = val.substr(0, 4);
            let month = val.substr(5, 2);
            let year = val.substr(8, 2);

            if(month == 1) mon = `Jan`;
            if(month == 2) mon = `Feb`;
            if(month == 3) mon = `Mar`;
            if(month == 4) mon = `Apr`;
            if(month == 5) mon = `May`;
            if(month == 6) mon = `Jun`;
            if(month == 7) mon = `Jul`;
            if(month == 8) mon = `Aug`;
            if(month == 9) mon = `Sep`;
            if(month == 10) mon = `Oct`;
            if(month == 11) mon = `Nov`;
            if(month == 12) mon = `Dec`;
            
            let ret = `${day} ${mon}`; // `${day} ${mon} ${year}`
            return ret;
        }

        function checkIfSameMonth() {
            let yes = false;
            let month = ``;
            let prevMonth = ``;
            datum.forEach(row => {
                let val = row[queryResponse.fields.dimension_like[0].name].value;
                month = val.substr(5, 2);

                if (month == prevMonth) yes = true;
                prevMonth = month; 
            });

            return yes;
        }
        /**************** Done! *****************/
        doneRendering(); 
    }
});