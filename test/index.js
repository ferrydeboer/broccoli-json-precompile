var JsonPrecompiler = require('../index');
var broccoli = require('broccoli');
var expect = require('chai').expect;

describe('broccoli-json-precompile', function() {
  var testInputTree = 'fixture/testSrcDir';
  var testOptions = { option: true };
  var testContentString = '{"key":"value"}';
  var testRelativePath = 'path/to/tempdir/test.json';
  var precompiler;

  beforeEach(function() {
    precompiler = new JsonPrecompiler(testInputTree, testOptions);
  });

  it('it sets the inputTree on construction', function() {
    expect(precompiler.inputTree).to.equal(testInputTree);
  });

  it('sets the options given on construction', function() {
    expect(precompiler.options).to.equal(testOptions);
  });

  it('should by default simply declare a variable with the filename and the json as contents', function() {
    var output = precompiler.processString(testContentString, testRelativePath);
    expect(output).to.equal('var test = {"key":"value"};');
  });

  it('should call formatter callback with filename and contents', function() {
    var testOutput = 'wascalled';
    var testFormatter = function(filename, contents) {
      expect(filename).to.equal('test');
      expect(contents).to.equal(testContentString);
      return testOutput;
    };

    precompiler = new JsonPrecompiler(testInputTree, { formatter: testFormatter });
    var output = precompiler.processString(testContentString, testRelativePath);
    expect(output).to.equal(testOutput);
  });

  it('should raise an error when the formatter is not a function', function() {
    var ctor = function() {
      JsonPrecompiler(testInputTree, { formatter: 123 })
    };
    expect(ctor).to.throw(Error, /formatter is not a function!/);
  });
});