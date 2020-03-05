looker.plugins.visualizations.add({
    id: 'dj_arc_column_stack_chart',
    label: 'Demandjump column stack chart',
    options: {
        chooseTheme: {
            label: `Choose a theme`,
            order: 1,
            section: `Format`,
            type: `string`, 
            display: `select`,
            values: [
                {"Horizontal": "Horizontal"},
                {"Vertical": "Vertical"},
                {"Custom": "Custom"}
            ],
            default: `Horizontal`,
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
        
        yTitle: {
            label: `Y axis Label`,
            order: 3,
            section: `Format`,
            type: `string`,
            placeholder: `Enter y axis label`,
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

        stackType: {
            label: `100% Stack Type`,
            order: 6,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false
        },

        dataLabels: {
            label: `Enable data labels`,
            order: 10,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false
        },

        horizontal: {
            label: `Plot graph horizontally`,
            order: 11,
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: false
        },
        
        // endingShape: {
        //     label: `Ending bar shape`,
        //     order: 12,
        //     section: `Format`,
        //     type: `string`,
        //     display: `select`,
        //     values: [
        //         // {'Arrow': 'arrow'},
        //         {'Rounded': 'rounded'},
        //         {'Flat': 'flat'},
        //     ],
        //     default: `rounded`,
        //     hidden: false
        // },

        // renderedData: {
        //     label: `Use rendered data`,
        //     order: 13,
        //     section: `Format`,
        //     type: `boolean`,
        //     default: true,
        //     hidden: false
        // },
        
        doNotTruncate: {
            label: `Don't Truncate data`,
            order: 14,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false
        },

        // legend: {
        //     label: `Put legend`,
        //     order: 15,
        //     section: `Format`,
        //     type: `string`,
        //     display: `select`,
        //     values: [
        //         {'Front': 'front'},
        //         {'Back': 'back'},
        //         {'Bottom': 'bottom'},
        //         {'Top': 'top'}
        //     ],
        //     default: `top`,
        //     hidden: false
        // },
    },
    create: function(element, config) { 
        this._custom = `something`;
        element.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
            * { font-family: 'Roboto' !important; }
            </style>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <div id="chart-apex-stack"></div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        
        this._container = d3.select(element).append('div')
            .attr('class', 'container')
            .style('position', 'absolute')
            .style('top', '0')
            .style('left', '0');
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        d3.select("#chart-apex-stack").selectAll("*").remove(); // Clear out the data before we add the vis
        let djColors = [`#009DE9`, `#3EC173`, `#38E883`, `#4A4AFF`, `#163796`, `#5CF3FF`, `#F9BE3D`, `#E2FF6E`, `#ACEA49`, `#A53057`, `#AC7EB7`, `#5C3BC3`, `#5278CE`, `#A1EDFF`, `#05CE5A`, `#4A8C04`, `#3ABBCF`, `#ECE428`, `#E53057`, `#FF8571`, `#F9DCA0`, `#8FFFC7`, `#DFA1FF`, `#9C5CF7`, `#0D6D6D`, `#35A8DB`, `#92FFFF`, `#A5C0FF`, `#FFB0B0`, `#931655`];
        let djAlphaColors = [`rgba(0, 157, 233, 0.45)`, `rgba(62, 193, 115, 0.45)`, `rgba(56, 232, 131, 0.45)`, `rgba(74, 74, 255, 0.45)`, `rgba(22, 55, 150, 0.45)`, `rgba(92, 243, 255, 0.45)`, `rgba(249, 190, 61, 0.45)`, `rgba(226, 255, 110, 0.45)`, `rgba(172, 234, 73, 0.45)`, `rgba(165, 48, 87, 0.45)`, `rgba(172, 126, 183, 0.45)`, `rgba(92, 59, 195, 0.45)`, `rgba(82, 120, 206, 0.45)`, `rgba(161, 237, 255, 0.45)`, `rgba(5, 206, 90, 0.45)`, `rgba(74, 140, 4, 0.45)`, `rgba(58, 187, 207, 0.45)`, `rgba(236, 228, 40, 0.45)`, `rgba(229, 48, 87, 0.45)`, `rgba(255, 133, 113, 0.45)`, `rgba(249, 220, 160, 0.45)`, `rgba(143, 255, 199, 0.45)`, `rgba(223, 161, 255, 0.45)`, `rgba(156, 92, 247, 0.45)`, `rgba(13, 109, 109, 0.45)`, `rgba(53, 168, 219, 0.45)`, `rgba(146, 255, 255, 0.45)`, `rgba(165, 192, 255, 0.45)`, `rgba(255, 176, 176, 0.45)`, `rgba(147, 22, 85, 0.45)`];
        let datum = data;
        console.log('\n\n\n\n\nThese are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('the data', datum);


        // Configuration settings
        let theme = 'Horizontal';
        if (config.chooseTheme) theme = config.chooseTheme;
        let rendered = false;
        let changed = false;
        let dataLabels = false;
        let horizontal = false;
        // let endingShape = 'flat';
        let stackType = false;
        let title = ' ';
        if (!config.showTitle) config.showTitle = false;
        let yTitle = ' ';
        let xTitle = ' ';
        let doNotTruncate = false;
 
        if (theme == 'Horizontal' || theme == 'Vertical') {
            if (this._custom != 'horizontalOrVertical') {
                this._custom = 'horizontalOrVertical';
                this.options.customSpacing.hidden = true;
                this.options.customLabel.hidden = true;
                this.options.dataLabels.hidden = true;
                this.options.horizontal.hidden = true;
                // this.options.endingShape.hidden = true;
                // this.options.renderedData.hidden = true;
                this.options.doNotTruncate.hidden = true;
                changed = true;
            }

            if (theme == 'Horizontal') horizontal = true;
            if (theme == 'Vertical') horizontal = false;
        }

        if (theme == 'Custom') {
            if (this._custom != 'Custom') {
                this._custom = 'Custom';
                this.options.customSpacing.hidden = false;
                this.options.customLabel.hidden = false;
                this.options.dataLabels.hidden = false;
                this.options.horizontal.hidden = false;
                // this.options.endingShape.hidden = false;
                // this.options.renderedData.hidden = false;
                this.options.doNotTruncate.hidden = false;
                changed = true;
            }

            if (config.dataLabels) dataLabels = config.dataLabels;
            // if (config.endingShape) endingShape = config.endingShape;
            if (config.horizontal) horizontal = config.horizontal;
            // if (config.renderedData) rendered = config.renderedData;
            if (config.doNotTruncate) doNotTruncate = config.doNotTruncate;
        }

        if (changed) this.trigger('registerOptions', this.options);

        if (config.title != ``) title = config.title;
        // if (config.showTitle) showTitle = config.showTitle;
        if (config.yTitle != ``) yTitle = config.yTitle;
        if (config.xTitle != ``) xTitle = config.xTitle;

                        
        // Find out whether it's a pivot
        let pivot = false;
        let pivotA = false;
        let pivotB = false;
        let pivotC = false; // Period over period 
        let doNotTruncate = false;

        if (config.doNotTruncate) doNotTruncate = config.doNotTruncate;

        pivotCheck(); // Check for pivots
        truncate(); // Truncate the data
    
        let allPercents = true;
        ifPercentQuery();


          // Pull in all the data into the xaxis and series
        let xaxis = [];
        let seriesData = [];
        
        if (!pivot) {
            // Series data structure
            for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                let name = queryResponse.fields.measure_like[i].label;
                if (queryResponse.fields.measure_like[i].label_short) name = queryResponse.fields.measure_like[i].label_short;

                let obj = {name: name, className: name.replace(/ /g, `-`), data: [], links: []};
                seriesData.push(obj);
            }

            // Labels
            datum.forEach(row => {
                let nameVal = row[queryResponse.fields.dimension_like[0].name].value;
                let lonks = row[queryResponse.fields.dimension_like[0].name].links;
                xaxis.push({name: nameVal, links: lonks});
            });

            // Series data
            let series = [];
            datum.forEach((row, index) => {
                for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                    let value = 0;
                    let lonks = row[queryResponse.fields.measure_like[i].name].links;

                    if (row[queryResponse.fields.measure_like[i].name].value != null) value = row[queryResponse.fields.measure_like[i].name].value;
                    seriesData[i].data.push(value);
                    seriesData[i].links.push(lonks);
                }
            });

        } else {
            if (pivotA) {
                // Labels
                queryResponse.pivots.forEach(p => {
                    let lonks = undefined;
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
        
        // Pull all the information into a single object
        let seriesInformation = {
            pivot: {
                pivot: pivot,
                pivotA: pivotA,
                pivotB: pivotB,
                pivotC: pivotC
            },
            xaxis: xaxis,
            data: seriesData
        };
        console.log(`This is the series information`, seriesInformation);






        let axisNames = [];
        xaxis.forEach(axis => axisNames.push(axis.name));
        let height = window.innerHeight - 45;
        // Stacked Bar
        let options4 = {
            chart: {
                height: height,
                type: 'bar',
                stacked: 'true',
            },
            colors: djColors,
            plotOptions: {
                bar: {
                    horizontal: horizontal,
                },
            },
            dataLabels: {
                enabled: dataLabels,
                // offsetX: -4,
                style: {
                  fontSize: '12px',
                  colors: ['#fff']
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            series: seriesData,
            xaxis: {
                categories: axisNames,
                labels: {
                    formatter: function (val) {
                        if (horizontal && typeof(val) == `number`) return formatAxes(val) + `horizontal`;
                        else return val;
                    }
                },
                title: {text: xTitle},
            },
            yaxis: {
                title: {text: yTitle},
                labels: {
                    formatter: function (val) {
                        if (!horizontal && typeof(val) == `number`) return formatAxes(val) + `!horizontal`;
                        else return val;
                    }
                }
            },
            tooltip: {
                y: {
                    formatter: function (val) {
                        if (typeof(val) == `number`) return formatAxes(val) + ` tooltip`;
                        else return val; 
                    }
                }
            },
            fill: {opacity: 1},
            legend: {
                position: 'bottom', // front, back, bottom, top
                horizontalAlign: 'center',
            }
        };
        
        if (config.stackType == true) options4[`chart`].stackType = `100%`;
        if (config.showTitle == true) options4[`title`] = {text: title};


        // Apex Charts
        window.Apex = {
            dataLabels: {enabled: false},
            stroke: {width: 2}
        };

        let chart4 = new ApexCharts(
            document.querySelector("#chart-apex-stack"),
            options4
        );
        // Apex Charts Init
        if (document.getElementById('chart-apex-stack')) chart4.render();




        /******************************** 
         * Drilldown Menu Configuration
        ********************************/
       d3.select(".container").selectAll("*").remove(); // Clear out the data before we add the vis
            // X axis drilldown menu
        let axisElements = document.getElementsByClassName("apexcharts-xaxis-texts-g");
        if (horizontal) axisElements = document.getElementsByClassName("apexcharts-yaxis-texts-g apexcharts-xaxis-inversed-texts-g");
        let elem = axisElements[0].children;
        let ps;
        let nodes = [];
        // console.log(`This is axis elements`, axisElements);
        // console.log(`Here are the children`, elem);

        xaxis.forEach((axis, index) => {
            if (axis.links == undefined) axis.links = [];
            for(let i = 0; i < seriesData.length; i++) {
                if (seriesData[i].links[index] !== undefined) {
                    for(let j = 0; j < seriesData[i].links[index].length; j++) {
                        if (!seriesData[i].links[index][j][`type_label`]) seriesData[i].links[index][j][`type_label`] = `Drill into ${seriesData[i].name}`;
                        axis.links.push(seriesData[i].links[index][j]);
                    }
                }
            }
        });

        for(let i = 0; i < xaxis.length; i++) {
            ps = elem[i].getBoundingClientRect();
            let elemWidth = ps.width;
            let elemHeight = ps.height;
            let node = {
                index: i,
                id: `_${elem[i].id}`,
                originalId: elem[i].id,
                coordinates: {
                    x: ps.x,
                    y: ps.y,
                    width: elemWidth,
                    height: elemHeight,
                    top: ps.top,
                    left: ps.left,
                    bottom: ps.bottom,
                    right: ps.right,
                },
                xaxis: xaxis[i].name,
                links: xaxis[i].links,
                element: elem[i]
            };
            nodes.push(node);
        }
        // console.log(`These are the xaxis drilldown nodes`, nodes);

        let container = d3.select(`.container`)
            .append(`div`).attr(`class`, `dimensions`)
                .selectAll(`.dimension`).data(nodes);
        let enter = container.enter().append(`span`);
        container.merge(enter)
            .attr(`class`, `dimension`)
            .attr(`id`, d => d.id)
            .style(`width`, d => `${d.coordinates.width}px`)
            .style(`height`, d => `${d.coordinates.height}px`)
            .style(`position`, `absolute`)
            .style(`top`, d => `${d.coordinates.top}px`)
            .style(`left`, d => `${d.coordinates.left}px`)
            .style(`background-color`, `transparent`)
            .style(`opacity`, `0`)
            .style(`z-index`, `4`)
            .on('click', d => drillDown(d.links, d3.event));


        function drillDown(links, event) {
            LookerCharts.Utils.openDrillMenu({ 
                links: links,
                event: event
            });
        }



        
        /**********************************
         * Functions
        **********************************/

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

        
        function ifPercentQuery() {
            if (!pivot) {
                for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                    if (datum[0][queryResponse.fields.measure_like[i].name].rendered) {
                        if (!datum[0][queryResponse.fields.measure_like[i].name].rendered.includes(`%`)) {
                            allPercents = false;
                            return;
                        }
                    } else { // If there is no rendered value: just to be safe
                        allPercents = false;
                        return;
                    }
                }

                if (allPercents) {
                    datum.forEach(row => {
                        for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                            let value = row[queryResponse.fields.measure_like[i].name].value;
                            let percent = value * 100;
                            let truncate = percent.toFixed(1);
                            row[queryResponse.fields.measure_like[i].name].original = value;
                            row[queryResponse.fields.measure_like[i].name].value = truncate;
                        }
                    });
                }
            } else {
                if (pivotA) {
                    queryResponse.fields.measure_like.forEach(mes => {
                        for(let i = 0; i < queryResponse.pivots.length; i++) {
                            if (datum[0][mes.name][queryResponse.pivots[i].key].rendered) {
                                if (!datum[0][mes.name][queryResponse.pivots[i].key].rendered.includes(`%`)) {
                                    allPercents = false;
                                    return;
                                }
                            } else {
                                allPercents = false;
                                return;
                            }
                        }
                    }); 

                    if (allPercents) {
                        queryResponse.fields.measure_like.forEach(mes => {
                            for(let i = 0; i < queryResponse.pivots.length; i++) {
                                let value = datum[0][mes.name][queryResponse.pivots[i].key].value;
                                let percent = value * 100;
                                let truncate = percent.toFixed(1);
                                datum[0][mes.name][queryResponse.pivots[i].key].original = value;
                                datum[0][mes.name][queryResponse.pivots[i].key].value = truncate;
                            }
                        });
                    }

                }

                if (pivotB) {
                    for(let i = 0; i < queryResponse.pivots.length; i++) {
                        queryResponse.fields.measure_like.forEach(mes => {
                            if (datum[0][mes.name][queryResponse.pivots[i].key].rendered) {
                                if (!datum[0][mes.name][queryResponse.pivots[i].key].rendered.includes(`%`)) {
                                    allPercents = false;
                                    return;
                                }
                            } else {
                                allPercents = false;
                                return;
                            }
                        });
                    }

                    if (allPercents) {
                        datum.forEach(row => {
                            for(let i = 0; i < queryResponse.pivots.length; i++) {
                                for(let mi = 0; mi < queryResponse.fields.measure_like.length; mi++) {
                                    let value = row[queryResponse.fields.measure_like[mi].name][queryResponse.pivots[i].key].value;
                                    let percent = value * 100;
                                    let truncate = percent.toFixed(1);
                                    row[queryResponse.fields.measure_like[mi].name][queryResponse.pivots[i].key].original = value;
                                    row[queryResponse.fields.measure_like[mi].name][queryResponse.pibots[i].key].value = truncate;
                                }
                            }
                        });
                    }
                    
                }
            }
        } // End of ifPercentQuery


        // Instead change the category labels to an index value that mirros the xaxis data, append the rendered data through to the axis and evaluate it based on that
        function formatAxes(value) {
            let valueFormat = queryResponse.value_format;
            let response;
            
            if (value_format == `0`) {
                response = value.toFixed(0);
            } // Integer (123)

            if (value_format == `*00#`) {
                value = value.toString();
                response = value.padStart(3, '0'); 
            } // Integer zero-padded to 3 places (001)
            
            if (value_format == `0.##`) {
                value = value.toString();
                if (value.includes(`.`)) {
                    let found = false;
                    let counter = 0;
                    for(let i = 0; i < value.length; i++) {
                        if (found) counter++;
                        if (value[i] == `.`) found = true;
                    }
                    value = parseInt(value, 10); 
                    if (counter > 2) response = value.toFixed(2);
                } 
                else response = value;
            } // Number up to 2 decimals (1. or 1.2 or 1.23)

            if (value_format == `0.00`) {
                response = value.toFixed(2); 
            } // Number with exactly 2 decimals (1.23)
            
            if (value_format == `*00#.00`) {
                value = value.toFixed(2).toString().padStart(3, '0'); 
            } // Number zero-padded to 3 places and exactly 2 decimals (001.23)

            if (value_format == `#,##0`) {
                response = value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); 
            } // Number with comma between thousands (1,234)

            if (value_format == `#,##0.00`) {
                response = value.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","); 
            } // Number with comma between thousands and 2 decimals (1,234.00)

            if (value_format == `0.000,,\" M\"`) {
                response = value / 1000000;
                response = response.toFixed(3).toString();
                response = response + ` M`;
            } // Number in millions with 3 decimals (1.234 M) // Please note division by 1 million happens automatically

            if (value_format == `0.000,\" K\"`) {
                response = value / 1000;
                response = response.toFixed(3).toString();
                response = response + ` K`;
            } // Number in thousands with 3 decimals (1.234 K) // Please note division by 1 thousand happens automatically
            
            if (value_format == `$0`) {
                response = value.toFixed(0).toString();
                response = `$` + response;
            } // Dollars with 0 decimals ($123)

            if (value_format == `$0.00`) {
                response = value.toFixed(2).toString();
                respsone = `$` + response;
            } // Dollars with 2 decimals ($123.00)

            if (value_format == `\"€\"0`) {
                response = value.toFixed(0).toString();
                response = `€` + response;
            } // Euros with 0 decimals (€123)

            if (value_format == `$#,##0.00`) {
                response = value.toFixed(2).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
                respsone = `$` + response;
            } // Dollars with comma btwn thousands and 2 decimals ($1,234.00)

            if (value_format == `$#.00;($#.00)`) {
                response = value.toFixed(2);
                if (respsone < 0) response = `($` + response.toString() + `)`;
                else response = `$` + response.toString();
            } // Dollars with 2 decimals, positive values displayed normally, negative values wrapped in parenthesis
            
            if (value_format == `0\%`) {
                response = value.toFixed(0).toString() + `%`;
            } // Display as percent with 0 decimals (1 becomes 1%)

            if (value_format == `0.00\%`) {
                response = value.toFixed(2).toString() + `%`;
            } // Display as percent with 2 decimals (1 becomes 1.00%)

            if (value_format == `0%`) {
                response = value * 100;
                response = response.toFixed(0).toString() + `%`;
            } // Convert to percent with 0 decimals (.01 becomes 1%)

            if (value_format == `0.00%`) {
                response = value * 100;
                response = response.toFixed(2).toString() + `%`;
            } // Convert to percent with 2 decimals (.01 becomes 1.00%)
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