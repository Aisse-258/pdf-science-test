var Dictionary = require('../common/Dictionary.js');
var fs = require('fs');
if(process.argv[2].slice(-5) != '.json'){
    console.log('WARNING: Dictionary should be a .json file. '+process.argv[2]+' is not .json.');
}
var dictionary = new Dictionary(JSON.parse(fs.readFileSync(process.argv[2], "utf-8")));
if (process.argv[3] in dictionary.words) {
    dictionary.words[process.argv[3]] += Number(process.argv[4]);
}
else {
    dictionary.words[process.argv[3]] = Number(process.argv[4]);
}
dictionary.word_count();
fs.writeFile(process.argv[2], JSON.stringify(dictionary), function(err){
    if(err){
        return console.log(err);
    }
});
