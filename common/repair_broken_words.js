var word_count = require('../common/word_count.js');
var repair_broken_words = function (dictionary) {
    for (let twoWords in dictionary.two_words) {
        var maybeUnited = twoWords.split(' ')[0] + twoWords.split(' ')[1];
        if (maybeUnited in dictionary.words && dictionary.two_words[twoWords] == 1) {
            dictionary.words[maybeUnited]++;
            dictionary.two_words[twoWords] = undefined;
        }
    }
    dictionary.total_words = word_count(dictionary.words);
    dictionary.total_two_words = word_count(dictionary.two_words);
}
module.exports = repair_broken_words;
