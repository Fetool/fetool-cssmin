var fs = require('fs');
var pth = require('path');
var cssMin = module.exports = new CssMin;

function CssMin () {}

CssMin.prototype.minify = function (files) {
  var result = '', path = '', fstat = null;
  var commentReg = /\/\*[\s\S]*\*\/|\/\/[\s\S]*/g,
    minCssReg = /\s*\r\n\s*|\s*/g;
  each(files, function (file) {
    path = getAbsoultePath(file);
    fstat = fs.statSync(path);
    if (fstat.isFile()) {
      content = fs.readFileSync(path, 'utf-8');
      result += content.replace(commentReg, '').replace(minCssReg, '');
    }
  });
  return result;
};

CssMin.prototype.beautify = function () {

};

function getAbsoultePath (source) {
  return source && pth.normalize(process.cwd() + pth.sep + source);
}

function each (obj, iterator, context) {
  if (obj == null) return obj;
  if (obj.length === +obj.length) {
    for (var i = 0, length = obj.length; i < length; i++) {
      iterator.call(context, obj[i], i, obj)
    }
  } else {
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      iterator.call(context, obj[keys[i]], keys[i], obj);
    }
  }
  return obj;
};
