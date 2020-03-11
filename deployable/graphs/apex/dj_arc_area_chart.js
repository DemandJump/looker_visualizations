looker.plugins.visualizations.add({
  id: "dj_arc_area_chart",
  label: "Demandjump area chart",
  options: {
    themes: {
      label: `Choose a theme`,
      order: 1,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [
        { Classic: "classic" },
        { Smooth: "smooth" },
        { Step: "stepline" },
        { Custom: "custom" }
        // {'Theme two': 'negative'}
      ],
      default: `area`,
      hidden: false
    },

    title: {
      label: `Title of chart`,
      order: 3,
      section: `Format`,
      type: `string`,
      placeholder: `Enter chart title here`,
      hidden: false
    },

    xTitle: {
      label: `X axis label`,
      order: 1.9,
      section: `Format`,
      type: `string`,
      placeholder: `Enter chart title here`,
      hidden: false
    },

    yTitle: {
      label: `Y axis label`,
      order: 1.94,
      section: `Format`,
      type: `string`,
      placeholder: `Enter chart title here`,
      hidden: false
    },

    yTitle2: {
      label: `Second y axis label`,
      order: 1.95,
      section: `Format`,
      type: `string`,
      placeholder: `Enter y axis label`,
      hidden: false
    },

    showActualTitle: {
      label: `Show title`,
      order: 4,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    showTitle: {
      label: `Show y axis title`,
      order: 4.1,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    showTitle2: {
      label: `Show second y axis title`,
      order: 4.2,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    showTitle3: {
      label: `Show x axis title`,
      order: 4.3,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    // alignTitle: {
    //     label: `Align to the left or right`,
    //     order: 2,
    //     section: `Format`,
    //     type: `boolean`,
    //     default: false,
    //     hidden: false
    // },

    label: {
      label: `Label by title`,
      order: 2,
      section: `Format`,
      type: `string`,
      placeholder: `Enter the label of the visual`,
      hidden: false
    },

    // alignLabel: {
    //     label: `Align to the left or right `,
    //     order: 4,
    //     section: `Format`,
    //     type: `boolean`,
    //     default: false,
    //     hidden: false
    // },

    stack: {
      label: `Series positioning`,
      order: 5,
      section: `Format`,
      type: `string`,
      display: `radio`,
      values: [{ Overlay: "overlay" }, { Stack: "stack" }],
      default: `overlay`,
      hidden: false
    },

    // sideYaxis: {
    //   label: `Set y axis on the right`,
    //   order: 6,
    //   section: `Format`,
    //   type: `boolean`,
    //   default: false,
    //   hidden: false
    // },

    customSpacing: {
      order: 8,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: " " }],
      hidden: false
    },

    customLabel: {
      order: 9,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: "Custom configuration:" }],
      hidden: false
    },

    curve: {
      label: `Line behavior`,
      order: 10,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [
        { Straight: "straight" },
        { Smooth: "smooth" },
        { Step: "stepline" }
      ],
      default: `straight`,
      hidden: false
    },

    // dataLabels: {
    //     label: `Enable data labels`,
    //     order: 12,
    //     section: `Format`,
    //     type: `boolean`,
    //     default: false,
    //     hidden: false
    // },

    alignLegend: {
      label: `Align legend`,
      order: 11,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [{ Left: "left" }, { Center: "center" }, { Right: "right" }],
      default: `center`,
      hidden: false
    },

    fill: {
      label: `Gradient type`,
      order: 12,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [
        { Gradient: "gradient" },
        { Solid: "solid" },
        { Pattern: "pattern" }
      ],
      default: `gradient`,
      hidden: false
    },

    allArea: {
      label: `All area chart types`,
      order: 40,
      section: `Type of Chart`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    allColumn: {
      label: `All column chart types`,
      order: 41,
      section: `Type of Chart`,
      type: `boolean`,
      default: false,
      hidden: false
    },

    allLine: {
      label: `All line chart types`,
      order: 42,
      section: `Type of Chart`,
      type: `boolean`,
      default: false,
      hidden: false
    },

    multipleAxes: {
      label: `Add another axis`,
      order: 1,
      section: `Multiple Axes`,
      type: `boolean`,
      default: false,
      hidden: false
    }
  },
  create: function(element, config) {
    this._iteration = 0;
    this._custom = ``;
    this._multipleAxes = false;
    this._series = 0;
    element.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:100, 300,400,500&display=swap');
            * { font-family: 'Roboto' !important; }
            </style>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <div id="chart-apex-area">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

    this._container = d3
      .select(element)
      .append("div")
      .attr("class", "container")
      .style("position", "absolute")
      .style("top", "0")
      .style("left", "0");
  },
  updateAsync: function(
    data,
    element,
    config,
    queryResponse,
    details,
    doneRendering
  ) {
    /*********************************************
     * Initialization and Configuration
     *********************************************/
    d3.select("#chart-apex-area")
      .selectAll("*")
      .remove(); // Clear out the data before we add the vis

    let djColors = [
      `#009DE9`,
      `#3EC173`,
      `#38E883`,
      `#4A4AFF`,
      `#163796`,
      `#5CF3FF`,
      `#F9BE3D`,
      `#E2FF6E`,
      `#ACEA49`,
      `#A53057`,
      `#AC7EB7`,
      `#5C3BC3`,
      `#5278CE`,
      `#A1EDFF`,
      `#05CE5A`,
      `#4A8C04`,
      `#3ABBCF`,
      `#ECE428`,
      `#E53057`,
      `#FF8571`,
      `#F9DCA0`,
      `#8FFFC7`,
      `#DFA1FF`,
      `#9C5CF7`,
      `#0D6D6D`,
      `#35A8DB`,
      `#92FFFF`,
      `#A5C0FF`,
      `#FFB0B0`,
      `#931655`
    ];
    let djAlphaColors = [
      `rgba(0, 157, 233, 0.45)`,
      `rgba(62, 193, 115, 0.45)`,
      `rgba(56, 232, 131, 0.45)`,
      `rgba(74, 74, 255, 0.45)`,
      `rgba(22, 55, 150, 0.45)`,
      `rgba(92, 243, 255, 0.45)`,
      `rgba(249, 190, 61, 0.45)`,
      `rgba(226, 255, 110, 0.45)`,
      `rgba(172, 234, 73, 0.45)`,
      `rgba(165, 48, 87, 0.45)`,
      `rgba(172, 126, 183, 0.45)`,
      `rgba(92, 59, 195, 0.45)`,
      `rgba(82, 120, 206, 0.45)`,
      `rgba(161, 237, 255, 0.45)`,
      `rgba(5, 206, 90, 0.45)`,
      `rgba(74, 140, 4, 0.45)`,
      `rgba(58, 187, 207, 0.45)`,
      `rgba(236, 228, 40, 0.45)`,
      `rgba(229, 48, 87, 0.45)`,
      `rgba(255, 133, 113, 0.45)`,
      `rgba(249, 220, 160, 0.45)`,
      `rgba(143, 255, 199, 0.45)`,
      `rgba(223, 161, 255, 0.45)`,
      `rgba(156, 92, 247, 0.45)`,
      `rgba(13, 109, 109, 0.45)`,
      `rgba(53, 168, 219, 0.45)`,
      `rgba(146, 255, 255, 0.45)`,
      `rgba(165, 192, 255, 0.45)`,
      `rgba(255, 176, 176, 0.45)`,
      `rgba(147, 22, 85, 0.45)`
    ];
    let datum = data;
    let settings = this.options;
    let theme = `area`;
    if (config.themes) theme = config.themes;
    let changed = false;
    let pivot = false;
    let pivotA = false;
    let pivotB = false;
    let pivotC = false;

    let title = queryResponse.fields.dimension_like[0].label;
    let label = ` `;
    let xTitle = ` `;
    let yTitle = ` `;
    let yTitle2 = ` `;
    let showActualTitle = config.showActualTitle;
    let showTitle = config.showTitle; // y titles are 1 and 2
    let showTitle2 = config.showTitle2;
    let showTitle3 = config.showTitle3;
    console.log(
      `This is the show title: ${showTitle}, this is the second one: ${showTitle2}, and this is the third show title: ${showTitle3}`
    );
    let curve = `straight`;
    let stack = `overlay`;
    let stacked = false;
    let dataLabels = false;
    let sideYaxis = false;
    let alignLegend = `center`;
    let doNotTruncate = false;
    let fill = `gradient`;
    let height = window.innerHeight - 45;
    let multipleAxes = false;

    selectTheme();

    function selectTheme() {
      if (theme == `classic` || theme == `smooth` || theme == `stepline`) {
        if (this._custom != `classic`) {
          this._custom = `classic`;
          settings.customSpacing.hidden = true;
          settings.customLabel.hidden = true;
          settings.curve.hidden = true;
          // settings.dataLabels.hidden = true;
          settings.alignLegend.hidden = true;
          settings.doNotTruncate.hidden = true;
          settings.fill.hidden = true;
          changed = true;
        }

        if (theme == `classic`) curve = `straight`;
        if (theme == `smooth`) curve = `smooth`;
        if (theme == `stepline`) curve = `stepline`;
      }

      if (theme == `custom`) {
        if (this._custom != `custom`) {
          this._custom = `custom`;
          settings.customSpacing.hidden = false;
          settings.customLabel.hidden = false;
          settings.curve.hidden = false;
          // settings.dataLabels.hidden = false;
          settings.alignLegend.hidden = false;
          settings.doNotTruncate.hidden = false;
          settings.fill.hidden = false;
          changed = true;
        }

        if (config.curve) curve = config.curve;
        if (config.alignLegend) alignLegend = config.alignLegend;
        if (config.formatDates) formatDates = config.formatDates;
        if (config.doNotTruncate) doNotTruncate = config.doNotTruncate;
        if (config.fill) fill = config.fill;
      }

      if (config.label) label = config.label;
      if (config.title != ``) title = config.title;
      if (config.yTitle != ``) yTitle = config.yTitle;
      if (config.yTitle2 != ``) yTitle2 = config.yTitle2;
      if (config.xTitle != ``) xTitle = config.xTitle;
      if (config.sideYaxis) sideYaxis = config.sideYaxis;
      if (config.stack) stack = config.stack;
      if (stack == `overlay`) stacked = false;
      if (stack == `stack`) stacked = true;
    }

    // Multiple axis display configuration
    if (config.multipleAxes == true) {
      multipleAxes = config.multipleAxes;

      if (this._multipleAxes != true) {
        if (this.options.showTitle2) this.options.showTitle2.hidden = false;
        if (this.options.yTitle2) this.options.yTitle2.hidden = false;
        this._multipleAxes = true;
        changed = true;

        for (let i = 1; i < this._series; i++) {
          if (this.options[`seriesAxis_${i}`])
            this.options[`seriesAxis_${i}`].hidden = false;
        }
      }
    } else {
      if (this._multipleAxes != false) {
        if (this.options.showTitle2) this.options.showTitle2.hidden = true;
        if (this.options.yTitle2) this.options.yTitle2.hidden = true;
        this._multipleAxes = false;
        changed = true;

        for (let i = 1; i < this._series; i++) {
          if (this.options[`seriesAxis_${i}`])
            this.options[`seriesAxis_${i}`].hidden = true;
        }
      }
    }

    // Main chart series data
    let xaxis = [];
    let seriesData = [];
    let axisData = [];
    let seriesInformation;
    let valueFormat = [];

    queryResponse.fields.measure_like.forEach(mes =>
      valueFormat.push(mes.value_format)
    );

    pivotCheck();
    formatSeriesData();

    settings = this.options;
    seriesTypes(); // Add the type for each series
    this.options = settings; // Sync the settings so you don't lose the data

    // Building a configuration
    let configuration = {
      chart: {
        height: height,
        type: `area`,
        stacked: stacked,
        zoom: {
          enabled: true
        }
      },
      series: seriesData,
      labels: axisData,
      colors: djColors,
      dataLabels: {
        enabled: dataLabels,
        offsetX: -4,
        style: {
          fontSize: "12px",
          colors: ["#fff"]
        }
      },
      stroke: {
        curve: curve // straight, smooth, stepline
      },
      fill: {
        type: fill
      },
      subtitle: {
        text: label,
        align: `left`
      },
      xaxis: { type: `category` },
      yaxis: {
        opposite: sideYaxis,
        labels: {
          formatter: function(val) {
            if (typeof val == `number`)
              return formatAxes(val, seriesData[0].value_format);
            else return val;
          }
        }
      },
      tooltip: {
        y: {
          formatter: function(val) {
            if (typeof val == `number`)
              return formatAxes(val, seriesData[0].value_format);
            else return val;
          }
        }
      },
      legend: {
        horizontalAlign: alignLegend
      }
    };

    if (showTitle) configuration.yaxis.title = { text: yTitle };
    if (showTitle3) configuration.xaxis.title = { text: xTitle };

    // Mulltiple axis display and chart configuration
    if (multipleAxes && !stacked) {
      configuration.yaxis = [];

      // Create the config settings for the chart
      if (seriesData.length != this._series) {
        for (let i = 0; i < this._series; i++)
          delete this.options[`seriesAxis_${index}`];
        this._series = seriesData.length;
      }

      seriesData.forEach((row, index) => {
        if (index != 0) {
          if (!this.options[`seriesAxis_${index}`]) {
            changed = true;
            this.options[`seriesAxis_${index}`] = {
              label: `Set ${row.name} on the second axis`,
              order: 10 + index,
              section: `Multiple Axes`,
              type: `boolean`,
              default: false,
              hidden: false
            };
          }
        }
      });

      // Apply the config settings to the chart
      let nameA = seriesData[0].name;
      let nameB = seriesData[1].name;
      let passShow = false;
      seriesData.forEach((row, index) => {
        let title = row.name;
        let seriesName = nameA;
        let axisOrientation = false;
        let show = false;

        if (config[`seriesAxis_${index}`] == true) {
          seriesName = nameB;
          axisOrientation = true;
          if (config.yTitle2 != ``) title = yTitle2;
        } else {
          seriesName = nameA;
          axisOrientation = false;
          if (config.yTitle != ``) title = yTitle;
        }

        // Configuration to show the axes
        if (index == 0) show = true;
        if (config[`seriesAxis_${index}`] && passShow == false) {
          passShow = true;
          show = true;
        }

        let obj = {
          seriesName: seriesName,
          opposite: axisOrientation,
          show: show,
          name: row.name,
          labels: {
            formatter: function(val) {
              if (typeof val == `number`)
                return formatAxes(val, row.value_format);
              else return val;
            }
          }
        };

        //   Axis based label
        if (seriesName == nameA) {
          if (showTitle) obj[`title`] = { text: title };
        }
        if (seriesName == nameB) {
          if (showTitle2) obj[`title`] = { text: title };
        }

        configuration.yaxis.push(obj);
      });
    } else {
      if (showActualTitle == true) {
        configuration[`title`] = {
          text: title,
          align: `left`
        };
      }
    }

    // Turning off animations in the initial iterations
    if (this._iteration < 2) {
      console.log(`Running an initial iteration`);
      configuration[`animations`] = { enabled: false };
    }
    console.log(`This is the current iteration ${this._iteration}`);
    this._iteration++;

    // Rebuild the settings
    settings = this.options;
    hideAxisTab(); // Some Multi Axis display settings based on stack layout (series positioning config setting)
    this.options = settings;
    if (changed) this.trigger(`registerOptions`, this.options);

    // Apex Charts
    window.Apex = { dataLabels: { enabled: false }, stroke: { width: 2 } };
    let chart = new ApexCharts(
      document.querySelector(`#chart-apex-area`),
      configuration
    );
    if (document.getElementById(`chart-apex-area`)) {
      chart.render();
    }

    /********************************
     * Drilldown Menu Configuration
     ********************************/
    d3.select(".container")
      .selectAll("*")
      .remove(); // Clear out the data before we add the vis

    // X axis drilldown menu
    let axisElements = document.getElementsByClassName(
      "apexcharts-xaxis-texts-g"
    );
    let elem = axisElements[0].children;
    let ps;
    let nodes = [];
    // console.log(`This is axis elements`, axisElements);
    // console.log(`Here are the children`, axisElements[0].children);
    // console.log(`This is elem`, elem);

    xaxis.forEach((axis, index) => {
      if (axis.links == undefined) axis.links = [];
      for (let i = 0; i < seriesData.length; i++) {
        if (seriesData[i].links[index] !== undefined) {
          for (let j = 0; j < seriesData[i].links[index].length; j++) {
            if (!seriesData[i].links[index][j][`type_label`])
              seriesData[i].links[index][j][
                `type_label`
              ] = `Drill into ${seriesData[i].name}`;
            axis.links.push(seriesData[i].links[index][j]);
          }
        }
      }
    });

    for (let i = 0; i < xaxis.length; i++) {
      if (xaxis[i].links == undefined) xaxis[i].links = [];
      ps = elem[i].getBoundingClientRect();
      let node = {
        index: i,
        id: `_${elem[i].id}`,
        originalId: elem[i].id,
        width: ps.width,
        height: ps.height,
        top: ps.top,
        left: ps.left,
        bottom: ps.bottom,
        right: ps.right,
        // xaxis: elem[i].children[0].innerHTML,
        xaxis: xaxis[i].name,
        links: xaxis[i].links,
        element: elem[i]
      };
      if (elem[i].attributes.transform)
        node[`transform`] = elem[i].attributes.transform.value;
      nodes.push(node);
    }
    // console.log(`These are the xaxis drilldown nodes`, nodes);

    let container = d3
      .select(`.container`)
      .append(`div`)
      .attr(`class`, `dimensions`)
      .selectAll(`.dimension`)
      .data(nodes);
    let enter = container.enter().append(`span`);
    container
      .merge(enter)
      .attr(`class`, `dimension`)
      .attr(`id`, d => d.id)
      .style(`width`, d => `${d.width}px`)
      .style(`height`, d => `${d.height}px`)
      .style(`position`, `absolute`)
      .style(`left`, d => `${d.left}px`)
      // .style(`bottom`, d => `${d.bottom}px`)
      .style(`top`, d => `${d.top}px`)
      // .style(`right`, d => `${d.right}px`)
      .style(`background-color`, `transparent`)
      .style(`opacity`, `0`)
      .style(`z-index`, `4`)
      // .style(`transform`, `rotate(-45)`)
      // .html(d => d.text)
      .on("click", d => drillDown(d.links, d3.event));

    // Pull all the information into a single object
    seriesInformation = {
      pivot: {
        pivot: pivot,
        pivotA: pivotA,
        pivotB: pivotB,
        pivotC: pivotC
      },
      xaxis: xaxis,
      axisNames: axisData,
      seriesData: seriesData,
      valueFormat: valueFormat,
      chartConfiguration: configuration,
      drillDownNodes: nodes,
      updateAsync: {
        queryResponse: queryResponse,
        data: datum,
        config: config,
        settings: this.options,
        details: details,
        element: element
      }
    };
    console.log(`Series Information`, seriesInformation);

    /*
    Y axis drilldown menu (data for each series)
    let circleValues = [];
    let circleLinks = [];
    let holder;
    for(let i = 0; i < xaxis.length; i++) {
        let seriesLinks = [];
        seriesData.forEach(series => seriesLinks.push({name: series.name, data: series.data[i], links: series.links[i], axis: xaxis[i]}));
        circleLinks.push(seriesLinks);

        seriesData.forEach((series, index) => {
            holder = document.getElementsByClassName(`apexcharts-series ${series.className}`);
            if (holder == undefined) {
                let newNamingConvention = series.name.replace(/ /g, `x`);
                newNamingConvention.replace(/-/g, `x`);
                holder = document.getElementsByClassName(`apexcharts-series ${newNamingConvention}`);
            }
            let data = {
                pivot: series.name,
                column: index,
                xaxis: circleLinks[i][index].name,
                data: circleLinks[i][index].data,
                links: circleLinks[i][index].links,
                id: `_${holder[0].id}`,
                originalId: holder[0].id,
                element: holder
            };
            circleValues.push(data);
        });
    }
    console.log(`These are the circle values`, circleValues);

    Y axis Grid Series Container data (each series)

    let graph = document.getElementsByClassName(`apexcharts-area-series apexcharts-plot-series`);
    let graphdata = graph[0].getBoundingClientRect();

    let foreignObject = d3.select(`foreignObject`).attr(`class`, `foreignObject`);
    let fodata = foreignObject[`_groups`][0][0].getBoundingClientRect();

    let gridpoints = document.getElementsByClassName(`apexcharts-xaxis-tick`);
    let gridpointA = gridpoints[0].getBoundingClientRect();
    let gridpointB = gridpoints[1].getBoundingClientRect();
    let gridSpacing = gridpointB.x - gridpointA.x;

    let seriesContainers = [];
    let cspacing = gridpointA.left - (gridSpacing / 2);

    xaxis.forEach((axis, index) => {
        if (index != 0) cspacing += gridSpacing;
        let seriesValues = [];
        for(let i = 0; i < seriesData.length; i++) seriesValues.push(circleValues[i + (index * seriesData.length)]);
        let obj = {
            index: index,
            name: axis,
            coordinates: {
                x: gridpointA.x,
                y: gridpointA.y,
                top: fodata.top,
                left: gridpointA.left,
                bottom: gridpointA.bottom,
                right: gridpointA.right,
                width: foreignObject[`_groups`][0][0].attributes.width.value,
                // height: foreignObject[`_groups`][0][0].attributes.height.value - ps.height,
                height: graphdata.top,
                gridSpacing: gridpointB.x - gridpointA.x,
                spacing: cspacing
            },
            seriesData: seriesValues
        };
        seriesContainers.push(obj);
    });
    // console.log(`Here's the series container data`, seriesContainers);

    let individualSeries = {};
    let seriesContainer = d3.select(`.container`)
        .append(`div`).attr(`class`, `measureSeries`)
            .selectAll(`.series`).data(seriesContainers);
    let enterSeries = seriesContainer.enter().append(`div`);
    seriesContainer.merge(enterSeries)
        .attr(`id`, d => d.index)
        .attr(`class`, `series`)
        .style(`width`, `1px`)
        .style(`height`, d => `${d.coordinates.height}px`)
        .style(`z-index`, `21`)
        .style(`position`, `absolute`)
        .style(`left`, d => `${d.coordinates.spacing - .5}px`)
        .style(`top`, d => `${d.coordinates.top}px`)
        .style(`opacity`, `0`)
        .on(`mouseover`, d => createSeries(d));

    function createSeries(d) {
        // d3.event.stopPropagation();
        d3.select(`.container`).selectAll(`.measures`).remove();
        // d3.select(`.container`).selectAll(`.xaxis`).remove();

        d.seriesData.forEach(row => {
            let name = row.pivot.replace(/ /g, `-`);
            let holder = document.getElementsByClassName(`apexcharts-series ${name}`);
            row.coordinates = holder[0].children[holder[0].children.length - 2].children[0].children[0].getBoundingClientRect();
        });

        createSeriesDrills(d);
        // createXAxis(d);
    }

    function createSeriesDrills(series) {
        individualSeries[series.index] = series.seriesData;
        // d3.event.stopPropagation();
        let seriesSection = d3.select(`.container`)
            .append(`div`).attr(`class`, `measures`)
                .selectAll(`.measure`).data(individualSeries[series.index]);
        let singleSeries = seriesSection.enter().append(`div`);
        seriesSection.merge(singleSeries)
            .attr(`class`, `measure`)
            .style(`width`, data => `${data.coordinates.width -2}px`)
            .style(`height`, data => `${data.coordinates.height -2}px`)
            .style(`z-index`, `22`)
            .style(`position`, `absolute`)
            .style(`left`, data => `${data.coordinates.left - 3}px`)
            .style(`top`, data => `${data.coordinates.top}px`)
            .style(`opacity`, `0`)
            .style(`background-color`, d => djColors[d.column])
            .style(`border`, `2px solid white`)
            .style(`border-radius`, `50%`)
            .on('click', d => drillDown(d.links, d3.event))
            .on(`mouseover`, function(d) {
              d3.select(this).style(`opacity`, `1`);
            })
            .on(`mouseout`, function(d) {
              d3.select(this).style(`opacity`, `0`);
            });
    }

    function createXAxis(series) {
        let tooltip = document.getElementsByClassName(`apexcharts-xaxistooltip-text`);
        let tooltipCoords = tooltip[0].getBoundingClientRect();
        console.log(`This is the series`, series);

        let object = [
            {
                name: series.name.name,
                id: `_${tooltip[0].id}`,
                originalId: tooltip[0].id,
                coordinates: {
                    width: tooltipCoords.width,
                    height: tooltipCoords.height,
                    top: tooltipCoords.top,
                    left: tooltipCoords.left,
                    bottom: tooltipCoords.bottom,
                    right: tooltipCoords.right,
                    x: tooltipCoords.x,
                    y: tooltipCoords.y
                },
                links: series.name.links,
                element: tooltip
            }
        ];

        let xaxisSeries = d3.select(`.container`)
            .append(`div`).attr(`class`, `xaxis`)
                .selectAll(`.drilldown`).data(object);
        let xaxisDrilldown = xaxisSeries.enter().append(`div`);
        xaxisSeries.merge(xaxisDrilldown)
            .attr(`class`, `drilldown`)
            .attr(`id`, d => d.id)
            .style(`width`, d => `${d.coordinates.width}px`)
            .style(`height`, d => `${d.coordinates.height}px`)
            .style(`z-index`, `22`)
            .style(`position`, `absolute`)
            .style(`left`, d => `${d.coordinates.left}px`)
            .style(`top`, d => `${d.coordinates.top}px`)
            .style(`opacity`, `1`)
            .style(`border`, `1px dashed black`)
            .on('click', d => drillDown(d.links, d3.event));
    }
    */

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
          queryResponse.fields._dimension_like =
            queryResponse.fields.dimension_like;
          queryResponse.fields.dimension_like = queryResponse.fields.pivots;
        } else if (
          queryResponse.fields.pivots[0].field_group_label ==
            `Period Over Period` ||
          queryResponse.fields.pivots[0].field_group_variant ==
            `Period Selection`
        )
          pivotC = true;
        else pivotB = true;
      }
    }

    function truncate() {
      if (!doNotTruncate) {
        for (let i = 0; i < queryResponse.fields.measure_like.length; i++) {
          let truncate = false;
          datum.forEach(row => {
            if (row[queryResponse.fields.measure_like[i].name].value > 100)
              truncate = true;
          });
          if (truncate) {
            datum.forEach(row => {
              row[queryResponse.fields.measure_like[i].name].original =
                row[queryResponse.fields.measure_like[i].name].value;
              row[queryResponse.fields.measure_like[i].name].value = Math.trunc(
                row[queryResponse.fields.measure_like[i].name].value
              );
            });
          }
        }
      }
    }

    function formatSeriesData() {
      if (!pivot) {
        // Series data structure
        for (let i = 0; i < queryResponse.fields.measure_like.length; i++) {
          let name = queryResponse.fields.measure_like[i].label;
          let measureName = queryResponse.fields.measure_like[i].name;
          let value_format = queryResponse.fields.measure_like[i].value_format;
          if (queryResponse.fields.measure_like[i].label_short)
            name = queryResponse.fields.measure_like[i].label_short;

          let obj = {
            name: name,
            className: name.replace(/ /g, `-`),
            measure: measureName,
            value_format: value_format,
            data: [],
            links: []
          };
          seriesData.push(obj);
        }

        // Labels
        datum.forEach(row => {
          let nameVal = row[queryResponse.fields.dimension_like[0].name].value;
          let lonks = row[queryResponse.fields.dimension_like[0].name].links;
          xaxis.push({ name: nameVal, links: lonks });
        });

        // Series data
        datum.forEach((row, index) => {
          for (let i = 0; i < queryResponse.fields.measure_like.length; i++) {
            let value = 0;
            let lonks = row[queryResponse.fields.measure_like[i].name].links;

            if (row[queryResponse.fields.measure_like[i].name].value != null)
              value = row[queryResponse.fields.measure_like[i].name].value;
            seriesData[i].data.push(value);
            seriesData[i].links.push(lonks);
          }
        });
      }

      if (pivotA) {
        // Labels
        queryResponse.pivots.forEach(p => {
          let lonks = undefined;
          if (p.metadata[queryResponse.fields.pivots[0].name].links)
            lonks = p.metadata[queryResponse.fields.pivots[0].name].links;
          if (p.metadata[queryResponse.fields.pivots[0].name].rendered) {
            if (
              p.metadata[queryResponse.fields.pivots[0].name].rendered != null
            )
              xaxis.push({
                name: p.metadata[queryResponse.fields.pivots[0].name].rendered,
                links: lonks
              });
          } else xaxis.push({ name: p.key, links: lonks });
        });

        queryResponse.fields.measure_like.forEach((row, index) => {
          let obData = [];
          let liData = [];

          for (let i = 0; i < queryResponse.pivots.length; i++) {
            let keyname = queryResponse.pivots[i].key;
            let value = 0;

            liData.push(datum[0][row.name][keyname].links);

            if (datum[0][row.name][keyname].value != null)
              value = datum[0][row.name][keyname].value;
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
          };
          seriesData.push(obj);
        });
      }

      if (pivotB) {
        // Labels
        datum.forEach(row => {
          let lonks = row[queryResponse.fields.dimension_like[0].name].links;
          if (row[queryResponse.fields.dimension_like[0].name].rendered)
            xaxis.push({
              name: row[queryResponse.fields.dimension_like[0].name].rendered,
              links: lonks
            });
          else
            xaxis.push({
              name: row[queryResponse.fields.dimension_like[0].name].value,
              links: lonks
            });
        });

        // Series Object
        for (let i = 0; i < queryResponse.pivots.length; i++) {
          let name =
            queryResponse.pivots[i].data[queryResponse.fields.pivots[0].name];
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
          for (let i = 0; i < queryResponse.pivots.length; i++)
            seriesData[i].links.push(
              row[queryResponse.fields.measure_like[0].name][
                queryResponse.pivots[i].key
              ].links
            );
        });

        datum.forEach(row => {
          for (let i = 0; i < queryResponse.pivots.length; i++) {
            let value = 0;
            if (
              row[queryResponse.fields.measure_like[0].name][
                queryResponse.pivots[i].key
              ].value != null
            )
              value =
                row[queryResponse.fields.measure_like[0].name][
                  queryResponse.pivots[i].key
                ].value;
            seriesData[i].data.push(value);
          }
        });
      }

      if (pivotC) {
        // Labels
        datum.forEach(row => {
          let links = [];
          if (row[queryResponse.fields.dimension_like[0].name].links)
            links = row[queryResponse.fields.dimension_like[0].name].links;

          if (row[queryResponse.fields.dimension_like[0].name].rendered)
            xaxis.push({
              name: row[queryResponse.fields.dimension_like[0].name].rendered,
              links: links
            });
          else
            xaxis.push({
              name: row[queryResponse.fields.dimension_like[0].name].value,
              links: links
            });
        });

        // Series Object
        for (let i = 0; i < queryResponse.pivots.length; i++) {
          let name =
            queryResponse.pivots[i].data[queryResponse.fields.pivots[0].name];
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
        for (let i = 0; i < sql.length; i++) {
          if (sql[i] == `,` && sql[i + 1] == ` ` && sql[i + 2] == `-`) {
            chop = i + 3;
            break;
          }
        }
        let stringFind = sql.substr(chop, 11);
        let backwardsIteration = parseInt(stringFind, 10);

        seriesData[0].originalAxis = [];
        seriesData[1].originalAxis = [];
        for (
          let i = datum.length - 1;
          i >= datum.length - backwardsIteration;
          i--
        ) {
          let val =
            datum[i][queryResponse.fields.measure_like[0].name][
              queryResponse.pivots[1].key
            ].value;
          let links =
            datum[i][queryResponse.fields.measure_like[0].name][
              queryResponse.pivots[1].key
            ].value;
          let xaxisVal =
            datum[i][queryResponse.fields.dimension_like[0].name].value;

          seriesData[1].data.unshift(val);
          seriesData[1].links.unshift(links);
          seriesData[1].originalAxis.unshift(xaxisVal);
        }

        for (let i = datum.length - backwardsIteration - 1; i >= 0; i--) {
          let val =
            datum[i][queryResponse.fields.measure_like[0].name][
              queryResponse.pivots[0].key
            ].value;
          let links =
            datum[i][queryResponse.fields.measure_like[0].name][
              queryResponse.pivots[0].key
            ].value;
          let xaxisVal =
            datum[i][queryResponse.fields.dimension_like[0].name].value;

          seriesData[0].data.unshift(val);
          seriesData[0].links.unshift(links);
          seriesData[0].originalAxis.unshift(xaxisVal);
        }
      }

      // Grab the xaxis names for the labels of the chart
      xaxis.forEach(axis => axisData.push(axis.name));
    }

    // Instead change the category labels to an index value that mirros the xaxis data, append the rendered data through to the axis and evaluate it based on that
    function formatAxes(value, format) {
      let value_format = format;
      let autoSelectFormat = [];
      let response;
      let final = value;

      if (!multipleAxes) {
        //   Construct the checker
        seriesData.forEach(series =>
          autoSelectFormat.push({
            value_format: series.value_format,
            universalCount: 0
          })
        );

        //   Tally the valueFormat
        autoSelectFormat.forEach((series, index) => {
          for (let i = 0; i < autoSelectFormat.length; i++) {
            if (autoSelectFormat[i].value_format == series.value_format)
              autoSelectFormat[index].universalCount += 1;
          }
        });

        //   Use last one that equals the most or matches the most
        let count = 0;
        autoSelectFormat.forEach((series, index) => {
          if (index == 0) {
            count = series.universalCount;
            value_format = series.value_format;
          } else {
            if (count < series.universalCount) {
              count = series.universalCount;
              value_format = series.value_format;
            }
          }
        });
      }

      if (value_format == `0`) {
        final = value.toFixed(0);
      } // Integer (123)

      if (value_format == `*00#`) {
        response = value.toString();
        final = response.padStart(3, "0");
      } // Integer zero-padded to 3 places (001)

      if (value_format == `0.##`) {
        response = value.toString();
        if (response.includes(`.`)) {
          let found = false;
          let counter = 0;
          for (let i = 0; i < response.length; i++) {
            if (found) counter++;
            if (response[i] == `.`) found = true;
          }
          reponse = parseInt(value, 10);
          if (counter > 2) final = response.toFixed(2);
        } else final = response;
      } // Number up to 2 decimals (1. or 1.2 or 1.23)

      if (value_format == `0.00`) {
        final = value.toFixed(2);
      } // Number with exactly 2 decimals (1.23)

      if (value_format == `*00#.00`) {
        final = value
          .toFixed(2)
          .toString()
          .padStart(3, "0");
      } // Number zero-padded to 3 places and exactly 2 decimals (001.23)

      if (value_format == `#,##0`) {
        final = value
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      } // Number with comma between thousands (1,234)

      if (value_format == `#,##0.00`) {
        final = value
          .toFixed(2)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
      } // Number with comma between thousands and 2 decimals (1,234.00)

      if (value_format == `0.000,,\" M\"`) {
        response = value / 1000000;
        response = response.toFixed(3).toString();
        final = response + " M";
      } // Number in millions with 3 decimals (1.234 M) // Please note division by 1 million happens automatically

      if (value_format == `0.000,\" K\"`) {
        response = value / 1000;
        response = response.toFixed(3).toString();
        final = response + " K";
      } // Number in thousands with 3 decimals (1.234 K) // Please note division by 1 thousand happens automatically

      if (value_format == `$0`) {
        response = value.toFixed(0).toString();
        final = "$" + response;
      } // Dollars with 0 decimals ($123)

      if (value_format == `$0.00`) {
        response = value.toFixed(2).toString();
        final = "$" + response;
      } // Dollars with 2 decimals ($123.00)

      if (value_format == `\"€\"0`) {
        response = value.toFixed(0).toString();
        final = "€" + response;
      } // Euros with 0 decimals (€123)

      if (value_format == `$#,##0.00`) {
        response = value
          .toFixed(2)
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        final = "$" + response;
      } // Dollars with comma btwn thousands and 2 decimals ($1,234.00)

      if (value_format == `$#.00;($#.00)`) {
        response = value.toFixed(2);
        if (response < 0) {
          response = response.toString();
          final = "($" + response + ")";
        } else {
          response = response.toString();
          final = "$" + response;
        }
      } // Dollars with 2 decimals, positive values displayed normally, negative values wrapped in parenthesis

      if (value_format == `0\%`) {
        response = value.toFixed(0).toString();
        final = response + "%";
      } // Display as percent with 0 decimals (1 becomes 1%)

      if (value_format == `0.00\%`) {
        response = value.toFixed(2).toString();
        final = response + "%";
      } // Display as percent with 2 decimals (1 becomes 1.00%)

      if (value_format == `0%`) {
        response = value * 100;
        final = response.toFixed(0).toString() + "%";
      } // Convert to percent with 0 decimals (.01 becomes 1%)

      if (value_format == `0.00%`) {
        response = value * 100;
        final = response.toFixed(2).toString() + "%";
      } // Convert to percent with 2 decimals (.01 becomes 1.00%)

      return final;
    }

    function seriesTypes() {
      seriesData.forEach((series, index) => {
        let name = `series_${index}`;

        if (!settings[name]) {
          changed = true;
          settings[name] = {
            label: `Chart type: ${series.name}`,
            order: index,
            section: `Type of Chart`,
            type: `string`,
            display: `select`,
            values: [{ Area: "area" }, { Column: "column" }, { Line: "line" }],
            default: `area`,
            hidden: false
          };
        } else {
          if (`${series.name} series chart type` != settings[name].label) {
            settings[name].label = `${series.name} series chart type`;
            changed = true;
          }

          let type = `area`;
          if (config.allArea) {
            type = `area`;
          } else if (config.allColumn) {
            type = `column`;
          } else if (config.allLine) {
            type = `line`;
          } else if (config[name]) {
            type = config[name];
          }
          series.type = type;
        }
      });

      // Cleanup extra chart types
      let seriesAmount = seriesData.length;
      let checker = true;
      while (checker) {
        let name = `series_${seriesAmount}`;
        if (settings[name]) {
          changed = true;
          seriesAmount++;

          delete settings[name];
        } else {
          checker = false;
        }
      }
    }

    function hideAxisTab() {
      if (stacked) {
        if (settings.showTitle2 || settings.yTitle2 || settings.multipleAxes)
          changed = true;

        if (settings.showTitle2) delete settings.showTitle2;
        if (settings.yTitle2) delete settings.yTitle2;
        if (settings.multipleAxes) delete settings.multipleAxes;

        for (let i = 1; i < this._series; i++) {
          if (settings[`seriesAxis_${i}`]) {
            delete settings[`seriesAxis_${i}`];
            changed = true;
          }
        }
      } else {
        if (!settings.showTitle2 || !settings.yTitle2 || !settings.multipleAxes)
          changed = true;

        if (!settings.showTitle2) {
          settings.showTitle2 = {
            label: `Show second y axis title`,
            order: 4.2,
            section: `Format`,
            type: `boolean`,
            default: true,
            hidden: false
          };
        }

        if (!settings.yTitle2) {
          settings.yTitle2 = {
            label: `Second y axis label`,
            order: 1.95,
            section: `Format`,
            type: `string`,
            placeholder: `Enter y axis label`,
            hidden: false
          };
        }

        if (!settings.multipleAxes) {
          settings.multipleAxes = {
            label: `Add another axis`,
            order: 1,
            section: `Multiple Axes`,
            type: `boolean`,
            default: false,
            hidden: false
          };
        }

        seriesData.forEach((row, index) => {
          if (index != 0) {
            if (!settings[`seriesAxis_${index}`]) {
              changed = true;
              settings[`seriesAxis_${index}`] = {
                label: `Set ${row.name} on the second axis`,
                order: 10 + index,
                section: `Multiple Axes`,
                type: `boolean`,
                default: false,
                hidden: false
              };
            }
          }
        });
      }
    }

    function convertDateTime(val) {
      let day = val.substr(0, 4);
      let month = val.substr(5, 2);
      let year = val.substr(8, 2);

      if (month == 1) mon = `Jan`;
      if (month == 2) mon = `Feb`;
      if (month == 3) mon = `Mar`;
      if (month == 4) mon = `Apr`;
      if (month == 5) mon = `May`;
      if (month == 6) mon = `Jun`;
      if (month == 7) mon = `Jul`;
      if (month == 8) mon = `Aug`;
      if (month == 9) mon = `Sep`;
      if (month == 10) mon = `Oct`;
      if (month == 11) mon = `Nov`;
      if (month == 12) mon = `Dec`;

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
