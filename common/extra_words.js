var dictionary_union = require('./dictionary_union.js');
var extra_words = function (current_dict, example_dicts, repeat_count) {
    let ext_words = {};
    let rare_words = {};
    let example_dict = {};
    if (example_dicts.length == 1) {
        example_dict = example_dicts[0];
    }
    else {
        example_dict = dictionary_union(example_dicts[0], example_dicts.slice(1));
    }
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
