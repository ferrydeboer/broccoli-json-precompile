var Filter = require('broccoli-filter');
var path = require('path');

JsonPrecompiler.prototype = Object.create(Filter.prototype);
JsonPrecompiler.prototype.constructor = JsonPrecompiler;
JsonPrecompiler.prototype.extensions = ['json'];
JsonPrecompiler.prototype.targetExtensions = ['js'];
function JsonPrecompiler(inputTree, options) {
  if (!(this instanceof JsonPrecompiler)) {
    return new JsonPrecompiler(inputTree, options);
  }

  this.inputTree = inputTree;
  this.options = options || {};
  if (options.formatter) {
    if (!(options.formatter instanceof Function)) {
      console.log(typeof(options.formatter));
      throw new Error('formatter is not a function!');
    }
  } else {
    this.options.formatter = _defaultFormatter;
  }
}

JsonPrecompiler.prototype.processString = function(string, relativePath) {
  var filename = relativePath.toString().split(path.sep).reverse()[0].replace('.json', '');
  return this.options.formatter(filename, string);
};

function _defaultFormatter(filename, contents) {
  return 'var ' + filename + ' = ' + contents + ';';
}

module.exports = JsonPrecompiler;