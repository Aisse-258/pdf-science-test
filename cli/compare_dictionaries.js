require('pdfjs-dist/build/pdf.js');
pdfjsLib = PDFJS;
pdfjsLib.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
var pdf = require('../common/read_pdf.js');
var fs = require('fs');
var Dictionary = require('../common/Dictionary.js');
var word_ext = require('../common/word_ext_match.js');
var two_word_ext = require('../common/two_word_ext.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var extra_words = require('../common/extra_words.js');
var dictionary_union = require('../common/dictionary_union.js');
var is_in_right_order = require('../common/is_in_right_order.js');
var is_two_compatible = require('../common/is_two_compatible.js');
var example_dicts = [];
var current_dict = new Dictionary();
for (let i = 0; i < process.argv.slice(4).length; i++){
	example_dicts.push(new Dictionary(JSON.parse(fs.readFileSync(process.argv.slice(4)[i], "utf-8"))));
}
if (example_dicts.length == 1) {
	example_dicts = example_dicts[0];
}
else {
	example_dicts = dictionary_union(example_dicts[0], example_dicts.slice(1));
}
if (process.argv[2].slice(-4)=='.pdf') {
	pdf(pdfjsLib, fs.readFileSync(process.argv[2]), function(text){
		current_dict.text = clean_text(text.normalize('NFKC'));
		fs.writeFileSync(process.argv[2].slice(0,-4) + ".txt", current_dict.text, function(err){
			if(err)
				return console.log(err);
		});
		word_ext(current_dict.text.toLowerCase(), current_dict.words);
		current_dict.two_words = two_word_ext(current_dict.text.toLowerCase());
		current_dict.word_count();
		current_dict.clean_f();
		current_dict.clean_greek();
		current_dict.repair_broken_words();
		let repeat_count = process.argv[3];
		let extraWords = extra_words(current_dict.words, example_dicts.words, repeat_count);
		let not_rigth_order = is_in_right_order(current_dict, example_dicts);
		let not_compatible = is_two_compatible(current_dict, example_dicts);
		console.log('Not found:', extraWords.ExtraWords);
		if(repeat_count > 0) {
			console.log('Less than '+repeat_count+' repeats:', extraWords.RareWords);
		}
		console.log('Can be not in right order:', not_rigth_order);
		console.log('Can be not compatible:', not_compatible);
		fs.writeFile(process.argv[2].slice(0,-4) + "_dict.json", JSON.stringify(current_dict), function(err){
			if(err){
				return console.log(err);
			}
		});
	});
}
else {
	current_dict.text = clean_text(fs.readFileSync(process.argv[2], 'utf-8').normalize('NFKC'));
	fs.writeFileSync(process.argv[2].slice(0,-4) + "_clean.txt", current_dict.text, function(err){
		if(err)
			return console.log(err);
	});
	word_ext(current_dict.text.toLowerCase(), current_dict.words);
	current_dict.two_words = two_word_ext(current_dict.text.toLowerCase());
	current_dict.word_count();
	current_dict.clean_f();
	current_dict.clean_greek();
	current_dict.repair_broken_words();
	let repeat_count = process.argv[3];
	let extraWords = extra_words(current_dict.words, example_dicts.words, repeat_count);
	let not_rigth_order = is_in_right_order(current_dict, example_dicts);
	let not_compatible = is_two_compatible(current_dict, example_dicts);
	console.log('Not found:', extraWords.ExtraWords);
	if(repeat_count > 0) {
		console.log('Less than '+repeat_count+' repeats:', extraWords.RareWords);
	}
	console.log('Can be not in right order:', not_rigth_order);
	console.log('Can be not compatible:', not_compatible);
	fs.writeFile(process.argv[2].slice(0,-4) + "_dict.json", JSON.stringify(current_dict), function(err){
		if(err){
			return console.log(err);
		}
	});
}
