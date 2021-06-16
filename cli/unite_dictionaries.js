var dictionary_union = require('../common/dictionary_union.js');
var Dictionary = require('../common/Dictionary.js');
var fs = require('fs');
if(process.argv[2].slice(-5) != '.json'){
	console.log('WARNING: Dictionary should be a .json file. '+process.argv[2]+' is not .json.');
}
if (fs.existsSync(process.argv[2])){
	console.log('ERROR: File '+process.argv[2]+' is already exists.');
	process.exit(1);
}
var DictionaryUnion = new Dictionary(JSON.parse(fs.readFileSync(process.argv[3], "utf-8")));
var Dictionaries = [];
process.argv.slice(4).forEach(function (val, index, array){
	Dictionaries.push(new Dictionary(JSON.parse(fs.readFileSync(val, "utf-8"))));
});
fs.writeFile(process.argv[2], JSON.stringify(dictionary_union(DictionaryUnion, Dictionaries)), function(err){
	if(err){
		return console.log(err);
	}
});
