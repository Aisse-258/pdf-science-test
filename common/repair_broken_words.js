var repair_broken_words = function (dictionary) {
    for (let twoWords in dictionary.two_words) {
        var maybeUnited = twoWords.split(' ')[0] + twoWords.split(' ')[1];
        if (maybeUnited in dictionary.words && dictionary.two_words[twoWords] == 1) {
            dictionary.words[maybeUnited]++;
            dictionary.two_words[twoWords] = undefined;
        }
    }
    dictionary.word_count();
}
module.exports = repair_broken_words;
