var fs = require('fs');
if(process.argv[2].slice(-5) != '.json'){
	console.log('WARNING: Dictionary should be a .json file. '+process.argv[2]+' is not .json.');
}
if (fs.existsSync(process.argv[2])){
	console.log('ERROR: File '+process.argv[2]+' is already exists.');
	process.exit(1);
}
var dictionaries = [];
var dictionary_union = JSON.parse(fs.readFileSync(process.argv[3], "utf-8"));
process.argv.slice(4).forEach(function (val, index, array){
    dictionaries.push(JSON.parse(fs.readFileSync(val, "utf-8")));
});
for (let i in dictionaries) {
    for (let j in dictionaries[i]) {
        if (j in dictionary_union){
            dictionary_union[j] += dictionaries[i][j];
        }
        else {
            dictionary_union[j] = dictionaries[i][j];
        }
    }
}
fs.writeFile(process.argv[2], JSON.stringify(dictionary_union), function(err){
    if(err){
        return console.log(err);
    }
});