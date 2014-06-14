var fs = require('fs');
var Config = require('./config');
var cssmin = module.exports = new CssMin(Config);

function CssMin (config) {
  var path = config.src + '/' + config.default + '.html';

  // var htmlReg = /(.*.html)|(.*.htm)/g;
  var minHtmlReg = /\s*\r\n\s*/g;
  var cssReg = /href=\".*\/([^\/\\\:\?]+)\.css/;
  var commentReg = /<!--(.(\r\n)?)*-->/g;
  var fstat = fs.statSync(config.src);
  if (fstat.isDirectory()) {
    fs.exists(path, function (err) {
      var fileContent = fs.readFileSync(path, {encoding: 'utf-8'});
      fileContent = fileContent.replace(commentReg, '');
      var result = fileContent.match(cssReg);
      console.log(result);
    })
  }

  // var dest = config.dest;

  // var minReg = /(\r\n)|(\s+)/g;

  // var minContent = '', data ='';

  // each(source, function (src) {
  //   src = src + '.css';
  //   data = fs.readFileSync(src, {encoding: 'utf-8'});
  //   data = data.replace(minReg, '');
  //   minContent += data;
  // });
  // console.log(minContent);
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
