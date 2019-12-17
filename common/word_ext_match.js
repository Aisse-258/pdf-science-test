var reg_word = /([^\s“”—–⁄′‘’`\u0001-\u002c \u005b-\u0060 \u002e-\u0040 \u00a1-\u00bf \u007b-\u007e \u20a0-\u20b0 \u2020-\u2027 \u2100-\u214f \u2190-\u2426 \u2900-\u2aff]+)/g;
var word_ext = function(data, dictionary){
    let dict = data.match(reg_word);
    for (let i = 0; i < dict.length; i++) {
        if (/^-+$/.test(dict[i])) {
            continue;
        }
        else if (dict[i][0] == '-'){
            dict[i] = dict[i].slice(1);
        }
        if (dict[i][dict[i].length-1] == '-') {
            dict[i] = dict[i].slice(0,-1) + dict[i+1];
            dict.splice(i+1,1);
        }
        if(!(dict[i] in dictionary)) {
            dictionary[dict[i]] = 1;
        }
        else if (dict[i] in dictionary){
            dictionary[dict[i]]++;
        }
    }
};
module.exports = word_ext;
