var childProcess = require('child_process');
var two_word_ext = require('../common/two_word_ext.js');
var fs = require('fs');
QUnit.module("Test1");
test("Extracting combinations of two words", function (){
	let str = '';
	let dict_ex = {};
	let dict_test = two_word_ext(str.toLowerCase());
	assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
	let str = 'Ощущение';
	let dict_ex = {};
	let dict_test = two_word_ext(str.toLowerCase());
	assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
	let str = 'Ощущение мира';
	let dict_ex = {
		"ощущение мира":1
	};
	let dict_test = two_word_ext(str.toLowerCase());
	assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
	let str = 'Ощущение мира, осмысленно';
	let dict_ex = {
		"ощущение мира":1
	};
	let dict_test = two_word_ext(str.toLowerCase());
	assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
	let str = 'Ощущение мира осмысленно';
	let dict_ex = {
		"ощущение мира":1, "мира осмысленно":1
	};
	let dict_test = two_word_ext(str.toLowerCase());
	assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
	childProcess.execSync('node ./cli/create_dictionary.js ./test/test1_dict.json ./test/test1.pdf');
	let dict_ex = {
		"реферат по": 1, "по математике": 1, "математике и": 1, "и философии": 1, "философии тема": 1, "почему не": 1, "не так": 1,
		"так уж": 1, "уж очевиден": 1, "очевиден двойной": 1, "двойной интеграл": 1, "рациональное число": 1,
		"число восстанавливает": 1, "восстанавливает гений": 1, "закон исключенного": 1, "исключенного третьего": 1,
		"третьего определяет": 1, "определяет эмпирический": 1, "эмпирический интеграл": 1, "интеграл по": 1,
		"по поверхности": 1, "гегельянство расточительно": 1, "расточительно представляет": 1, "представляет собой": 1,
		"собой минимум": 1, "таким образом": 1, "образом сбылась": 1, "сбылась мечта": 1, "мечта идиота": 1,
		"утверждение полностью": 1, "полностью доказано": 1
	};
	let text = fs.readFileSync('./test/test1.txt', "utf-8");
	let dict_test = two_word_ext(text.toLowerCase());
	assert.deepEqual(dict_test, dict_ex);
	childProcess.execSync('rm ./test/test1_dict.json ./test/test1.txt');
});
