var phrases = require('./words'+process.argv[2]+'.json'),
	words = require('./words1.json');
let min_count = process.argv[3], max_count = process.argv[4] || Infinity;
let freq_sum = 0, NaN_counter=0;
for (let ph in phrases) {
	if (ph != 'total_words') {
		let ph_freq = phrases[ph]/(words.total_words + 0.);
		let ph_broke = ph.split(' '), words_freq = 1;
		//console.log(ph_broke);
		//console.log(words.total_words);
		for (let i = 0; i < ph_broke.length; i++) {
			ph_broke[i] = ph_broke[i].split(',')[0];
			words_freq *= words[ph_broke[i]]/(words.total_words + 0.);
		}
		if (!Number.isNaN(words_freq)) {
			freq_sum += ph_freq/words_freq;
			//word_log(ph, ph_freq, words_freq);
		}
		else {NaN_counter++;}
		//console.log(freq_sum);
		if (phrases[ph] >= min_count && phrases[ph] < max_count) {
			word_log(ph, ph_freq, words_freq);
		}
	}
}
function word_log(ph, ph_freq, words_freq) {
	console.log ('['+phrases[ph]+']', ph);
	console.log ('Phrase:' + ph_freq);
	console.log ('Words:' + words_freq);
}
console.log(freq_sum/(Object.keys(phrases).length-1 - NaN_counter));
