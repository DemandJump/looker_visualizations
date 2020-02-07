looker.plugins.visualizations.add({
    options: {
        
    },
    create: function(element, config) {
        this.clearElements = 0;
        element.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <div class="main-card mb-3 card">
                        <div class="card-body">
                            <canvas id="chart-area"></canvas>
                        </div>
                    </div>
                </div>
            </div>
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        let node = document.getElementById('chart-area');
        while(node.firstChild) node.firstChild.remove();
        console.log('These are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', data)
        
        
        // Apex Charts
        window.Apex = {
            dataLabels: {enabled: false},
            stroke: {width: 2}
        };


        var randomScalingFactor = function () {
            return Math.round(Math.random() * 100);
        };;

        let datasets = [
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor(),
            randomScalingFactor()
        ];

    
        var configPie = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        datasets[0],
                        datasets[1],
                        datasets[2],
                        datasets[3],
                        datasets[4]
                    ],
                    backgroundColor: [
                        window.chartColors.red,
                        window.chartColors.orange,
                        window.chartColors.yellow,
                        window.chartColors.green,
                        window.chartColors.blue,
                    ],
                    label: 'Dataset 1'
                }],
                labels: [
                    'Red',
                    'Orange',
                    'Yellow',
                    'Green',
                    'Blue'
                ]
            },
            options: {
                responsive: true
            }
        };

        
        // Apex Charts Init

        if (document.getElementById('chart-area')) {
            let ctx2 = document.getElementById('chart-area').getContext('2d');
            window.myPie = new Chart(ctx2, configPie);
        }
        /**************** Done! *****************/
        doneRendering(); 
    }
});

































/******************************************/
/******************************************************
                * Apex Area Chart Utils *
******************************************************/
      /*****************************************/

// window.chartColors = {
//     red: '#dc3545',
//     orange: '#fd7e14',
//     yellow: '#ffc107',
//     green: '#28a745',
//     blue: '#007bff',
//     purple: '#6f42c1',
//     grey: '#6c757d'
// };

// (function(global) {
//     var Months = [
//         'January',
//         'February',
//         'March',
//         'April',
//         'May',
//         'June',
//         'July',
//         'August',
//         'September',
//         'October',
//         'November',
//         'December'
//     ];

//     var COLORS = [
//         '#4dc9f6',
//         '#f67019',
//         '#f53794',
//         '#537bc4',
//         '#acc236',
//         '#166a8f',
//         '#00a950',
//         '#58595b',
//         '#8549ba'
//     ];

//     var Samples = global.Samples || (global.Samples = {});
//     var Color = global.Color;

//     Samples.utils = {
//         // Adapted from http://indiegamr.com/generate-repeatable-random-numbers-in-js/
//         srand: function(seed) {
//             this._seed = seed;
//         },

//         rand: function(min, max) {
//             var seed = this._seed;
//             min = min === undefined ? 0 : min;
//             max = max === undefined ? 1 : max;
//             this._seed = (seed * 9301 + 49297) % 233280;
//             return min + (this._seed / 233280) * (max - min);
//         },

//         numbers: function(config) {
//             var cfg = config || {};
//             var min = cfg.min || 0;
//             var max = cfg.max || 1;
//             var from = cfg.from || [];
//             var count = cfg.count || 8;
//             var decimals = cfg.decimals || 8;
//             var continuity = cfg.continuity || 1;
//             var dfactor = Math.pow(10, decimals) || 0;
//             var data = [];
//             var i, value;

//             for (i = 0; i < count; ++i) {
//                 value = (from[i] || 0) + this.rand(min, max);
//                 if (this.rand() <= continuity) {
//                     data.push(Math.round(dfactor * value) / dfactor);
//                 } else {
//                     data.push(null);
//                 }
//             }

//             return data;
//         },

//         labels: function(config) {
//             var cfg = config || {};
//             var min = cfg.min || 0;
//             var max = cfg.max || 100;
//             var count = cfg.count || 8;
//             var step = (max - min) / count;
//             var decimals = cfg.decimals || 8;
//             var dfactor = Math.pow(10, decimals) || 0;
//             var prefix = cfg.prefix || '';
//             var values = [];
//             var i;

//             for (i = min; i < max; i += step) {
//                 values.push(prefix + Math.round(dfactor * i) / dfactor);
//             }

//             return values;
//         },

//         months: function(config) {
//             var cfg = config || {};
//             var count = cfg.count || 12;
//             var section = cfg.section;
//             var values = [];
//             var i, value;

//             for (i = 0; i < count; ++i) {
//                 value = Months[Math.ceil(i) % 12];
//                 values.push(value.substring(0, section));
//             }

//             return values;
//         },

//         color: function(index) {
//             return COLORS[index % COLORS.length];
//         },

//         transparentize: function(color, opacity) {
//             var alpha = opacity === undefined ? 0.5 : 1 - opacity;
//             return Color(color).alpha(alpha).rgbString();
//         }
//     };

//     // DEPRECATED
//     window.randomScalingFactor = function() {
//         return Math.round(Samples.utils.rand(-100, 100));
//     };

//     // INITIALIZATION

//     Samples.utils.srand(Date.now());

// }(this));
