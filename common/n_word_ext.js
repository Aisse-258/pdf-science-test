var reg_word = '[^\\s“”—–⁄′‘’`\\u0001-\\u002c \\u005b-\\u0060 \\u002e-\\u0040 \\u00a1-\\u00bf \\u007b-\\u007e \\u20a0-\\u20b0 \\u2020-\\u2027 \\u2100-\\u214f \\u2190-\\u2426 \\u2900-\\u2aff]+';
var n_word_ext = function(data, word_count){
	let matches = {}, found, regWord = reg_word;
	if (word_count > 1) {
		regWord += ',?';
	}
	let reg_n_word = regWord;
	for (let i = 1; i < word_count; i++) {
		reg_n_word += '\\s' + regWord;
		if (i == word_count - 1 && word_count > 1) {
			reg_n_word = reg_n_word.slice(0,-2);
		}
	}
	reg_n_word = new RegExp('('+reg_n_word+')', 'g');
	while (found = reg_n_word.exec(data)) {
		if (!/^-+\s/.test(found[0]) && !/\s-+$/.test(found[0]) && !/\s-+\s/.test(found[0]) && !/^-+$/.test(found[0])) {
			if (found[0] in matches) {
				matches[found[0]]++;
			}
			else {
				matches[found[0]] = 1;
			}
		}
		if (word_count > 1){
			reg_n_word.lastIndex -= found[0].length - found[0].indexOf(' ');
		}
	}
	return matches;
};
module.exports = n_word_ext;
