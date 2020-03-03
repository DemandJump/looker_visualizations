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

        customSpacing: {
            order: 10,
            section: `Format`,
            type: `sentence_maker`,
            words: [
                {type: 'separator', text: ' '}
            ],
            hidden: false
        },

        customLabel: {
            order: 11,
            section: `Format`,
            type: `sentence_maker`,
            words: [
                {type: 'separator', text: 'Custom configuration:'}
            ],
            hidden: false
        },

        sparklines: {
            order: 12,
            section: `Format`,
            type: `string`,
            display: `select`,
            values: [
              {"None": "none"},
              {"Bar chart": "normalBarChart"},
              {"Bar chart with labels": "barWithLabels"},
              {"Pie chart": "pieChart"},
              {"Donut chart": "donutChart"},
              {"Radial chart": "radialChart"},
              {"Straight line": "straightLine"},
              {"Straight line gradient": "straightLineGradient"}, 
              {"Smooth line": "smoothLine"},
              {"Smooth line gradient": "smoothLineGradient"},
            ],
            default: `none`,
            hidden: false
        },

        doNotTruncate: {
            label: `Don't Truncate data`,
            order: 13,
            section: `Format`,
            type: `boolean`,
            default: false,
            hidden: false
        },

    },
    create: function(element, config) {
        element.innerHTML = `
    <style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap');
* { font-family: 'Roboto' !important; }

.dj_arc_svm_container {
    text-align: center;
}


.widgetChart {
  text-align: center;
  padding: 1rem;
  position: relative;
}

.widgetChart .progress-sub-label {
  opacity: .8;
  padding: 5px 0 0;
}

.widgetChart .progress-circle-wrapper {
  min-width: 68px;
  margin-right: 1rem;
}

.widgetChart .progress-circle-wrapper .react-sweet-progress-symbol {
  font-size: 0.8rem;
}

.widgetChart .widgetChart-content {
  position: relative;
  z-index: 5;
}

.widgetChart .widgetChart-content-lg {
  padding: 2rem 0 1rem 2rem;
}

.widgetChart .widgetChart-content-lg .widgetNumbers {
  margin-bottom: 0;
}

.widgetChart .widgetChart-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: .25;
  z-index: 4;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
  overflow: hidden;
}

.widgetChart .widgetNumbers {
  font-weight: bold;
  font-size: 2.5rem;
  display: block;
  line-height: 1;
  margin: 1rem auto;
}

.widgetChart .widgetNumbers + .widgetChart-flex,
.widgetChart .widgetNumbers + .widgetDescription,
.widgetChart .widgetNumbers + .widgetSubheading {
  margin-top: -0.5rem;
}

.widgetChart .widgetSubheading {
  margin: -0.5rem 0 0;
  display: block;
  opacity: .6;
}

.widgetChart .widgetSubheading:first-child {
  margin-top: 0;
}

.widgetChart .widgetSubheading + .widgetNumbers {
  margin-top: 0.5rem;
}

.widgetChart .widgetDescription {
  margin: 1rem 0 0;
}

.widgetChart.widgetChart-hover {
  transition: all .2s;
}

.widgetChart.widgetChart-hover:hover {
  z-index: 15;
  transform: scale(1.15);
  box-shadow: 0 0.46875rem 4.1875rem rgba(4, 9, 20, 0.05), 0 0.9375rem 2.40625rem rgba(4, 9, 20, 0.05), 0 0.25rem 1.3125rem rgba(4, 9, 20, 0.06), 0 0.125rem 1.1875rem rgba(4, 9, 20, 0.06);
  cursor: pointer;
  background: #fff;
}

.widgetChart .widgetChart-actions {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  z-index: 12;
}

.widgetChart .widgetChart-actions .btn-link {
  font-size: 1.1rem;
  padding-top: 0;
  padding-bottom: 0;
  opacity: .6;
}

.widgetChart .widget-progress-wrapper {
  margin-top: 1rem;
}

.widgetChart .widget-progress-wrapper.progress-wrapper-bottom {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

.widgetChart .widget-progress-wrapper.progress-wrapper-bottom .progress {
  margin: 0 -1px -1px;
}

.widgetChart .widget-progress-wrapper.progress-wrapper-bottom .progress {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

.widgetChart .widget-progress-wrapper.progress-wrapper-bottom .progress .progress-bar {
  border-bottom-left-radius: 0.25rem;
}

.widgetChart .widgetChart-flex {
  display: flex;
  align-items: center;
  align-content: center;
  margin-bottom: 1rem;
}

.widgetChart .widgetChart-flex:last-child {
  margin-bottom: 0;
}

.widgetChart .widgetChart-flex .widgetSubheading {
  margin: 0;
}

.widgetChart .widgetChart-flex .widgetDescription {
  margin-top: 0;
}

.widgetChart.text-left {
  flex-direction: row;
  align-items: center;
}

.widgetChart.text-left .icon-wrapper {
  min-width: 54px;
  margin: 0 1rem 0 0;
}

.widgetChart.text-left .widgetNumbers {
  margin-left: 0;
}

.widgetChart.text-left .widgetChart-content {
  display: flex;
  flex-direction: column;
  align-content: center;
  flex: 1;
  position: relative;
}

.widgetChart.text-left .widgetChart-content > .widgetNumbers:first-child {
  margin-top: 0;
}

.widgetChart.text-left .widgetChart-content .widgetDescription {
  align-self: flex-start;
}

.widgetChart.text-left .widgetChart-wrapper {
  height: 35%;
}

.widgetChart.widgetChart-left {
  padding-bottom: 15%;
}

.widgetChart .chart-wrapper-relative {
  position: relative;
  opacity: 1;
  margin-top: 1rem;
}

.widgetChart-actions {
  position: absolute;
  right: 1rem;
  top: 1rem;
  z-index: 12;
}

.widgetChart-actions .btn-link {
  font-size: 1.1rem;
  padding-top: 0;
  padding-bottom: 0;
  opacity: .6;
}

.widgetChart:hover .widgetChart-actions .btn-link,
.widget-content:hover .widgetChart-actions .btn-link {
  opacity: 1;
}

.grid-menu .widgetChart.widgetChart-hover:hover {
  background: #fff;
  border-radius: 0.25rem;
}

.widgetChart2 .widgetChart-flex .widgetNumbers {
  font-weight: normal;
}

.widgetChart2 .widgetChart-flex + .widgetChart-flex .widgetNumbers {
  margin-bottom: 0;
}

.app-header .header-user-info > .widget-heading,
.app-header .header-user-info > .widgetSubheading {
  white-space: nowrap;
}

.app-header .header-user-info > .widgetSubheading {
  font-size: 0.8rem;
}

.app-header.header-text-light .app-header-right > .header-btn-lg .widget-content-left .btn-group > .btn,
.app-header.header-text-light .app-header-right > .header-btn-lg .widget-heading,
.app-header.header-text-light .app-header-right > .header-btn-lg .widgetSubheading {
  color: rgba(255, 255, 255, 0.8);
}

.app-header.header-text-dark .app-header-right > .header-btn-lg .widget-content-left .btn-group > .btn,
.app-header.header-text-dark .app-header-right > .header-btn-lg .widget-heading,
.app-header.header-text-dark .app-header-right > .header-btn-lg .widgetSubheading {
  color: rgba(0, 0, 0, 0.8);
}

.widgetChart .widgetNumbers + .widgetChart-flex,
.widgetChart .widgetNumbers + .widgetDescription,
.widgetChart .widgetNumbers + .widgetSubheading {
  margin-top: -0.5rem;
}

.widgetChart .widgetSubheading {
  margin: -0.5rem 0 0;
  display: block;
  opacity: .6;
}

.widgetChart .widgetSubheading:first-child {
  margin-top: 0;
}

.widgetChart .widgetSubheading + .widgetNumbers {
  margin-top: 0.5rem;
}

.widget-content .widget-content-left .widgetSubheading {
    opacity: .5;
  }
  
@media (max-width: 1199.98px) {
  .chat-layout.app-inner-layout .app-inner-layout__sidebar .widget-content .widget-content-left .widgetSubheading {
    white-space: normal;
  }
}

.h-100 {
  height: 100%!important
}

.w-100 {
  width: 100%!important
}

.row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-top: 20px;
}
@media (min-width:576px) {
  .row {
      margin-right: -15px;
      margin-left: -15px
  }
}
@media (min-width:768px) {
  .row {
      margin-right: -15px;
      margin-left: -15px
  }
}
@media (min-width:992px) {
  .row {
      margin-right: -15px;
      margin-left: -15px
  }
}
@media (min-width:1200px) {
  .row {
      margin-right: -15px;
      margin-left: -15px
  }
}

.align-items-center {
  -webkit-box-align: center!important;
  -webkit-align-items: center!important;
  -ms-flex-align: center!important;
  align-items: center!important
}

.col {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px
}


@media (min-width:576px) {
  .col {
    padding-right: 15px;
    padding-left: 15px
  }
}

@media (min-width:768px) {
  .col {
    padding-right: 15px;
    padding-left: 15px
  }
}

@media (min-width:992px) {
  .col {
    padding-right: 15px;
    padding-left: 15px
  }
}

@media (min-width:1200px) {
  .col {
    padding-right: 15px;
    padding-left: 15px
  }
}

.col {
  -webkit-flex-basis: 0;
  -ms-flex-preferred-size: 0;
  flex-basis: 0;
  -webkit-box-flex: 1;
  -webkit-flex-grow: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  max-width: 100%
}



    </style>

                <div class="h-100 w-100 row align-items-center svlc" id="container">
                    <div class="col">
                        <div class="widgetChart" style="padding:0rem;">
                            <div class="widgetNumbers" id="value"></div>
                            <div class="widgetSubheading" id="name"></div>
                            <div class="widgetDescription text-info">
                                <span class="pl-1"></span>
                            </div>
                        </div>
                    </div>
                </div>

            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        // let node = document.getElementById('chart-apex-negative');
        // while(node.firstChild) node.firstChild.remove();
        let djColors = [`#009DE9`, `#3EC173`, `#38E883`, `#4A4AFF`, `#163796`, `#5CF3FF`, `#F9BE3D`, `#E2FF6E`, `#ACEA49`, `#A53057`, `#AC7EB7`, `#5C3BC3`, `#5278CE`, `#A1EDFF`, `#05CE5A`, `#4A8C04`, `#3ABBCF`, `#ECE428`, `#E53057`, `#FF8571`, `#F9DCA0`, `#8FFFC7`, `#DFA1FF`, `#9C5CF7`, `#0D6D6D`, `#35A8DB`, `#92FFFF`, `#A5C0FF`, `#FFB0B0`, `#931655`];
        let djAlphaColors = [`rgba(0, 157, 233, 0.45)`, `rgba(62, 193, 115, 0.45)`, `rgba(56, 232, 131, 0.45)`, `rgba(74, 74, 255, 0.45)`, `rgba(22, 55, 150, 0.45)`, `rgba(92, 243, 255, 0.45)`, `rgba(249, 190, 61, 0.45)`, `rgba(226, 255, 110, 0.45)`, `rgba(172, 234, 73, 0.45)`, `rgba(165, 48, 87, 0.45)`, `rgba(172, 126, 183, 0.45)`, `rgba(92, 59, 195, 0.45)`, `rgba(82, 120, 206, 0.45)`, `rgba(161, 237, 255, 0.45)`, `rgba(5, 206, 90, 0.45)`, `rgba(74, 140, 4, 0.45)`, `rgba(58, 187, 207, 0.45)`, `rgba(236, 228, 40, 0.45)`, `rgba(229, 48, 87, 0.45)`, `rgba(255, 133, 113, 0.45)`, `rgba(249, 220, 160, 0.45)`, `rgba(143, 255, 199, 0.45)`, `rgba(223, 161, 255, 0.45)`, `rgba(156, 92, 247, 0.45)`, `rgba(13, 109, 109, 0.45)`, `rgba(53, 168, 219, 0.45)`, `rgba(146, 255, 255, 0.45)`, `rgba(165, 192, 255, 0.45)`, `rgba(255, 176, 176, 0.45)`, `rgba(147, 22, 85, 0.45)`];
        let datum = data;
        console.log('These are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', datum);

        // Media query looks take 100% width at 640px screen size
        // Min width of alook is 135px < drops to 50px with repsonsive design
        // Normal look drops to 100px

        // Grab the data of the specific look
        let name = ' ';
        if (config.name) name = config.name;

        let value = data[0][queryResponse.fields.measure_like[0].name].value;
        if (data[0][queryResponse.fields.measure_like[0].name].rendered) value = data[0][queryResponse.fields.measure_like[0].name].rendered;

        let nameNode = document.getElementById('name');
        nameNode.style.fontWeight = `300`;
        let valueNode = document.getElementById('value');
        valueNode.style.fontWeight = `300`;
        
        nameNode.innerHTML = name;
        valueNode.innerHTML = value;


        // Grab the data of the element and then give the architect element the same spacing
        let elementData = element.getBoundingClientRect();
        let container = document.getElementsByClassName(`svlc`);
        let containerData = container[0].getBoundingClientRect();
        
        console.log(`This is the element`, element);
        console.log(`This is the container`, container);
        console.log(`This is the container data`, containerData);
        console.log(`This is the element data`, elementData);

        container[0].style.width = `${elementData.width}px`;
        container[0].style.height = `${elementData.height}px`;
        container[0].style.top = `${elementData.top}px`;
        container[0].style.left = `${elementData.left}px`;
        container[0].style.bottom = `${elementData.bottom}px`;
        container[0].style.right = `${elementData.right}px`;




        // Find out whether it's a pivot
        let changed = false;
        let pivot = false;
        let pivotA = false;
        let pivotB = false;
        let doNotTruncateData = false;

        if (config.doNotTruncate) doNotTruncate = config.doNotTruncate;

        pivotCheck(); // Check for pivots
        truncate(); // Truncate the data
        

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
        }

        // Pull all the information into a single object
        let seriesInformation = {
            pivot: {
                pivot: pivot,
                pivotA: pivotA,
                piovtB: pivotB
            },
            xaxis: xaxis,
            data: seriesData
        };
        console.log(`This is the series information`, seriesInformation);




        // Pulling out dynamic configuration for each sparkline
        let settings = this.options;
        let configuration = {}; // This is the configuration for the sparkline
        sparkLines();

        this.options = settings;
        if (changed) this.trigger(`registerOptions`, settings);



        function sparkLines() {
            let sparkline = config.sparklines;


            // normalBarChart
            if (sparkline == `normalBarChart`) {
                // User configuration on the chart
                if (!settings[`nbcTooltip`]) {
                    changed = true;
                    settings[`nbcTooltip`] = {
                        label: `Enable sparkline tooltip`,
                        order: 1,
                        section: `Sparkline`,
                        type: `boolean`,
                        default: false,
                        hidden: false
                    };
                }

                if (!settings[`nbcCurve`]) {
                    changed = true;
                    settings[`nbcCurve`] = {
                        label: `Line behavior`,
                        order: 2,
                        section: `Sparkline`,
                        type: `string`,
                        display: `select`,
                        values: [
                          {"Straight": "straight"},
                          {"Smooth": "smooth"},
                          {"Stepline": "stepline"}
                        ],
                        default: "smooth",
                        hidden: false
                    };
                }

                if (!settings[`nbcStroke`]) {
                    changed = true;
                    settings[`nbcStroke`] = {
                        label: `Stroke width`,
                        order: 3,
                        section: `Sparkline`,
                        type: `string`,
                        placeholder: `Enter a value`,
                        default: `3`,
                        hidden: false
                    };
                }

                if (!settings[`nbcMarkers`]) {
                    changed = true;
                    settings[`nbcMarkers`] = {
                        label: `Marker size`,
                        order: 4,
                        section: `Sparkline`,
                        type: `string`,
                        placeholder: `Enter a value`,
                        default: `0`,
                        hidden: false
                    };
                }


                // Grab chart info if configuration is created
                let tooltip = false;
                let curve = `smooth`;
                let strokeWidth = 3;
                let markerSize = 0;

                if (config.nbcTooltip) tooltip = config.nbcTooltip;
                if (config.nbcCurve) curve = config.nbcCurve;
                if (config.nbcStroke) strokeWidth = parseInt(config.nbcStroke, 10);
                if (config.nbcMarkers) markerSize = parseInt(config.nbcMarkers, 10);
                

                // Chart configuration
                configuration.chart.type = `bar`;
                configuration.chart.height = window.innerHeight;
                configuration.chart.sparkline = {enabled: true};
                configuration.tooltip = {enabled: tooltip};
                configuration.stroke = {width: strokeWidth, curve: curve};
                configuration.colors = djColors;
                configuration.markers = {size: markerSize};
                configuration.series = seriesInformation.seriesData;
                configuration.yaxis = {min: 0};
            } else {
                delete settings[`nbcTooltip`];
                delete settings[`nbcCurve`];
                delete settings[`nbcStroke`];
                delete settings[`nbcMarkers`];
            }


            // barWithLabels
            if (sparkline == `barWithLabels`) {

                if (!settings[`fbcStack`]) {
                    changed = true;
                    settings[`fbcStack`] = {
                        label: `Stack layout`,
                        order: 1,
                        section: `Sparkline`,
                        type: `boolean`,
                        default: false,
                        hidden: false
                    };
                }

                if (!settings[`fbcToolbar`]) {
                    changed = true;
                    settings[`fbcToolbar`] = {
                        label: `Enable Toolbar`,
                        order: 2,
                        section: `Sparkline`,
                        type: `boolean`,
                        default: false,
                        hidden: false
                    }; 
                }

                if (!settings[`fbcHorizontal`]) {
                    changed = true;
                    settings[`fbcHorizontal`] = {
                        label: `Horizontal graph`,
                        order: 3,
                        section: `Sparkline`,
                        type: `bolean`,
                        default: false,
                        hidden: false
                    };
                }

                if (!settings[`fbcStrokeWidth`]) {
                    changed = true;
                    settings[`fbcStrokeWidth`] = {
                        label: `Stroke Width`,
                        order: 4,
                        section: `Sparkline`,
                        type: `string`,
                        placeholder: `Enter a value`,
                        default: `0`,
                        hidden: false
                    };
                }

                if (!settings[`fbcCurve`]) {
                    changed = true;
                    settings[`fbcCurve`] = {
                        label: `Line behavior`,
                        order: 5,
                        section: `Sparkline`,
                        type: `string`,
                        display: `select`,
                        vales: [
                          {"Straight": "straight"},
                          {"Smooth": "smooth"},
                          {"Stepline": "stepline"}
                        ],
                        default: "smooth",
                        hidden: false
                    };
                }

                if (settings[`fbcAlignLegend`]) {
                    changed = true;
                    settings[`fbcAlignLegend`] = {
                        label: `Align legend`,
                        order: 6,
                        section: `Sparkline`,
                        type: `string`,
                        display: `select`,
                        values: [
                          {"Bottom": "bottom"},
                          {"Top": "top"},
                          {"Left": "left"},
                          {"Right": "right"}
                        ],
                        default: `bottom`,
                        hidden: false
                    };
                }

                if (!settings[`fbcHorizontalAlign`]) {
                    changed = true;
                    settings[`fbcHorizontalAlign`] = { 
                        label: `Horizontally align legend`,
                        order: 7,
                        section: `Sparkline`,
                        type: `string`,
                        display: `select`,
                        values: [
                          {"Center": "center"},
                          {"Right": "right"},
                          {"Left": "left"}
                        ],
                        default: `center`,
                        hidden: false
                    };
                }


                // Grab chart configuration
                let stack = false;
                let toolbar = false;
                let horizontal = false;
                let strokeWidth = `0`;
                let curve = `smooth`;
                let alignLegend = `bottom`;
                let horizontalAlign = `center`;

                if (config.fbcStack) stack = config.fbcStack;
                if (config.fbcToolbar) toolbar = config.fbcToolbar;
                if (config.fbcHorizontal) horizontal = config.fbcHorizontal;
                if (config.fbcStrokeWidth) strokeWidth = parseInt(config.fbcStrokeWidth, 10);
                if (config.fbcCurve) curve = config.fbcCurve;
                if (config.fbcAlignLegend) alignLegend = config.fbcAlignLegend;


                // Chart configuration
                configuration.chart.type = `bar`;
                configuration.chart.height = window.innerHeight;
                configuration.chart.stacked = stack;
                configuration.chart.toolbar = {show: toolbar};
                configuration.plotOptions.bar = {horizontal: horizontal};
                configuration.colors = djColors;
                configuration.stroke.width = strokeWidth;
                configuration.stroke.colors = djAlphaColors;
                configuration.stroke.curve = curve;
                configuration.tooltip.y = {formatter: val => val + `K`};
                configuration.fill = {opacity: 0.8};
                configuration.legend.position = alignLegend;
                configuration.legend.horizontalAlign = horizontalAlign;

                configuration.series = seriesInformation.seriesData;
            } else {
                delete settings[`fbcStack`];
                delete settings[`fbcToolbar`];
                delete settings[`fbcHorizontal`];
                delete settings[`fbcStrokeWidth`];
                delete settings[`fbcCurve`];
                delete settings[`fbcAlignLegend`];
            }
            // pieChart
            // donutChart
            // radialChart
            // straightLine
            // straightLineGradient
            // smoothLine
            // smoothLineGradient

                  /*
                  {"None": "none"},
                  {"Bar chart": "normalBarChart"},
                  {"Bar chart with labels": "barWithLabels"},
                  {"Pie chart": "pieChart"},
                  {"Donut chart": "donutChart"},
                  {"Radial chart": "radialChart"},
                  {"Straight line": "straightLine"},
                  {"Straight line gradient": "straightLineGradient"}, 
                  {"Smooth line": "smoothLine"},
                  {"Smooth line gradient": "smoothLineGradient"},
                  */
        }
        



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


        
        /**************** Done! *****************/
        doneRendering(); 
    }
});




/* 

        var gradientLineChart = {
            chart: {
                type: 'area',
                height: 152,
                sparkline: {
                    enabled: true
                },
            },
            colors: ["#3f6ad8"],
            stroke: {
                width: 2,
                curve: 'smooth',
            },
            markers: {
                size: 0
            },
            tooltip: {
                fixed: {
                    enabled: false
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return '';
                        }
                    }
                },
                marker: {
                    show: false
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.7,
                    opacityTo: 0.9,
                    stops: [0, 90, 100]
                },
            },
            series: [{
                data: sparklineData
            }],
            yaxis: {
                min: 0
            },
        };




        var dashSparkLines1 = { // Smooth line chart
            chart: {
                type: 'line',
                height: 100,
                sparkline: {
                    enabled: true
                },
            },
            colors: ["#3ac47d"],
            stroke: {
                width: 3,
                curve: 'smooth',
            },

            markers: {
                size: 0
            },
            tooltip: {
                fixed: {
                    enabled: true
                },
                x: {
                    show: false
                },
                y: {
                    title: {
                        formatter: function (seriesName) {
                            return '';
                        }
                    }
                },
                marker: {
                    show: false
                }
            },
            series: [{
                data: sparklineData
            }],
            yaxis: {
                min: 0
            },
        };





        var straightLineChart = {
          series: [{
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
          chart: {
          type: 'line',
          width: 100,
          height: 35,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
            width: 2 
        },
        markers: {
              size: 1.5, // Set size to zero for line chart with no markers
              strokeColors: '#008EFA',
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
        };




        var plainOlPieChart = {
          series: [43, 32, 12, 9],
          chart: {
          type: 'pie',
          width: 100,
          height: 100,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          width: 1
        },
        tooltip: {
          fixed: {
            enabled: false
          },
        }
        };



         
        var loadingRadial = {
          series: [43],
          chart: {
          type: 'radialBar',
          width: 100,
          height: 10,
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '50%'
            },
            track: {
              margin: 0
            },
            dataLabels: {
              show: false
            }
          }
        }
        };




        var multiLoadingRadial = {
          series: [53, 67, 22, 100],
          chart: {
          type: 'radialBar',
          width: 150,
          height: 150,
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: '50%'
            },
            track: {
              margin: 1
            },
            dataLabels: {
              show: false
            }
          }
        }
        };



              
        var normalRadial = {
          series: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
          chart: {
          type: 'donut',
          width: 100,
          height: 100,
          sparkline: {
            enabled: true
          }
        },
        stroke: {
          width: 1
        },
        tooltip: {
          fixed: {
            enabled: false
          },
        }
        };



*/