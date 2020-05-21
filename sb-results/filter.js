var phrases = [];
for (let i=1; i<11; i++) {
	phrases[i] = require('./words'+i+'.json');
}
let phrase_length = process.argv[2];
for (let ph in phrases[phrase_length]) {
	if (ph != 'total_words') {
		if (phrases[phrase_length][ph] > Math.pow(Math.log(phrases[1]['total_words']),2)) {
			console.log('['+phrases[phrase_length][ph]+']', ph);
			continue;
		}
		else if (phrases[phrase_length][ph] < Math.log(phrases[1]['total_words'])) {
			continue;
		}
		let ph_freq = phrases[phrase_length][ph]/phrases[1].total_words;//частота всей фразы
		let ph_broke = ph.split(' '), words_freq = 1;//деление фразы на слова
		let div_freq = [];
		for (let j = 1; j < Math.pow(2,phrase_length-1)-1; j++){
			div_freq[j-1] = 1;
			let comb = j.toString(2).padStart(phrase_length-1,'0');
			let ph_div = [ph_broke[0]];
			let subphrase_length = 1;
			for (let k = 1; k <= comb.length; k++) {
				if (comb[k-1] == '1') {//делить нужно
					if (ph_div[ph_div.length-1].slice(-1) === ',') {//убираем запятую у последней подстроки, если она есть
						ph_div[ph_div.length-1] = ph_div[ph_div.length-1].slice(0,-1);
					}
					ph_div.push(ph_broke[k]);//добавляем следующее слово в конец массива разбиения
					if (!Number.isNaN(phrases[subphrase_length][ph_div.slice(-1)[0]])) {
						//div_freq.push(1);
						div_freq[j-1] *= phrases[subphrase_length][ph_div.slice(-2,-1)[0]]/phrases[1].total_words;
					}
					//console.log(subphrase_length,phrases[subphrase_length][ph_div.slice(-2,-1)[0]],ph_div.slice(-2,-1)[0]);
					subphrase_length = 1;
				}
				else {//делить не нужно
					ph_div[ph_div.length-1] += ' ' + ph_broke[k];//добавляем слово в конец последней подстроки
					subphrase_length++;
				}
				if(k==comb.length && !Number.isNaN(phrases[subphrase_length][ph_div[ph_div.length-1]])) {
					//div_freq.push(1);
					//console.log(subphrase_length,phrases[subphrase_length][ph_div[ph_div.length-1]],ph_div[ph_div.length-1]);
					div_freq[j-1] *= phrases[subphrase_length][ph_div[ph_div.length-1]]/phrases[1].total_words;
				}
			}
		}
		for (let i = 0; i < ph_broke.length; i++) {//чистка слов от запятых
			ph_broke[i] = ph_broke[i].split(',')[0];
			words_freq *= phrases[1][ph_broke[i]]/phrases[1].total_words;
		}
		words_freq *= Math.log(phrases[1].total_words);
		let freq_compare = (ph_freq > words_freq);
		if (freq_compare) {
			for (let i = 0; i < div_freq.length; i++) {
				if (div_freq[i]*Math.log(phrases[1].total_words > ph_freq) {
					freq_compare = false;
					break;
				}
			}
		}
		if (freq_compare){
			console.log('['+phrases[phrase_length][ph]+']', ph);
		}
	}
}
