var extra_words = function (current_dict, example_dicts, repeat_count) {
    let ext_words = {};
    let rare_words = {};
    for (let i in current_dict) {
        let exist = false;
        for (let j in example_dicts){
            if (i in example_dicts[j]) {
                exist = true;
            }
        }
        if (!exist){
            ext_words[i] = current_dict[i];
        }
        else if (current_dict[i] <= repeat_count) {
            rare_words[i] = current_dict[i];
        }
    }
    return {
        ExtraWords: ext_words,
        RareWords: rare_words
    };
}
module.exports = extra_words;
