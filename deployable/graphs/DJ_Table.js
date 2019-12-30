// import * as d3 from 'd3';
console.log("Rendering dj table");

looker.plugins.visualizations.add({
    id: "dj_table",
    label: "Demand Jump Table",
    options: {},


    create: function(element, config) {
        let d3 = d3v5;    
        element.innerHTML =`
            <style>
                @import url('https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700&display=swap');
                html {
                    margin: 0;
                    padding: 0; 
                    box-sizing: border-box;
                }
            
                table { 
                    border-collapse: collapse;
                    font-family: 'Roboto', Arial, Helvetica, sans-serif;
                    font-weight: 300;
                    font-size: 11px;
                    border-spacing: 0px;
                    width: 100%;
                }
            
                #w3table { 
                    height: 200px;
                    overflow-x: auto;
                }
            
                    /* Inside cell spacing */
                td, th {
                    padding: 2px 5px;
                }
            
                    /* Table borders */
                td.dimensions:not(:first-child) { border-left: 1px solid #C2CDD8; }
                th.dimensions:not(:first-child) { border-left: 1px solid #C2CDD8; }
            
                    /* Color ever other cell */
                tr.dimensions:nth-child(even) { background-color: #F5F8FA; }
                tr.measures:nth-child(even) { background-color: #F7F2ED; }

                    /* Highlight the hovered cell */
                tr:hover { background-color: #E6E8EC; }
            
                    /* Header colors */
                th {
                    padding: 2px 5px;
                    text-align: left;
                    color: #2E343F;
                }
                th.dimensions { background-color: #CCD8E4; }
                th.measures { background-color: #E4D1BD; }
            </style>


            <h1>W3 Schools table</h1>
            <div id="w3table">
                <table>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Savings</th>
                            <th>Company</th>
                            <th>Contact</th>
                            <th>Country</th>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>Swanson</td>
                            <td>$300</td>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                        </tr>
                        <tr>
                            <td>Cleveland</td>
                            <td>Brown</td>
                            <td>$250</td>
                            <td>Ernst Handel</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>Island Trading</td>
                            <td>Helen Bennett</td>
                            <td>UK</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Königlich Essen</td>
                            <td>Philip Cramer</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>Swanson</td>
                            <td>$300</td>
                            <td>Laughing Bacchus Winecellars</td>
                            <td>Yoshi Tannamuri</td>
                            <td>Canada</td>
                        </tr>
                        <tr>
                            <td>Cleveland</td>
                            <td>Brown</td>
                            <td>$250</td>
                            <td>Magazzini Alimentari Riuniti</td>
                            <td>Giovanni Rovelli</td>
                            <td>Italy</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>North/South</td>
                            <td>Simon Crowther</td>
                            <td>UK</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Paris spécialités</td>
                            <td>Marie Bertrand</td>
                            <td>France</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>Swanson</td>
                            <td>$300</td>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                        </tr>
                        <tr>
                            <td>Cleveland</td>
                            <td>Brown</td>
                            <td>$250</td>
                            <td>Ernst Handel</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>Island Trading</td>
                            <td>Helen Bennett</td>
                            <td>UK</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Königlich Essen</td>
                            <td>Philip Cramer</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>Swanson</td>
                            <td>$300</td>
                            <td>Laughing Bacchus Winecellars</td>
                            <td>Yoshi Tannamuri</td>
                            <td>Canada</td>
                        </tr>
                        <tr>
                            <td>Cleveland</td>
                            <td>Brown</td>
                            <td>$250</td>
                            <td>Magazzini Alimentari Riuniti</td>
                            <td>Giovanni Rovelli</td>
                            <td>Italy</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>North/South</td>
                            <td>Simon Crowther</td>
                            <td>UK</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Paris spécialités</td>
                            <td>Marie Bertrand</td>
                            <td>France</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>Alfreds Futterkiste</td>
                            <td>Maria Anders</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Berglunds snabbköp</td>
                            <td>Christina Berglund</td>
                            <td>Sweden</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>Swanson</td>
                            <td>$300</td>
                            <td>Centro comercial Moctezuma</td>
                            <td>Francisco Chang</td>
                            <td>Mexico</td>
                        </tr>
                        <tr>
                            <td>Cleveland</td>
                            <td>Brown</td>
                            <td>$250</td>
                            <td>Ernst Handel</td>
                            <td>Roland Mendel</td>
                            <td>Austria</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>Island Trading</td>
                            <td>Helen Bennett</td>
                            <td>UK</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Königlich Essen</td>
                            <td>Philip Cramer</td>
                            <td>Germany</td>
                        </tr>
                        <tr>
                            <td>Joe</td>
                            <td>Swanson</td>
                            <td>$300</td>
                            <td>Laughing Bacchus Winecellars</td>
                            <td>Yoshi Tannamuri</td>
                            <td>Canada</td>
                        </tr>
                        <tr>
                            <td>Cleveland</td>
                            <td>Brown</td>
                            <td>$250</td>
                            <td>Magazzini Alimentari Riuniti</td>
                            <td>Giovanni Rovelli</td>
                            <td>Italy</td>
                        </tr>
                        <tr>
                            <td>Peter</td>
                            <td>Griffin</td>
                            <td>$100</td>
                            <td>North/South</td>
                            <td>Simon Crowther</td>
                            <td>UK</td>
                        </tr>
                        <tr>
                            <td>Lois</td>
                            <td>Griffin</td>
                            <td>$150</td>
                            <td>Paris spécialités</td>
                            <td>Marie Bertrand</td>
                            <td>France</td>
                        </tr>
                </table>
            </div>


            <h1>Eastern Asia Improved the Most</h1>
            <p>This table shows regional access to improved water over a random set of time. </p>
            <p>Source: WHO/UNICEF (2012) Progress on Sanitation and Drinking Water: 2012 Update</p>
            <div id="table"></div>
        `;

        d3.select('#table')
            .attr('class', 'table');

    },
    

    updateAsync: function(data, element, config, queryResponse, details, doneRendering) { 
        let d3 = d3v5;
        // this._svg.selectAll("*").remove(); // Clear out the data before we add the vis
        console.log(`\n\ndirect reference to settings (this.options)`, this.options);
        console.log(`config`, config);
        console.log(`element`, element);
        console.log(`details`, details); 
        console.log(`queryResponse`, queryResponse);
        console.log(`data`, data);
        let dimensions = queryResponse.fields.dimension_like; // console.log(`Checking out query resposne dimension fields: `, dimensions);
        let measures = queryResponse.fields.measure_like; // console.log(`Checking out query resposne measure fields: `, measures);

        let columns = dimensions.length + measures.length;
        let rowData = [];
        let columnNames = [];

        // Find the order of the dimensions/measures
        // Store those names, then iterate the data into rowData

        data.forEach(row => {
            // rowData.push(row.)
        });
    

            /**************** Done! *****************/
    doneRendering(); // Always call done to indicate a visualization has finished rendering
}
});


// "SELECT
// 	djdh_sessions.pdomain  AS `djdh_sessions.domain`,
// 	COALESCE(djdh_sessions.channel,'Other')  AS `djdh_sessions.marketing_channel`,
// 	djdh_sessions.marketing_source  AS `djdh_sessions.marketing_source`,
// 	djdh_sessions.marketing_campaign  AS `djdh_sessions.marketing_campaign`,
// 	COUNT(DISTINCT djdh_sessions.session_id ) AS `djdh_sessions.session_count`,
// 	COUNT(DISTINCT CASE WHEN djdh_sessions.page_views = 1  THEN djdh_sessions.user_domain_id  ELSE NULL END) AS `djdh_sessions.bounced_user_count`,
// 	COUNT(DISTINCT djdh_sessions.user_canonical_id ) AS `djdh_sessions.canonical_user_count`,
// 	COUNT(DISTINCT CASE WHEN djdh_sessions.session_index = 1 THEN djdh_sessions.session_id  ELSE NULL END) AS `djdh_sessions.first_session_count`,
// 	COUNT(DISTINCT CASE WHEN djdh_sessions.device_is_mobile  THEN djdh_sessions.session_id  ELSE NULL END) AS `djdh_sessions.mobile_session_count`,
// 	(COALESCE(SUM(djdh_sessions.page_views ), 0)) / NULLIF((COUNT(DISTINCT djdh_sessions.session_id )),0)  AS `djdh_sessions.pages_per_session`
// FROM presentation.sessions  AS djdh_sessions

// WHERE (djdh_sessions.app_id = '1230010009-01')
// GROUP BY 1,2,3,4
// ORDER BY `djdh_sessions.domain` DESC,`djdh_sessions.marketing_channel` DESC,`djdh_sessions.marketing_source` DESC,`djdh_sessions.session_count` DESC
// LIMIT 50"