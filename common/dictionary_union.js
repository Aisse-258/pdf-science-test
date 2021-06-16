var fs = require('fs');
var dictionary_union = function(DictionaryUnion, Dictionaries){
	for (let i in Dictionaries) {
		DictionaryUnion.text = '\n' + Dictionaries[i].text;
		DictionaryUnion.total_words += Dictionaries[i].total_words;
		DictionaryUnion.total_two_words += Dictionaries[i].total_two_words;
		DictionaryUnion.total_n_words += Dictionaries[i].total_n_words;
		for (let j in Dictionaries[i].words) {
			if (j in DictionaryUnion.words){
				DictionaryUnion.words[j] += Dictionaries[i].words[j];
			}
			else {
				DictionaryUnion.words[j] = Dictionaries[i].words[j];
			}
		}
		for (let j in Dictionaries[i].two_words) {
			if (j in DictionaryUnion.two_words){
				DictionaryUnion.two_words[j] += Dictionaries[i].two_words[j];
			}
			else {
				DictionaryUnion.two_words[j] = Dictionaries[i].two_words[j];
			}
		}
		for (let j in Dictionaries[i].n_words) {
			if (j in DictionaryUnion.n_words){
				DictionaryUnion.n_words[j] += Dictionaries[i].n_words[j];
			}
			else {
				DictionaryUnion.n_words[j] = Dictionaries[i].n_words[j];
			}
		}
	}
	return DictionaryUnion;
}
module.exports = dictionary_union;
