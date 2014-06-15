var cssMin = require('../');

var files = ['./index.css', './public.css'];

var result = cssMin.minify(files);

console.log(result);