var JsonPrecompiler = require('../index');
var broccoli = require('broccoli');
var path = require('path');
var fs = require('fs');
var expect = require('chai').expect;

describe('broccoli-json-precompile integration', function() {

  var srcDir = path.join('test', 'fixture', 'testSrcDir');
  var expectedDestDir = path.join('test', 'fixture', 'expectedDestDir');

  it('should result in a js file for each json file', function() {
    var tree = JsonPrecompiler(srcDir);

    var builder = new broccoli.Builder(tree);
    return builder.build().then(function(dir) {
      expect(fs.readFileSync(path.join(dir.directory, 'default', 'en.js')).toString())
      .to.equal(fs.readFileSync(path.join(expectedDestDir, 'default', 'en.js')).toString());

      expect(fs.readFileSync(path.join(dir.directory, 'nl.js')).toString())
        .to.equal(fs.readFileSync(path.join(expectedDestDir, 'nl.js')).toString());
    });
  });
});