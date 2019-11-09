var pdfUtil = require('pdf-to-text');
var fs = require('fs');
var word_ext = require('./word_ext.js');
var clean_text = require('./clean_text.js');
var dictionary = {};
process.argv.slice(2).forEach(function(val, index, array) {
	pdfUtil.pdfToText(val, function(err, data) {
		if (err) throw(err);
		CleanText = clean_text(data);
		fs.writeFileSync(val + "_text.txt", CleanText, function(err){
			if(err)
				return console.log(err);
		});
		word_ext(CleanText.toLowerCase(), dictionary);
		if (index == 0)
			fs.writeFile("dictionary.json", JSON.stringify(dictionary), function(err){
				if(err)
					return console.log(err);
			});
	});
});
