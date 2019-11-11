var pdfUtil = require('pdf-to-text');
var fs = require('fs');
var word_ext = require('./word_ext.js');
var clean_text = require('./clean_text.js');
var dictionary = {};
process.argv.slice(3).forEach(function(val, index, array) {
	pdfUtil.pdfToText(val, function(err, data) {
		if (err) throw(err);
		CleanText = clean_text(data);
		fs.writeFileSync(val + "_text.txt", CleanText, function(err){
			if(err)
				return console.log(err);
		});
		word_ext(CleanText.toLowerCase(), dictionary);
		if (index == 0){
			if(process.argv[2].slice(-5) != '.json'){
				console.log('WARNING: Dictionary should be a .json file. '+process.argv[2]+' is not .json.');
			}
			if (fs.existsSync(process.argv[2])){
				console.log('ERROR: File '+process.argv[2]+' is already exists.');
			}
			else{
				fs.writeFile(process.argv[2], JSON.stringify(dictionary), function(err){
					if(err)
						return console.log(err);
				});
			}
		}
	});
});
