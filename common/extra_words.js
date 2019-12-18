var extra_words = function (current_dict, example_dict, repeat_count) {
    let ext_words = {};
    let rare_words = {};
    for (let i in current_dict) {
        if (!(i in example_dict)){
            ext_words[i] = current_dict[i];
        }
        else if (example_dict[i] <= repeat_count) {
            rare_words[i] = example_dict[i];
        }
    }
    return {
        ExtraWords: ext_words,
        RareWords: rare_words
    };
}
module.exports = extra_words;
