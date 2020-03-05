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
                {"Horizontal stack": "Horizontal Stack"},
                {"Vertical stack": "Vertical Stack"},
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

        showTitle2: {
            label: `Show second axis title`,
            order: 5.1,
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: false
        },
        
        yTitle: {
            label: `Y axis label`,
            order: 3,
            section: `Format`,
            type: `string`,
            placeholder: `Enter y axis label`,
            hidden: false
        },

        yTitle2: {
            label: `Second y axis label`,
            order: 3.1,
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
        
        endingShape: {
            label: `Ending bar shape`,
            order: 12,
            section: `Format`,
            type: `string`,
            display: `select`,
            values: [
                // {'Arrow': 'arrow'},
                {'Rounded': 'rounded'},
                {'Flat': 'flat'},
            ],
            default: `rounded`,
            hidden: false
        },

        stack: {
            label: `Stack layout`,
            order: 13,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false 
        },

        stackType: {
            label: `100% Stack Type`,
            order: 14,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false
        },

        alignLegend: {
            label: `Align legend`,
            order: 15,
            section: `Format`,
            type: `string`,
            display: `select`,
            values: [
                {"Center": "center"},
                {"Left": "left"},
                {"Right": "right"}
            ],
            default: `center`,
            hidden: false
        },


        multipleAxes: {
            label: `Add another axis`,
            order: 1,
            section: `Multiple Axes`,
            type: `boolean`,
            default: false,
            hidden: false
        },

        
    },
    create: function(element, config) { 
        this._custom = `something`;
        this._stack = `something`;
        this._multipleAxes = false;
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
        d3.select(`#chart-apex-stack`).selectAll(`*`).remove(); // Clear out the data before we add the vis
        const djColors = [`#009DE9`, `#3EC173`, `#38E883`, `#4A4AFF`, `#163796`, `#5CF3FF`, `#F9BE3D`, `#E2FF6E`, `#ACEA49`, `#A53057`, `#AC7EB7`, `#5C3BC3`, `#5278CE`, `#A1EDFF`, `#05CE5A`, `#4A8C04`, `#3ABBCF`, `#ECE428`, `#E53057`, `#FF8571`, `#F9DCA0`, `#8FFFC7`, `#DFA1FF`, `#9C5CF7`, `#0D6D6D`, `#35A8DB`, `#92FFFF`, `#A5C0FF`, `#FFB0B0`, `#931655`];
        const djAlphaColors = [`rgba(0, 157, 233, 0.45)`, `rgba(62, 193, 115, 0.45)`, `rgba(56, 232, 131, 0.45)`, `rgba(74, 74, 255, 0.45)`, `rgba(22, 55, 150, 0.45)`, `rgba(92, 243, 255, 0.45)`, `rgba(249, 190, 61, 0.45)`, `rgba(226, 255, 110, 0.45)`, `rgba(172, 234, 73, 0.45)`, `rgba(165, 48, 87, 0.45)`, `rgba(172, 126, 183, 0.45)`, `rgba(92, 59, 195, 0.45)`, `rgba(82, 120, 206, 0.45)`, `rgba(161, 237, 255, 0.45)`, `rgba(5, 206, 90, 0.45)`, `rgba(74, 140, 4, 0.45)`, `rgba(58, 187, 207, 0.45)`, `rgba(236, 228, 40, 0.45)`, `rgba(229, 48, 87, 0.45)`, `rgba(255, 133, 113, 0.45)`, `rgba(249, 220, 160, 0.45)`, `rgba(143, 255, 199, 0.45)`, `rgba(223, 161, 255, 0.45)`, `rgba(156, 92, 247, 0.45)`, `rgba(13, 109, 109, 0.45)`, `rgba(53, 168, 219, 0.45)`, `rgba(146, 255, 255, 0.45)`, `rgba(165, 192, 255, 0.45)`, `rgba(255, 176, 176, 0.45)`, `rgba(147, 22, 85, 0.45)`];
        let datum = data;
        console.log(`\n\n\n\n\nThese are the settings`, this.options);
        console.log(`This is the config`, config);
        console.log(`Queryresponse`, queryResponse);
        console.log(`the data`, datum);


            // Configuration settings
        let theme = `Horizontal`;
        if (config.chooseTheme) theme = config.chooseTheme;
        let changed = false;
        let pivot = false;
        let pivotA = false;
        let pivotB = false;
        let pivotC = false; // Period over period 
        let valueFormat = `0`;
        if (queryResponse.fields.measure_like[0].value_format) valueFormat = queryResponse.fields.measure_like[0].value_format;

        let dataLabels = false;
        let horizontal = false;
        let endingShape = `flat`;
        let stack = false;
        let title = ` `;
        let yTitle = ` `;
        let yTitle2 = ` `;
        let xTitle = ` `;
        let alignLegend = `center`;
        let multipleAxes = false;

        let xaxis = [];
        let seriesData = [];
        let axisNames = [];
        let seriesInformation;


        if (theme == `Horizontal` || theme == `Vertical` || theme == `Horizontal Stack` || theme == `Vertical Stack`) {
            if (this._custom != `horizontalOrVertical`) {
                this._custom = `horizontalOrVertical`;
                this.options.customSpacing.hidden = true;
                this.options.customLabel.hidden = true;
                this.options.dataLabels.hidden = true;
                this.options.horizontal.hidden = true;
                this.options.endingShape.hidden = true;
                this.options.stack.hidden = true;
                this.options.stackType.hidden = true;
                this.options.alignLegend.hidden = true;
                changed = true;
            }

            if (theme == `Horizontal`) horizontal = true;
            if (theme == `Vertical`) horizontal = false;
            if (theme == `Vertical Stack`) stack = true;
            if (theme == `Horizontal Stack`) {
                horizontal = true;
                stack = true;
            }
        }

        if (theme == `Custom`) {
            if (this._custom != `Custom`) {
                this._custom = `Custom`;
                this.options.customSpacing.hidden = false;
                this.options.customLabel.hidden = false;
                this.options.dataLabels.hidden = false;
                this.options.horizontal.hidden = false;
                this.options.endingShape.hidden = false;
                this.options.stack.hidden = false;
                this.options.alignLegend.hidden = false;
                changed = true;
            }

            if (config.stack) {
                if (this._stack != `true`) {
                    this._stack = `true`;
                    changed = true;
                    this.options.stackType.hidden = false;
                }
            } else {
                if (this._stack != `false`) {
                    this._stack = `false`;
                    changed = true;
                    this.options.stackType.hidden = true;
                }
            }

            if (config.dataLabels) dataLabels = config.dataLabels;
            if (config.endingShape) endingShape = config.endingShape;
            if (config.stack) stack = config.stack;
            if (config.horizontal) horizontal = config.horizontal;
            if (config.alignLegend) alignLegend = config.alignLegend;
        }
        
        if (config.title != ``) title = config.title;
        if (!config.showTitle) config.showTitle = false;
        if (!config.showTitle2) config.showTitle2 = false;
        if (config.yTitle != ``) yTitle = config.yTitle;
        if (config.yTitle2 != ``) yTitle2 = config.yTitle2;
        if (config.xTitle != ``) xTitle = config.xTitle;
        if (config.multipleAxes) multipleAxes = config.multipleAxes;
        if (config.multipleAxes == true) {
            if (this._multipleAxes != true) {
                this.options.showTitle2.hidden = false;
                this.options.yTitle2.hidden = false;
                this._multipleAxes = true;
                changed = true;
            }
        } else {
            if (this._multipleAxes != false) {
                this.options.showTitle2.hidden = false;
                this.options.yTitle2.hidden = true;
                this._multipleAxes = false;
                changed = true;
            }
        }


            // Grab chart data 
        pivotCheck(); // Find the type of query 
        formatSeriesData(); // Pull the data for the chart


        let stackLayout = {
            chart: {
                height: window.innerHeight - 45,
                type: 'bar',
                stacked: stack,
            },
            colors: djColors,
            series: seriesData,
            xaxis: {
                categories: axisNames,
                title: {text: xTitle},
                labels: {
                    formatter: function(val) {
                        if (typeof(val) == `number` && horizontal) return formatAxes(val, seriesData[0].value_format);
                        else return val;
                    }
                }
            },
            yaxis: {
                title: {text: yTitle},
                labels: {
                    formatter: function(val) {
                        if (typeof(val) == `number` && !horizontal) return formatAxes(val, seriesData[0].value_format);
                        else return val;
                    }
                }
            },
            tooltip: { 
                y: {
                    formatter: function(val) {
                        if (typeof(val) == `number`) return formatAxes(val, seriesData[0].value_format);
                        else return val;
                    }
                } 
            },
            plotOptions: {
                bar: {
                    horizontal: horizontal,
                    endingShape: endingShape, // Arrow, rounded, flat
                },
            },
            dataLabels: {
                enabled: dataLabels,
                style: {
                    fontSize: '12px',
                    colors: ['#fff']
                }
            },
            stroke: {
                width: 1,
                colors: ['#fff']
            },
            fill: {opacity: 1},
            legend: {
                position: 'bottom', // front, back, bottom, top
                horizontalAlign: alignLegend,
            }
        };
        
        if (config.stackType == true) stackLayout[`chart`].stackType = `100%`;
        if (stack == false) stackLayout.plotOptions.bar.columnWidth = `55%`;


        // Iterate through the series and create multiple axes 
        if (multipleAxes) {
            stackLayout.yaxis = [];

            // Create the config settings for the chart
            seriesData.forEach((row, index) => {
                if (!this.options[`series_${index}`]) {
                    changed = true;
                    this.options[`series_${index}`] = {
                        label: `Keep ${row.name} on right axis`,
                        order: 10 + index,
                        section: `Multiple Axes`,
                        type: `boolean`, 
                        default: false,
                        hidden: false
                    };
                }
            });

            // Apply the config settings to the chart
            seriesData.forEach((row, index) => {
                let title = row.name;
                let seriesName = `seriesA`;
                let opposite = false;

                if (config[`series_${index}`]) {
                    seriesName = `seriesB`;
                    opposite = true;
                    if (config.yTitle2 != ``) title = yTitle2;
                } else if (config.yTitle != ``) title = yTitle;

                let obj = {
                    seriesName: seriesName,
                    title: {text: title},
                    ooposite: opposite,
                    labels: {
                        formatter: function(val) {
                            if (typeof(val) == `number` && !horizontal) return formatAxes(val, row.value_format);
                            else return val;
                        }
                    }
                };

                if (config[`series_${index}`]) if (config.showTitle2 == false) delete obj[`title`];
                else if (showTitle == false) delete obj[`title`];

                stackLayout.yaxis.push(obj);
            });
        } else {
            if (config.showTitle == true) stackLayout[`title`] = {text: title};
        }

            // Store global variables and rerender the settings
        if (changed) this.trigger(`registerOptions`, this.options);




        // Apex Charts
        window.Apex = { dataLabels:{enabled: false}, stroke:{width: 2} };
        let columnOrBarChart = new ApexCharts(document.querySelector(`#chart-apex-stack`), stackLayout);
        if (document.getElementById('chart-apex-stack')) columnOrBarChart.render();


        /******************************** 
         * Drilldown Menu Configuration
        ********************************/
            // X axis drilldown menu
        d3.select(`.container`).selectAll(`*`).remove(); // Clear out the data before we add the vis
        let axisElements = document.getElementsByClassName(`apexcharts-xaxis-texts-g`);
        if (horizontal) axisElements = document.getElementsByClassName(`apexcharts-yaxis-texts-g apexcharts-xaxis-inversed-texts-g`);
        let elem = axisElements[0].children;
        let ps;
        let nodes = [];

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
                    width: elemWidth,
                    height: elemHeight,
                    top: ps.top,
                    left: ps.left,
                },
                xaxis: xaxis[i].name,
                links: xaxis[i].links,
                element: elem[i]
            };
            nodes.push(node);
        }


        // Create the axis containers
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


        let drilldownElementData = {
            axisElements: axisElements,
            axisChildrenElements: elem,
            drilldownNodes: nodes
        };

        // Pull all the information into a single object
        seriesInformation = {
            pivot: {
                pivot: pivot,
                pivotA: pivotA,
                pivotB: pivotB,
                pivotC: pivotC
            },
            xaxis: xaxis,
            axisNames: axisNames,
            seriesData: seriesData,
            valueFormat: valueFormat,
            drilldownElementData: drilldownElementData
        };
        console.log(`Series Information`, seriesInformation);


        
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

        
        function formatSeriesData() {
            if (!pivot) {
                // Series data structure
                for(let i = 0; i < queryResponse.fields.measure_like.length; i++) {
                    let name = queryResponse.fields.measure_like[i].label;
                    let measureName = queryResponse.fields.measure_like[i].name;
                    let value_format = queryResponse.fields.measure_like[i].value_format;
                    if (queryResponse.fields.measure_like[i].label_short) name = queryResponse.fields.measure_like[i].label_short;
    
                    let obj = {name: name, className: name.replace(/ /g, `-`), measure: measureName, value_format: value_format, data: [], links: []};
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
            }

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
                        measure: row.name,
                        value_format: row.value_format,
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
                        measure: queryResponse.fields.measure_like[0].name,
                        pivot: queryResponse.pivots[i].key,
                        value_format: queryResponse.fields.measure_like[0].value_format,
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
                        measure: queryResponse.fields.measure_like[0].name,
                        pivot: queryResponse.pivots[i].key,
                        value_format: queryResponse.fields.measure_like[0].value_format,
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

                seriesData[0].originalAxis = [];
                seriesData[1].originalAxis = [];
                for(let i = datum.length - 1; i >= datum.length - backwardsIteration; i--) {
                    let val = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[1].key].value;
                    let links = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[1].key].value;
                    let xaxisVal = datum[i][queryResponse.fields.dimension_like[0].name].value

                    seriesData[1].data.unshift(val);
                    seriesData[1].links.unshift(links);
                    seriesData[1].originalAxis.unshift(xaxisVal);
                }

                for(let i = datum.length - backwardsIteration - 1; i >= 0; i--) {
                    let val = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[0].key].value;
                    let links = datum[i][queryResponse.fields.measure_like[0].name][queryResponse.pivots[0].key].value;
                    let xaxisVal = datum[i][queryResponse.fields.dimension_like[0].name].value;

                    seriesData[0].data.unshift(val);
                    seriesData[0].links.unshift(links);
                    seriesData[0].originalAxis.unshift(xaxisVal);
                }

            }

            // Grab the xaxis names for the labels of the chart
            xaxis.forEach(axis => axisNames.push(axis.name));
        }


        // Instead change the category labels to an index value that mirros the xaxis data, append the rendered data through to the axis and evaluate it based on that
        function formatAxes(value, format) {
            let value_format = valueFormat;
            if (format != null) value_format = format;
            console.log(`Original value format: ${valueFormat}. This is the function's value format`, value_format)
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

            return response;
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