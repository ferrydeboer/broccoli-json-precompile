broccolli-json-precompile
=========================

Simple Broccoli filter to precompile static json into a js file for a build.
By default this simply creates a js file named similar to the json file. This
js file contains a single statement: `var [filename] = [contents];`

The contents is plain JSON, no parsing is done to literal javascript
notation since the interpreter understands the JSON notation.

For any other scenario set a formatter function on the options that takes a filename
and a contents string and returns the new contents:

```javascript
var precompiler = function(filename, contents){
	return 'addLanguage(' + filename + ', ' + contents + ');';
}
precompiler = new JsonPrecompiler('language', { formatter: testFormatter });
```

##TODO
* Add formatString option, this is more readable than a callback
* Add initialization string that is called only once on the first file.
This can be used when you for instance want a array initialized to store the file contents on.
