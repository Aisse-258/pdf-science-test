var pdfUtil = require('pdf-to-text');
var fs = require('fs');
var WordExt = require('../common/word_ext_match.js');
var clean_text = require('../common/clean_text.js').clean_text;
var Dictionary = {};
var counter = 0;
var dictionary_create = function (files) {
    for (let i = 0; i < files.length; i++){
        pdfUtil.pdfToText(files[i], function(err, data) {
            if (err){
                throw(err);
            }
            data = data.normalize('NFKC');
            CleanText = clean_text(data);
            WordExt(data.toLowerCase(), Dictionary);
            counter++;
            if (counter == files.length){
                return {
                    dictionary: Dictionary,
                    cleanText: CleanText,
                };
            }
        });
    }
};

module.exports = dictionary_create;
