var pdfUtil = require('pdf-to-text');
var fs = require('fs');
//var word_ext = require('../common/word_ext.js');
var WordExt = require('../common/word_ext_match.js');
//const Performance = require('perf_hooks').performance;
var clean_text = require('../common/clean_text.js');
//var dictionary = {};
var Dictionary = {};
var counter = 0;
if(process.argv[2].slice(-5) != '.json'){
	console.log('WARNING: Dictionary should be a .json file. '+process.argv[2]+' is not .json.');
}
if (fs.existsSync(process.argv[2])){
	console.log('ERROR: File '+process.argv[2]+' is already exists.');
	process.exit(1);
}
process.argv.slice(3).forEach(function(val, index, array) {
	pdfUtil.pdfToText(val, function(err, data) {
		if (err){
			throw(err);
		}
		data = data.normalize('NFKC');
		CleanText = clean_text(data);
		fs.writeFileSync(val.slice(0,-4) + ".txt", CleanText, function(err){
			if(err)
				return console.log(err);
		});
		//let p = Performance.now();
		WordExt(data.toLowerCase(), Dictionary);
		//console.log(index,'\n',Performance.now() - p);
		//p = Performance.now();
		//word_ext(CleanText.toLowerCase(), dictionary);
		//console.log(Performance.now() - p);
		counter++;
		if (counter == process.argv.slice(3).length){
			//fs.writeFile('di1'+process.argv[2], JSON.stringify(dictionary), function(err){
			//	if(err){
			//		return console.log(err);
			//	}
			//});
			fs.writeFile(process.argv[2], JSON.stringify(Dictionary), function(err){
				if(err){
					return console.log(err);
				}
			});
		}
	});
});
