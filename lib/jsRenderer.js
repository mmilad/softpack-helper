var babel = require("babel-core");

function jsRenderer(c, o) {
    return babel.transform(c, {
        babelrc: false,
        presets: ['es2015']
    }).code;
}

module.exports = jsRenderer