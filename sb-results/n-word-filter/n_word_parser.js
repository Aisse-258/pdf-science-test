var n_word_ext = require('../../common/n_word_ext.js');
var fs = require('fs');
let words = {'1':{},'2':{},'3':{},'4':{},'5':{},'6':{},'7':{},'8':{},'9':{},'10':{}};
var reg_lett = /^-?[npmlobtyjksedqwrufghzxcvмтрнжейцкгшщзхъфыплдэчьбю]-?$/,
    reg_f = /-?[θεγλψδβρω×✉★✓✄❅❈❆ǫξḋĉη�φþμøçτ△⟩ασðúœ◁▷⟨πö‖♯ςζ◊ëáêąˇ›ěÿżñìḡ◦ôˆăâò〉ẍ✚✙✣✢✤✜✛✘èîíãóæï]-?/,
    reg_s = /^\s+$/,
    reg_l1 = /^ ⃒+$/;
var unite_obj = function (ob1, ob2) {
    var ob_un = {'total_words':0};
    for (let i in ob1) {
        if (i in ob2) {
            ob_un[i] = ob1[i] + ob2[i];
            
        }
        else {
            ob_un[i] = ob1[i];
        }
    }
    for (let i in ob2) {
        if (reg_f.test(i) || reg_s.test(i) || reg_l1.test(i)) {
            delete ob2[i];
            continue;
        }
        let i_ch = i.split(' '), test = false;
        for (let j = 0;j < i_ch.length;j++){
            i_ch[j] = i_ch[j].split(',')[0];
            if (reg_lett.test(i_ch[j])) {
                test = true;
                delete ob2[i];
                break;
            }
        }
        if (!(i in ob1) && !test) {
            ob_un[i] = ob2[i];
        }
    }
    return ob_un;
};
var counter = 0;
fs.readdir('./texts-txt', function(err, items) {
	for (let i = 0; i < items.length; i++) {
		//обработка текста
		console.log('./texts-txt/' + items[i] + ' in progress..');
		counter++;
		let text = fs.readFileSync('./texts-txt/' + items[i], "utf-8");
		let j = process.argv[2];
		if (!j || j<0 || j>10) {
			console.log("Количество слов для n-словия не указано или не попадает в промежуток 1-10.");
			exit(1);
		}
		words[j] = unite_obj(words[j], n_word_ext(text, j));
		console.log('['+j+']'+counter + '/' + items.length + ' DONE');
		if (counter == items.length) {
			let total_words = 0;
			for (let ph in words[j]) {
				if (words[j][ph] < 3) {
					delete words[j][ph];
				}
				else {
					total_words += words[j][ph];
					//console.log(words[j][ph],total_words);
				}
			}
			//console.log(total_words);
			words[j]['total_words'] = total_words;
			fs.writeFile('words'+j+'.json', JSON.stringify(words[j]), function(err){
				if(err){
					return console.log(err);
				}
			});
		}
	}
});
