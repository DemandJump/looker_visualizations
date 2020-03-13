looker.plugins.visualizations.add({
  id: "dj_arc_line_chart",
  label: "Demandjump line chart",
  options: {
    customLabel: {
      order: 1,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: "Chart Labels:" }],
      hidden: false
    },

    title: {
      label: `Title of chart`,
      order: 2,
      section: `Format`,
      type: `string`,
      placeholder: `Enter a title`,
      default: ``,
      hidden: false
    },

    subtitle: {
      label: `Subtitle of chart`,
      order: 3,
      section: `Format`,
      type: `string`,
      placeholder: `Enter a subtitle`,
      default: ``,
      hidden: false
    },

    yTitle: {
      label: `Y axis label`,
      order: 4,
      section: `Format`,
      type: `string`,
      placeholder: `Enter y axis label`,
      default: ``,
      hidden: false
    },

    yTitle2: {
      label: `Second y axis label`,
      order: 5,
      section: `Format`,
      type: `string`,
      placeholder: `Enter y axis label`,
      default: ``,
      hidden: false
    },

    xTitle: {
      label: `X axis label`,
      order: 6,
      section: `Format`,
      type: `string`,
      placeholder: `Enter x axis label`,
      default: ``,
      hidden: false
    },

    showTitle: {
      label: `Show title`,
      order: 7,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    showSubtitle: {
      label: `Show subtitle`,
      order: 8,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    showTitleY: {
      label: `Show y axis label`,
      order: 9,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },
    showTitleY2: {
      label: `Show second y axis label`,
      order: 10,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    showTitleX: {
      label: `Show x axis label`,
      order: 11,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    customSpacing: {
      order: 12,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: " " }],
      hidden: false
    },

    customLabel: {
      order: 13,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: "Custom configuration:" }],
      hidden: false
    },

    curve: {
      label: `Line behavior`,
      order: 14,
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

    fill: {
      label: `Gradient type`,
      order: 14.5,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [
        { Solid: "solid" },
        { Gradient: "gradient" },
        { Pattern: "pattern" }
      ],
      default: `solid`,
      hidden: false
    },

    alignYaxis: {
      label: `Set y axis on the right`,
      order: 15,
      section: `Format`,
      type: `boolean`,
      default: false,
      hidden: false
    },

    dataLabels: {
      label: `Enable data labels`,
      order: 16,
      section: `Format`,
      type: `boolean`,
      default: false,
      hidden: false
    },

    // legend: {
    //   label: `Display legend`,
    //   order: 17,
    //   section: `Format`,
    //   type: `boolean`,
    //   default: true,
    //   hidden: false
    // },

    styleGrid: {
      label: `Style grid`,
      order: 18,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    alignLegend: {
      label: `Align legend`,
      order: 19,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [{ Center: "center" }, { Left: "left" }, { Right: "right" }],
      default: `center`,
      hidden: false
    },

    // Multiple Axes Section
    multipleAxes: {
      label: `Add another axis`,
      order: 1,
      section: `Multiple Axes`,
      type: `boolean`,
      default: false,
      hidden: false
    },

    // Series Type Section
    allChartTypes: {
      label: `All chart types`,
      order: 0.1,
      section: `Type of Chart`,
      type: `string`,
      display: `radio`,
      values: [
        {
          Line: {
            value: "line",
            description: "Set all charts to a line layout"
          }
        },
        {
          Column: {
            value: "column",
            description: "Set all charts to a column layout"
          }
        },
        {
          Area: {
            value: "area",
            description: "Set all charts to an Area layout"
          }
        },
        {
          Custom: {
            value: "custom",
            description: "Change the chart types individually"
          }
        }
      ],
      default: `line`,
      hidden: false
    },

    seriesSpacing: {
      order: 0.4,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: " " }],
      hidden: false
    },

    seriesLabel: {
      order: 0.5,
      section: `Format`,
      type: `sentence_maker`,
      words: [{ type: "separator", text: "Chart Type Configuration:" }],
      hidden: false
    }
  },
  create: function(element, config) {
    this._iteration = 0;
    this._series = 0;
    this._mutliAxis = false;
    this._rebuildSeriesTypes = false;
    this._seriesSelect = ``;
    element.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
            * { font-family: 'Roboto' !important; }
            </style>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <div id="line-chart"></div>
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
    d3.select("#line-chart")
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
    let thisSeries = this._series;
    let multiAxis = this._mutliAxis;
    let rebuildSeriesTypes = this._rebuildSeriesTypes;
    let seriesSelect = this._seriesSelect;
    let changed = false;
    let pivot = false;
    let pivotA = false;
    let pivotB = false;
    let pivotC = false; // Period over period

    let height = window.innerHeight - 45;
    let curve = `smooth`;
    let fill = `solid`;
    let dataLabels = false;
    let grid = false;
    let markers = true;
    let legend = true;
    let alignLegend = `center`;
    let alignYaxis = false;
    let multipleAxes = false;
    let title = ` `;
    let subtitle = ` `;
    let xTitle = ` `;
    let yTitle = ` `;
    let yTitle2 = ` `;

    let showTitle = false;
    let showSubtitle = false;
    let showTitleX = false;
    let showTitleY = false;
    let showTitleY2 = false;

    let xaxis = [];
    let seriesData = [];
    let axisNames = [];
    let seriesInformation;
    let valueFormat = [];

    // Grab the query data and create the series
    pivotCheck();
    formatSeriesData();

    // Grab the user config data
    if (config.title != ``) title = config.title;
    if (config.subtitle != ``) subtitle = config.subtitle;
    if (config.alignLegend) alignLegend = config.alignLegend;

    if (config.showTitle) showTitle = config.showTitle;
    if (config.showSubtitle) showSubtitle = config.showSubtitle;
    if (config.showTitleX) showTitleX = config.showTitleX;
    if (config.showTitleY) showTitleY = config.showTitleY;
    if (config.showTitleY2) showTitleY2 = config.showTitleY2;
    if (config.dataLabels) dataLabels = config.dataLabels;
    if (config.alignYaxis) alignYaxis = config.alignYaxis;
    if (config.styleGrid) grid = config.styleGrid;
    if (config.curve) curve = config.curve;
    if (config.multipleAxes) multipleAxes = config.multipleAxes;

    /************************
     * Chart Config
     ************************/
    let configuration = {
      chart: {
        id: `lineChart`,
        type: `line`,
        height: height,
        toolbar: {
          autoSelected: `pan`,
          show: true
        }
      },
      series: seriesData,
      labels: axisNames,
      colors: djColors,
      stroke: { curve: curve },
      fill: { type: fill },
      // markers: { size: 1 },
      dataLabels: {
        enabled: dataLabels,
        style: {
          fontSize: ".75rem",
          colors: ["#111"]
        }
      },
      xaxis: { type: `category` },
      yaxis: {
        opposite: alignYaxis,
        labels: {
          formatter: function(val) {
            if (typeof val == `number`)
              return formatAxes(val, seriesData[0].value_format);
            else return val;
          }
        }
      },
      tooltip: {
        labels: {
          formatter: function(val) {
            if (typeof val == `number`)
              return formatAxes(val, seriesData[0].value_format);
            else return val;
          }
        }
      }
    };

    if (grid) {
      configuration[`grid`] = {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      };
    }

    if (legend) {
      configuration[`legend`] = {
        position: `bottom`,
        horizontalAlign: alignLegend,
        onItemClick: { toggleDataSeries: true },
        onItemHover: { highlightDataSeries: true }
      };
    }

    if (showTitle) {
      configuration[`title`] = {
        text: title,
        align: `left`
      };
    }
    if (showSubtitle) {
      configuration[`subtitle`] = {
        text: subtitle,
        align: `left`
      };
    }
    if (showTitleX) configuration[`xaxis`].title = { text: xTitle };
    if (showTitleY) configuration[`yaxis`].title = { text: yTitle };
    if (this._iteration < 2) configuration[`animations`] = { enabled: false };

    buildMultipleAxes();
    multiAxisDisplay();
    seriesTypes();
    selectSeries();

    /****************************************************
     * Store global variables and rerender the data
     ****************************************************/
    this._iteration++;
    this._series = seriesData.length;
    this._mutliAxis = multiAxis;
    this._rebuildSeriesTypes = rebuildSeriesTypes;
    this._seriesSelect = seriesSelect;
    this.options = settings;
    if (changed) this.trigger(`registerOptions`, this.options);

    /*********************
     * Apex Charts
     *********************/
    window.Apex = { dataLabels: { enabled: false }, stroke: { width: 2 } };
    let lineChart = new ApexCharts(
      document.querySelector("#line-chart"),
      configuration
    );
    lineChart.render();

    /********************************
     * Drilldown Menu Configuration
     ********************************/
    d3.select(`.container`)
      .selectAll(`*`)
      .remove(); // Clear out the data before we add the vis
    let axisElements = document.getElementsByClassName(
      `apexcharts-xaxis-texts-g`
    );
    let elem = axisElements[0].children;
    let ps;
    let nodes = [];

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
          left: ps.left
        },
        xaxis: xaxis[i].name,
        links: xaxis[i].links,
        element: elem[i]
      };
      nodes.push(node);
    }

    // Create the axis containers
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
      .style(`width`, d => `${d.coordinates.width}px`)
      .style(`height`, d => `${d.coordinates.height}px`)
      .style(`position`, `absolute`)
      .style(`top`, d => `${d.coordinates.top}px`)
      .style(`left`, d => `${d.coordinates.left}px`)
      .style(`background-color`, `transparent`)
      .style(`opacity`, `0`)
      .style(`z-index`, `4`)
      .on("click", d => drillDown(d.links, d3.event));

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

    /***************************
     * Metadata about the chart
     ***************************/
    seriesInformation = {
      pivot: {
        pivot: pivot,
        pivotA: pivotA,
        pivotB: pivotB,
        pivotC: pivotC
      },
      seriesData: seriesData,
      xaxis: xaxis,
      axisNames: axisNames,
      valueFormat: valueFormat,
      chartConfiguration: configuration,
      drillDownNodes: drilldownElementData,
      updateAsync: {
        queryResponse: queryResponse,
        data: datum,
        config: config,
        settings: this.options,
        details: details,
        element: element
      },
      iteration: this._iteration - 1
    };
    console.log(`Series Information`, seriesInformation, `\n\n\n\n`);

    /**********************************
     * Chart and data function
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

        xTitle = queryResponse.fields.dimension_like[0].field_group_variant;
        yTitle = queryResponse.fields.measure_like[0].field_group_variant;
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

        // Series construct > the measure and the pivot for each key including data across all labels for each series(measure)
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

        xTitle = queryResponse.fields.dimension_like[0].field_group_variant;
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

        xTitle = queryResponse.fields.dimension_like[0].field_group_variant;
        yTitle = queryResponse.fields.measure_like[0].field_group_variant;
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

        xTitle = queryResponse.fields.dimension_like[0].field_group_variant;
      }

      // Grab the xaxis names for the labels of the chart, and value format
      xaxis.forEach(axis => axisNames.push(axis.name));
      queryResponse.fields.measure_like.forEach(mes =>
        valueFormat.push(mes.value_format)
      );

      if (config.xTitle != ``) xTitle = config.xTitle;
      if (config.yTitle != ``) yTitle = config.yTitle;
      if (config.yTitle2 != ``) yTitle2 = config.yTitle2;
    }

    function buildMultipleAxes() {
      if (multipleAxes && seriesData.length > 1) {
        configuration.yaxis = [];

        seriesData.forEach((row, index) => {
          if (index != 0) {
            if (!settings[`seriesAxis_${index}`]) {
              console.log(`Rebuilding seriesAxis_${index}`);
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

        // Apply the config settings to the chart
        let nameA = seriesData[0].name;
        let nameB = seriesData[1].name;
        let passShow = false;
        seriesData.forEach((row, index) => {
          let yaxisTitle = row.name;
          let seriesName = nameA;
          let axisOrientation = false;
          let show = false;

          if (config[`seriesAxis_${index}`] == true) {
            seriesName = nameB;
            axisOrientation = true;
            if (config.yTitle2 != ``) yaxisTitle = yTitle2;
          } else {
            seriesName = nameA;
            axisOrientation = false;
            if (config.yTitle != ``) yaxisTitle = yTitle;
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

          if (seriesName == nameA)
            if (showTitleY) obj[`title`] = { text: yaxisTitle };
          if (seriesName == nameB)
            if (showTitleY2) obj[`title`] = { text: yaxisTitle };

          configuration.yaxis.push(obj);
        });
      }
    }

    /************************************
     * Config Display functions
     ************************************/

    function multiAxisDisplay() {
      console.log(`This is mulitpleAxes`, multipleAxes);
      if (multipleAxes && seriesData.length > 1) {
        if (multiAxis != true) {
          multiAxis = true;
          changed = true;
          console.log(`showing multi axis data`);
          settings.yTitle2.hidden = false;
          settings.showTitleY2.hidden = false;
          seriesData.forEach((s, i) => {
            if (i != 0) settings[`seriesAxis_${i}`].hidden = false;
          });
        }
      } else {
        if (multiAxis != false) {
          multiAxis = false;
          changed = true;
          console.log(`hiding multi axis data`);
          settings.yTitle2.hidden = true;
          settings.showTitleY2.hidden = true;
          seriesData.forEach((s, i) => {
            if (i != 0) settings[`seriesAxis_${i}`].hidden = true;
          });
        }
      }

      // If you're querying new data
      let refactorSeries = false;
      if (seriesData.length != thisSeries) {
        console.log(
          `Refactore series:::: seriesData: ${seriesData.length}, and thisSeries: ${thisSeries}`
        );
        refactorSeries = true;
      }

      seriesData.forEach((s, i) => {
        if (settings[`seriesAxis_${i}`]) {
          if (
            i != 0 &&
            settings[`seriesAxis_${i}`].label !=
              `Set ${s.name} on the second axis`
          ) {
            console.log(`Naming convention off`);
            refactorSeries = true;
          }
        }
      });

      if (refactorSeries == true) {
        for (let i = 0; i < thisSeries; i++) delete settings[`seriesAxis_${i}`];
        seriesData.forEach((s, i) => {
          if (!settings[`seriesAxis_${i}`] && i != 0) {
            changed = true;
            console.log(`Refactoring seriesAxis_${i}`);
            settings[`seriesAxis_${i}`] = {
              label: `Set ${s.name} on the second axis`,
              order: 10 + i,
              section: `Multiple Axes`,
              type: `boolean`,
              default: false,
              hidden: false
            };
          }
        });
        // thisSeries = seriesData.length; // We go through the series then change this value
        rebuildSeriesTypes = true;
      }
    }

    function seriesTypes() {
      seriesData.forEach((series, index) => {
        let name = `series_${index}`;

        if (!settings[name]) {
          changed = true;
          console.log(`Rebuilding series type series_${index}`);
          settings[name] = {
            label: `Chart type: ${series.name}`,
            order: index + 1,
            section: `Type of Chart`,
            type: `string`,
            display: `select`,
            values: [{ Line: "line" }, { Column: "column" }, { Area: "area" }],
            default: `line`,
            hidden: false
          };
        } else {
          if (`Chart type: ${series.name}` != settings[name].label) {
            settings[name].label = `${series.name} series chart type`;
            changed = true;
            console.log(`rebuilding based on chart type conditional`);
          }

          let type = `line`;
          if (config.allChartTypes) type = `line`;
          else if (config.allChartTypes) type = `column`;
          else if (config.allChartTypes) type = `area`;
          else if (config[name]) type = config[name];

          series.type = type;
        }
      });

      console.log(`RebuildSereisTypes: `, rebuildSeriesTypes);
      if (rebuildSeriesTypes == true) {
        changed = true;
        console.log(
          `rebuild series type true for series type function: rebuilding series_`
        );
        for (let i = 0; i < thisSeries; i++) delete settings[`series_${i}`];
        seriesData.forEach((s, i) => {
          if (!settings[`series_${i}`]) {
            settings[`series_${i}`] = {
              label: `Chart type: ${s.name}`,
              order: i + 1,
              section: `Type of Chart`,
              type: `string`,
              display: `select`,
              values: [
                { Line: "line" },
                { Column: "column" },
                { Area: "area" }
              ],
              default: `line`,
              hidden: false
            };
          }
        });
      }
    }

    function selectSeries() {
      if (
        config.allChartTypes == `line` ||
        config.allChartTypes == `column` ||
        config.allChartTypes == `area`
      ) {
        if (seriesSelect != `all`) {
          seriesSelect = `all`;
          changed = true;
          for (let i = 0; i < seriesData.length; i++) {
            settings[`series_${i}`].hidden = true;
            console.log(`iteration: ${i}`, settings[`series_${i}`]);
          }
        }
      } else {
        if (seriesSelect != `custom`) {
          seriesSelect = `custom`;
          changed = true;
          for (let i = 0; i < seriesData.length; i++) {
            settings[`series_${i}`].hidden = true;
            console.log(`iteration: ${i}`, settings[`series_${i}`]);
          }
        }
      }
    }

    /************************************
     * Format functions
     ************************************/

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

    /**************** Done! *****************/
    doneRendering();
  }
});
