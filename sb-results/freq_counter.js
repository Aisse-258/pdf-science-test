var phrases = [];
for (let i=1; i<11; i++) {
	phrases[i] = require('./words'+i+'.json');
}
let min_count = process.argv[3], max_count = process.argv[4] || Infinity;
for (let ph in phrases[process.argv[2]]) {
	if (ph != 'total_words') {
		let ph_freq = phrases[process.argv[2]][ph]/(phrases[1].total_words + 0.);//частота всей фразы
		let ph_broke = ph.split(' '), words_freq = 1;//деление фразы на слова
		let div_freq = [];
		for (let j = 1; j < Math.pow(2,process.argv[2]-1)-1; j++){
			div_freq[j-1] = 1;
			let comb = j.toString(2).padStart(process.argv[2]-1,'0');
			let ph_div = [ph_broke[0]];
			let counter = 1;
			for (let k = 1; k <= comb.length; k++) {
				if (comb[k-1] == '1') {//делить нужно
					if (ph_div[ph_div.length-1].slice(-1) === ',') {//убираем запятую у последней подстроки, если она есть
						ph_div[ph_div.length-1] = ph_div[ph_div.length-1].slice(0,-1);
					}
					ph_div.push(ph_broke[k]);//добавляем следующее слово в конец массива разбиения
					if (!Number.isNaN(phrases[counter][ph_div.slice(-1)[0]])) {
						//div_freq.push(1);
						div_freq[j-1] *= phrases[counter][ph_div.slice(-2,-1)[0]]/(phrases[counter].total_words+0.);
					}
					//console.log(counter,phrases[counter][ph_div.slice(-2,-1)[0]],ph_div.slice(-2,-1)[0]);
					counter = 1;
				}
				else {//делить не нужно
					ph_div[ph_div.length-1] += ' ' + ph_broke[k];//добавляем слово в конец последней подстроки
					counter++;
				}
				if(k==comb.length && !Number.isNaN(phrases[counter][ph_div[ph_div.length-1]])) {
					//div_freq.push(1);
					//console.log(counter,phrases[counter][ph_div[ph_div.length-1]],ph_div[ph_div.length-1]);
					div_freq[j-1] *= phrases[counter][ph_div[ph_div.length-1]]/(phrases[counter].total_words+0.);
				}
			}
			/*if (phrases[process.argv[2]][ph]>min_count && phrases[process.argv[2]][ph] <= max_count){
				console.log(ph_div);
			}*/
		}
		for (let i = 0; i < ph_broke.length; i++) {//чистка слов от запятых
			ph_broke[i] = ph_broke[i].split(',')[0];
			words_freq *= phrases[1][ph_broke[i]]/(phrases[1].total_words + 0.);
		}
		let sh = (ph_freq > words_freq);
		if (sh) {
			for (let i = 0; i < div_freq.length; i++) {
				if (div_freq[i] > ph_freq) {
					sh = false;
					break;
				}
			}
		}
		if (phrases[process.argv[2]][ph]>min_count && phrases[process.argv[2]][ph] <= max_count && sh){
			console.log('['+phrases[process.argv[2]][ph]+']', ph);
		}
	}
}
