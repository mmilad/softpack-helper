
var sass = require('node-sass');
var autoprefixer = require('autoprefixer');
var postcss      = require('postcss');
var postcssJs      = require('postcss-js');
 
function prefix (o) {
    var postcss = require('postcss'); // import postcss from 'posts';
    var autoprefixer = require('autoprefixer'); // import autoprefixer from 'autoprefixer';
    return postcss([autoprefixer({
        from: undefined,
        browsers: ['last 2 versions']
    })]).process(o.context).css;
}
function renderSass (c, o) {
    var x = sass.renderSync({
        data: o.context,
        file: o.fullPath,
        outputStyle: "expanded"
    }).css
    return x
}
module.exports = {
    sass: renderSass,
    prefix: prefix
};