# Noteworthy Looker Functionality 

### The looker visualization docs doesn't document everything
- There's a lot of functionality that default looker visualizations use that isn't anywhere to be found in the API. I wanna save you some time and share with you some of what I found. 
- It goes over how to pull in data but not what most of the functions are, you have to dig through console logs to get all the information; however, you can't find all functions that they use that way.
- Enough babeling, here's what I found ~

## UpdateAsync Parameters
#### QueryResponse
- The `QueryResponse` holds your data with info on how you structured your data, and some values pertaining to the query. 
- This data ranges from the sql that structured it, table and row info, sorting, to the raw data and all it's values within.
###### QueryResponse Parameters: 


#### Config
- `Config` holds all the option values along with an object named `query_fields`. This will help with conditionals for changing the visualization based on what options the user chooses. `Query_fields` holds a quick reference to the `dimensions` and `measures` along with the values associated with those objects, and two arrays holding the data for the `pivots` and `table_calculations`.
- This is pretty nice if you don't wanna dig through the `queryResponse` `fields`, and access to the values of your options object

#### Options
- The options can be preloaded but it's technically not an `UpdateAsync` parameter. If you want it to reflect the different `dimensions` or `measures` that are used by the visualization, you should create this using the parameters(`queryResponse`). 
- These can be used to create a bunch of different input fields, and they're prestyled for looker so it's a great construct for passing data and settings into your visual.
- Customizing it and finding all the functionality is kind of easy, just do some digging in their bar charts or tables for some cool functionality. 
- These objects have different values that looker takes in to format what type each input is, along with some styling functionality that will make it look professional. Here's a bit of what I found:
###### Options Parameters:
1. New stuff to save that really help with formatting the settings and beautiful customization:

- `section:` This will give you a navbar at the top of the element, the value is the name of it. All options that have the corresponding name will show in that tab within the settings. If you use a Section parameter ensure all options are in one of the cooresponding values you gave, otherwise it will not show in the settings.

- `type:` This is the data type of the option, and usually reflects `display` value because it pertains to the type of input you want to create. The different values can be: `boolean`, `string`, `array`, `number`, or `sentence_maker`. 

- `display:` This is the different type of inputs there are. The different values are `radio`, `select`, `text`(default), `number`, `colors`,

- `values:` If you have a display that holds multiple options or values to choose from, the `values` value is an array that holds objects with `name` and `value` values pertaining to each object. This configures the name in the settings and the output that's given to config based on what the user chooses. 

- `display_size:` I've only seen this when you want two options side by side, but it's really nifty. The default is for an option to take up the full width of settings menu, but you can add this value in two options and set each to `half` for two options to sit by side in the settings.

- `label:` The label is what the user will see in the settings menu. It's not the name of the option, but is nice for keeping your naming conventions and giving a good label in the settings menu.

- `order:` By default looker will take all your settings and sort them descending alphabetically by the `label's` value. If you don't wanna rip your hair out trying to find peculiar names to describe each option in a structured manner, fret no longer! Use this value. Decimals count too, but the devs used decimals on the values that were being hidden by a boolean switch as one of their neat quirks. 

- `hidden:` You can hide options until further notice, whether it's conditionally based on the data that's pulled in through the UpdateAsync function or through other options in the settings menu. I say go wild, it's really nice for keeping it looking professional and organized.

- `words:` This is an array that holds objects to construct for the type `sentence_maker`. 
limit_displayed_rows_values: {
    type: "sentence_maker",
    label: "Limit Displayed Rows Values",
    section: "Plot",
    words: [
        {
            type: "select",
            name: "show_hide",
            options: [
                { label: "Hide", value: "hide" },
                { label: "Show", value: "show" }
            ]
        },
        { type: "separator", text: "the" },
        {
            type: "select",
            name: "first_last",
            options: [
                { label: "First", value: "first" },
                { label: "Last", value: "last" }
            ]
        },
        { type: "number", name: "num_rows", value: 0 },
        { type: "separator", text: "rows" }
    ]
}
- These are the different params you can put in the values array to construct sentence returns with varying input data. This is really nifty type structure that you can implement. 

