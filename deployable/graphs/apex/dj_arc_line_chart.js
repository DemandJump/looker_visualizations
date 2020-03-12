looker.plugins.visualizations.add({
  id: "dj_arc_line_chart",
  label: "Demandjump line chart",
  options: {},
  create: function(element, config) {
    this._iteration = 0;
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
    let changed = false;
    let pivot = false;
    let pivotA = false;
    let pivotB = false;
    let pivotC = false; // Period over period

    let height = window.innerHeight - 45;
    let showToolbar = true;
    let curve = `smooth`;
    let dataLabels = false;
    let grid = true;
    let legend = true;
    let alignLegend = `center`;
    let title = ` `;
    let subtitle = ` `;
    let xTitle = ` `;
    let yTitle = ` `;

    pivotCheck(); // Check for pivots
    formatSeriesData();

    let xaxis = [];
    let seriesData = [];
    let axisNames = [];
    let seriesInformation;
    let valueFormat = [];

    /************************
     * Chart Config
     ************************/

    let configuration = {
      chart: {
        id: `lineChart`,
        type: `line`,
        height: window.innerHeight - 45,
        toolbar: {
          autoSelected: `pan`,
          show: true
        }
      },
      series: [],
      labels: [],
      colors: djColors,
      stroke: { curve: `smooth` },
      markers: { size: 1 },
      dataLabels: {
        enabled: dataLabels,
        style: {
          fontSize: ".75rem",
          colors: ["#fff"]
        }
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      title: {
        text: `Product Trends by Month`,
        align: `left`
      },
      subtitle: {
        text: ``,
        align: `left`
      },
      xaxis: {
        text: { title: `` }
      },
      yaxis: {
        text: { title: `` },
        opposite: false,
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
      },
      legend: {
        position: `bottom`,
        horizontalAlign: `center`
      }
    };
    // Turning off animations in the initial iterations
    if (this._iteration < 2) configuration[`animations`] = { enabled: false };

    /*********************
     * Apex Charts
     *********************/
    window.Apex = { dataLabels: { enabled: false }, stroke: { width: 2 } };
    let lineChart = new ApexCharts(
      document.querySelector("#chart-line"),
      configuration
    );
    lineChart.render();

    // Pull all the information into a single object
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
      // drillDownNodes: drilldownElementData,
      updateAsync: {
        queryResponse: queryResponse,
        data: datum,
        config: config,
        settings: this.options,
        details: details,
        element: element
      },
      iteration: this._iteration
    };
    this._iteration++;
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
        let series = [];
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

        // Series construct > the measure and the pivot for each key including data across all labels for each series(measure)
        let series = [];
        queryResponse.fields.measure_like.forEach((row, index) => {
          let obData = [];
          let liData = [];
          let newSeries = [];

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

      // Grab the xaxis names for the labels of the chart, and value format
      xaxis.forEach(axis => axisNames.push(axis.name));
      queryResponse.fields.measure_like.forEach(mes =>
        valueFormat.push(mes.value_format)
      );
    }

    /**************** Done! *****************/
    doneRendering();
  }
});
