var fs = require('fs');
var dictionary_union = function(DictionaryUnion, Dictionaries){
    for (let i in Dictionaries) {
        for (let j in Dictionaries[i]) {
            if (j in DictionaryUnion){
                DictionaryUnion[j] += Dictionaries[i][j];
            }
            else {
                DictionaryUnion[j] = Dictionaries[i][j];
            }
        }
    }
    return DictionaryUnion;
}
module.exports = dictionary_union;
