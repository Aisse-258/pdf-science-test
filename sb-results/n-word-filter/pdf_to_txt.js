var fs = require('fs');
var pdfUtil = require('pdf-to-text');
var clean_text = require('../../common/clean_text.js').clean_with_replace;
fs.readdir('./texts-pdf', function(err, items) {
	for (let i = 0; i < items.length; i++) {//запись текста из всех пдф-файлов в txt
		pdfUtil.pdfToText('./texts-pdf/' + items[i], function (err, text) {
			if(err){
				return console.log(err);
			}
			text = clean_text(text.normalize('NFKC')).toLowerCase();
			fs.writeFile('./texts-txt/' + items[i] + '.txt', text, function(err){
				if(err){
					return console.log(err);
				}
			});
		});
	}
});
