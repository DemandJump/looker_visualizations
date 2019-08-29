const path = require('path');

module.exports = { 
    mode: 'development',

            /*!!! Change the entry based on what you wanna build to give to looker !!!*/
    entry: './src/deployable_graphs/test_looker.js',
    devServer: {
        contentBase: './dist',
        // compress: true, 
        port: 2525
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js']
    }
};