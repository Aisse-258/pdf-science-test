var Dictionary = require('..//common/Dictionary.js');
QUnit.module("Test1");
test("Repair broken words test", function (){
	let dict_test = new Dictionary({
		text: '',
		words: {
			"abc": 1, "bwqrw": 1, "qwerty": 1, "qwe": 1, "rty": 1
		},
		total_words: 5,
		two_words: {
			"abc bwqrw": 1, "qwe rty": 1
		},
		total_two_words: 2,
		n_words: {},
		total_n_words: 0
	}),
	dict_ex = new Dictionary({
		text: '',
		words: {
			"abc": 1, "bwqrw": 1, "qwerty": 2, "qwe": 1, "rty": 1
		},
		total_words: 6,
		two_words: {
			"abc bwqrw": 1
		},
		total_two_words: 1,
		n_words: {},
		total_n_words: 0
	});
	dict_test.repair_broken_words();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), JSON.parse(JSON.stringify(dict_ex)));
});
test("", function (){
	let dict_test = new Dictionary({
		text: '',
		words: {
			"abc": 1, "bwqrw": 1, "qwerty": 1, "qwe": 1, "rty": 1
		},
		total_words: 5,
		two_words: {
			"abc bwqrw": 1, "qwe rty": 4
		},
		total_two_words: 5,
		n_words: {},
		total_n_words: 0
	}),
	dict_ex = new Dictionary({
		text: '',
		words: {
			"abc": 1, "bwqrw": 1, "qwerty": 1, "qwe": 1, "rty": 1
		},
		total_words: 5,
		two_words: {
			"abc bwqrw": 1, "qwe rty": 4
		},
		total_two_words: 5,
		n_words: {},
		total_n_words: 0
	});
	dict_test.repair_broken_words();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), JSON.parse(JSON.stringify(dict_ex)));
});
test("", function (){
	let dict_test = new Dictionary({
		text: '',
		words: {
			"abc": 1, "bwqrw": 1, "qwe": 1, "rty": 1
		},
		total_words: 4,
		two_words: {
			"abc bwqrw": 1, "qwe rty": 1
		},
		total_two_words: 2,
		n_words: {},
		total_n_words: 0
	}),
	dict_ex = new Dictionary({
		text: '',
		words: {
			"abc": 1, "bwqrw": 1, "qwe": 1, "rty": 1
		},
		total_words: 4,
		two_words: {
			"abc bwqrw": 1, "qwe rty": 1
		},
		total_two_words: 2,
		n_words: {},
		total_n_words: 0
	});
	dict_test.repair_broken_words();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), JSON.parse(JSON.stringify(dict_ex)));
});
