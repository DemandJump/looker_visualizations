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
    },
    create: function(element, config) {
        element.innerHTML = `
    <style>
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

.row {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px
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

                <div class="h-100 row align-items-center">
                    <div class="col">
                        <div class="widgetChart" style="padding:0rem;">
                            <div class="widgetNumbers" id="value">No value specified</div>
                            <div class="widgetSubheading" id="name">No heading specified</div>
                            <div class="widgetDescription text-info">
                                <span class="pl-1"></span>
                            </div>
                        </div>
                    </div>
                </div>
/*
                <div class="dj_arc_svm_container">
                    <div class="widgetChart" style="padding:0rem;">
                        <div class="widgetNumbers" id="value">No value specified</div>
                        <div class="widgetSubheading" id="name">No heading specified</div>
                        <div class="widgetDescription text-info">
                            <span class="pl-1"></span>
                        </div>
                    </div>
                </div>
*/
            `;
    },
    updateAsync: function(data, element, config, queryResponse, details, doneRendering) {
        // let node = document.getElementById('chart-apex-negative');
        // while(node.firstChild) node.firstChild.remove();
        console.log('These are the settings', this.options);
        console.log('This is the config', config);
        console.log('Queryresponse', queryResponse);
        console.log('Data', data);

        let name = ' ';
        if (config.name) name = config.name;

        let value = data[0][queryResponse.fields.measures[0].name].value;

        let nameNode = document.getElementById('name');
        nameNode.innerHTML = name;
        
        let valueNode = document.getElementById('value');
        valueNode.innerHTML = value;
        
        /**************** Done! *****************/
        doneRendering(); 
    }
});





























