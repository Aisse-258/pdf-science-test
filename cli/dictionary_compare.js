require('pdfjs-dist/build/pdf.js');
pdfjsLib = PDFJS;
pdfjsLib.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
var pdf = require('../common/read_pdf.js');
var fs = require('fs');
var word_ext = require('../common/word_ext_match.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var extra_words = require('../common/extra_words.js');
var example_dicts = [];
var current_dict = {};
for (let i = 0; i < process.argv.slice(4).length; i++){
    example_dicts.push(JSON.parse(fs.readFileSync(process.argv.slice(4)[i], "utf-8")));
}
pdf(pdfjsLib, fs.readFileSync(process.argv[2]), function(text){
    text = clean_text(text.normalize('NFKC'));
    fs.writeFileSync(process.argv[2].slice(0,-4) + ".txt", text, function(err){
        if(err)
            return console.log(err);
    });
    word_ext(text.toLowerCase(), current_dict);
    let repeat_count = process.argv[3];
    let extraWords = extra_words(current_dict, example_dicts, repeat_count);
    console.log('Not found:', extraWords.ExtraWords);
    if(repeat_count > 0) {
        console.log('Less than '+repeat_count+' repeats:', extraWords.RareWords);
    }
    fs.writeFile(process.argv[2].slice(0,-4) + "_dict.json", JSON.stringify(current_dict), function(err){
        if(err){
            return console.log(err);
        }
    });
});
