var pdfUtil = require('pdf-to-text');
var fs = require('fs');
//var word_ext = require('./word_ext.js');
var WordExt = require('./word_ext_match.js');
var clean_text = require('./clean_text.js');
var dictionary = {};
var dictionary_main = [];
process.argv.slice(3).forEach(function (val, index, array){
    dictionary_main.push(JSON.parse(fs.readFileSync(val, "utf-8")));
});
pdfUtil.pdfToText(process.argv[2], function(err, data) {
    if (err) throw(err);
    CleanText = clean_text(data);
    fs.writeFileSync(process.argv[2].slice(0,-4) + ".txt", CleanText, function(err){
        if(err)
            return console.log(err);
    });
    //word_ext(CleanText.toLowerCase(), dictionary);
    WordExt(data.toLowerCase(), dictionary);
    for (let i in dictionary){
        let exist = false;
        for (let j in dictionary_main){
            if (i in dictionary_main[j]) {
                exist = true;
            }
        }
        if (!exist){
            console.log(i);
        }
    }
});
