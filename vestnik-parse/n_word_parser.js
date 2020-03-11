var n_word_ext = require('./common/n_word_ext.js');
var fs = require('fs');
var pdfUtil = require('pdf-to-text');
var pdf = require('./common/read_pdf.js');
var clean_text = require('./common/clean_text.js').clean_with_replace;
let words = { '2':{}, '3':{}, '4':{}, '5':{}, '6':{}, '7':{}, '8':{}, '9':{}, '10':{} };
var reg_lett = /^[npmlobtyjksedqwrufghzxcvмтрнжейцкгшщзхъфыплдэчьбю]$/,
    reg_f = /[θεγλψδβρω×ξη�φμτασúœ◊ëáêąˇ›ěÿżḡq̇◦ôˆăâò〉✚✙✣✢✤✜✛✘èîíãóæï]/;
var unite_obj = function (ob1, ob2) {
    var ob_un = {};
    for (let i in ob1) {
        if (i in ob2) {
            ob_un[i] = ob1[i] + ob2[i];
        }
        else {
            ob_un[i] = ob1[i];
        }
    }
    for (let i in ob2) {
        if (reg_f.test(i)) {
            delete ob2[i];
            continue;
        }
        let i_ch = i.split(' '), test = false;
        for (let j = 0;j < i_ch.length;j++){
            i_ch[j] = i_ch[j].split(',')[0];
            if (reg_lett.test(i_ch[j])) {
                test = true;
                delete ob2[i];
                break;
            }
        }
        if (!(i in ob1) && !test) {
            ob_un[i] = ob2[i];
        }
    }
    return ob_un;
};
var counter = 0;
var dirs = {
    '2006': {
        '1': [],
        '2': []
    },
    '2007': {
        '1': [],
        '2': []
    },
    '2008': {
        '1': [],
        '2': []
    },
    '2009': {
        '1': [],
        '2': []
    },
    '2010': {
        '1': [],
        '2': []
    },
    '2011': {
        '1': [],
        '2': []
    },
    '2012': {
        '1': [],
        '2': []
    },
    '2013': {
        '1': [],
        '2': []
    },
    '2014': {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    },
    '2015': {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    },
    '2016': {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    },
    '2017': {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    },
    '2018': {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    },
    '2019': {
        '1': [],
        '2': [],
        '3': [],
        '4': []
    }
}
var counter = 0, file_count = 0;
for (let ydir in dirs) {
    for (let numdir in dirs[ydir]) {
        fs.readdir('vestnik/' + ydir + '/' + numdir, function(err, items) {
            file_count += items.length;
            for (let i = 0; i < items.length; i++) {/*запись текста из всех пдф-файлов в txt
                pdfUtil.pdfToText('./vestnik/' + ydir + '/' + numdir + '/' + items[i], function (err, text) {
                    if(err){
                        return console.log(err);
                    }
                    text = clean_text(text.normalize('NFKC')).toLowerCase();
                    fs.writeFile('./vestnik-txt/' + ydir + '/' + numdir + '/' + items[i].slice(0,-4) + '.txt', text, function(err){
                        if(err){
                            return console.log(err);
                        }
                    });
                });*/
                console.log(ydir + '/' + numdir + '/' + items[i].slice(0,-4) + '.txt' + ' in progress..');
                counter++;
                let text = fs.readFileSync('./vestnik-txt/' + ydir + '/' + numdir + '/' + items[i].slice(0,-4) + '.txt', "utf-8");
                let j = process.argv[2];
                //for (let j = 2; j < 11; j++) {
                    words[j] = unite_obj(words[j], n_word_ext(text, j));
                    //if (j == 10) {
                        console.log('['+j+']'+counter + '/' + file_count + ' DONE');
                    //}
                //}
                if (counter == file_count) {
                    if (counter == 873) {
                        for (let ph in words[j]) {
                            if (words[j][ph] < 3) {
                                delete words[j][ph];
                            }
                        }
                    }
                    fs.writeFile('words'+j+'.json', JSON.stringify(words[j]), function(err){
                        if(err){
                            return console.log(err);
                        }
                    });
                }
            }
        });
    }
}
