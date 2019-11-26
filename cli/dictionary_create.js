var fs = require('fs');
var pdf = require('../common/pdf_data.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var word_ext = require('../common/word_ext_match.js');
var pdfs = [];
var texts = [];
var counter = 0;
var Dictionary = {};
if(process.argv[2].slice(-5) != '.json'){
    console.log('WARNING: Dictionary should be a .json file. '+process.argv[2]+' is not .json.');
}
if (fs.existsSync(process.argv[2])){
    console.log('ERROR: File '+process.argv[2]+' already exists.');
    process.exit(1);
}
var files = process.argv.slice(3);
for (let i = 0; i < files.length; i++){
    pdfs.push(fs.readFileSync(files[i]));
}
for (let i = 0; i < pdfs.length; i++){
    pdf(pdfs[i], function(pdfData){
        texts.push(clean_text(pdfData.data.text));
        word_ext(texts[i], Dictionary);
        counter++;
        if (counter == pdfs.length) {
            fs.writeFile(process.argv[2], JSON.stringify(Dictionary), function(err){
                if(err){
                    return console.log(err);
                }
            });
        }
    });
}
