looker.plugins.visualizations.add({
  id: `dj_arc_pie_chart`,
  label: `Demandjump pie chart`,
  options: {
    theme: {
      label: `Choose a theme`,
      order: 1,
      section: `Format`,
      type: `string`,
      display: `select`,
      values: [{ Classic: "pie" }, { Donut: "donut" }],
      default: `pie`,
      hidden: false
    },

    title: {
      label: `Title of chart`,
      order: 2,
      section: `Format`,
      type: `string`,
      placeholder: `Enter chart title here`,
      hidden: false
    },

    showTitle: {
      label: `Show title`,
      order: 2.5,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    },

    aspectRatio: {
      label: `Maintain`,
      order: 3,
      section: `Format`,
      type: `boolean`,
      default: true,
      hidden: false
    }
  },
  create: function(element, config) {
    element.innerHTML = `
            <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
            * { font-family: 'Roboto' !important; }
            </style>
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body" id="card-body">
                            <canvas id="chart-area"></canvas>
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
    let node = document.getElementById(`chart-area`);
    while (node.firstChild) node.firstChild.remove();

    console.log(`These are the settings`, this.options);
    console.log(`This is the config`, config);
    console.log(`Queryresponse`, queryResponse);
    console.log(`Data`, data);

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
    let datum = data;
    let diameter = window.innerHeight - 45;
    if (diameter > window.innerWidth - 45) diameter = window.innerWidth - 45;
    let settings = this.options;
    let changed = false;
    let pivot = false;
    let pivotA = false;
    let pivotB = false;
    let pivotC = false;
    let throwPivotError = false;

    let type = `pie`;
    let seriesData = [];
    let xaxis = [];
    let xaxisNames = [];

    if (config.theme) type = config.theme;

    // Grab the type of query, then the series data
    pivotCheck();
    grabSeries();

    if (throwPivotError) {
      this.addError({
        title: "Cannot have pivots on a pie chart",
        message: "Deselect pivots and run again"
      });
    }

    /**** Chart Configuration ****/
    var configuration = {
      chart: {
        width: diameter,
        type: type
      },
      series: seriesData[0].data,
      labels: xaxisNames,
      colors: djColors,
      title: {
        text: `title`,
        align: `left`
      },
      subtitle: {
        text: `subtitle`,
        align: `left`
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
        horizontalAlign: `center`,
        onItemClick: { toggleDataSeries: true },
        onItemHover: { highlightDataSeries: true }
      }
      //   responsive: [
      //     {
      //       breakpoint: 480,
      //       options: {
      //         chart: { width: 200 },
      //         legend: {
      //           position: `bottom`,
      //           horizontalAlign: `center`
      //         }
      //       }
      //     }
      //   ]
    };

    // Apex Charts
    window.Apex = { dataLabels: { enabled: false }, stroke: { width: 2 } };
    let chart = new ApexCharts(
      document.querySelector(`#chart-apex-area`),
      configuration
    );
    if (document.getElementById(`chart-apex-area`)) chart.render();

    /************************************
     * Data functions
     ************************************/

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

    function grabSeries() {
      if (!pivot) {
        let series = {
          name: queryResponse.fields.dimension_like[0].label_short,
          measure: queryResponse.fields.measure_like[0].label_short,
          data: [],
          links: []
        };

        datum.forEach(row => {
          let nameVal = row[queryResponse.fields.dimension_like[0].name].value;
          if (row[queryResponse.fields.dimension_like[0].name].rendered)
            nameVal = row[queryResponse.fields.dimension_like[0].name].rendered;
          let lonks = row[queryResponse.fields.dimension_like[0].name].links;
          xaxis.push({ name: nameVal, links: lonks });
          xaxisNames.push(nameVal);

          let links = row[queryResponse.fields.measure_like[0].name].links;
          let value = row[queryResponse.fields.measure_like[0].name].value;
          series.data.push(value);
          series.links.push(links);
        });
        seriesData.push(series);
      } else {
        throwPivotError = true;
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
