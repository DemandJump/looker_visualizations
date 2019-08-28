const path = require('path');

module.exports = { 
    mode: 'development',
    entry: './src/looker_hello_world.js',
    devServer: {
        contentBase: './dist',
        // compress: true, 
        port: 2525
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    }
};