var reg_two_words = /([^\s“”—–⁄′‘’`\u0001-\u002c \u005b-\u0060 \u002e-\u0040 \u00a1-\u00bf \u007b-\u007e \u20a0-\u20b0 \u2020-\u2027 \u2100-\u214f \u2190-\u2426 \u2900-\u2aff]+\s[^\s“”—–⁄′‘’`\u0001-\u002c \u005b-\u0060 \u002e-\u0040 \u00a1-\u00bf \u007b-\u007e \u20a0-\u20b0 \u2020-\u2027 \u2100-\u214f \u2190-\u2426 \u2900-\u2aff]+)/g;
var two_word_ext = function(data){
    let matches = {}, found;
    while (found = reg_two_words.exec(data)) {
        if (!/^-+\s/.test(found[0]) && !/\s-+$/.test(found[0])) {
            if (found[0] in matches) {
                matches[found[0]]++;
            }
            else {
                matches[found[0]] = 1;
            }
        }
        reg_two_words.lastIndex -= found[0].split(' ')[1].length;
    }
    return matches;
};
module.exports = two_word_ext;
