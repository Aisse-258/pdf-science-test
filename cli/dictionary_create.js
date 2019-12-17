require('pdfjs-dist/build/pdf.js');
pdfjsLib = PDFJS;
pdfjsLib.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
var pdf = require('../common/read_pdf.js');
var fs = require('fs');
var Dictionary = require('../common/Dictionary.js');
var word_ext = require('../common/word_ext_match.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var dictionary = new Dictionary();
var counter = 0;
var dictionary_create = function (files, dictionary_name) {
    if(dictionary_name.slice(-5) != '.json'){
        console.log('WARNING: Dictionary should be a .json file. '+dictionary_name+' is not .json.');
    }
    if (fs.existsSync(dictionary_name)){
        console.log('ERROR: File '+dictionary_name+' is already exists.');
        process.exit(1);
    }
    for (let i = 0; i < files.length; i++){
        pdf(pdfjsLib, fs.readFileSync(files[i]), function(text){
            dictionary.text = clean_text(text.normalize('NFKC'));
            fs.writeFileSync(files[i].slice(0,-4) + ".txt", dictionary.text, function(err){
                if(err)
                    return console.log(err);
            });
            word_ext(dictionary.text.toLowerCase(), dictionary.words);
            counter++;
            if (counter == files.length){
                fs.writeFile(dictionary_name, JSON.stringify(dictionary), function(err){
                    if(err){
                        return console.log(err);
                    }
                });
            }
        });
    }
}
dictionary_create(process.argv.slice(3), process.argv[2]);
