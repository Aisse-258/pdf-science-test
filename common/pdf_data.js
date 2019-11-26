const Pdf = require('../pdf-parse/lib/pdf-parse.js');

var pdf_data = function(dataBuffer, callback)
{
    Pdf(dataBuffer).then(function(contents) {
        callback(
            {
                data: contents,
                encoding: 'utf-8',
                flag: 'w',
            }
        );
    });
}
module.exports = pdf_data;
