var fs = require('fs'),
    handlebars = require('handlebars'),
    path = require('path');

    
function splitPath (filePath) {
    var split = filePath.split(path.sep)
    return {
        name: split.pop(),
        path: split.join(path.sep)
    }
}

handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context, null, 4);
});

handlebars.registerHelper('include', function(includePath, data) {
    var res = includePath + " not found",
        data;
    if(fs.existsSync(includePath)) {
        try {
            data = JSON.parse(data);
        } catch (e) {
            data = data ? this : {};
        }
        res = new handlebars.SafeString(handlebars.compile(fs.readFileSync(includePath, 'utf8'))(data ? data : {}))
    }
    return res
});

function renderTempalte(c, o) {
    var tpl = handlebars.compile(c),
        data = {},
        dataPath = o.fullPath.replace(path.extname(o.fileName), '.json')
    if(fs.existsSync(dataPath)) {
        delete require.cache[require.resolve(dataPath)];
        data = require(dataPath);
    }
    return tpl(data);
}

module.exports = {
    registerPartial: (c, o) => {
        handlebars.registerPartial(o.fileName.replace(path.extname(o.fileName), ''), c)   
    },
    renderTempalte: renderTempalte
}