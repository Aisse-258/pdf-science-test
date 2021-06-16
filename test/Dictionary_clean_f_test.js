var Dictionary = require('..//common/Dictionary.js');
QUnit.module("Test1");
test("Clean_f test", function (){
	let dict_test = new Dictionary({
		text: '',
		words: {
			"abc": 1, "b": 2, "w": 2, "qwe": 2
		},
		total_words: 7,
		two_words: {},
		total_two_words: 0,
		n_words: {},
		total_n_words: 0
	}),
	dict_ex = new Dictionary({
		text: '',
		words: {
			"abc": 1, "qwe": 2
		},
		total_words: 3,
		two_words: {},
		total_two_words: 0,
		n_words: {},
		total_n_words: 0
	});
	dict_test.clean_f();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), JSON.parse(JSON.stringify(dict_ex)));
});
test("", function (){
	let dict_test = new Dictionary({
		text: '',
		words: {},
		total_words: 0,
		two_words: {
			"qwe rty": 1, "qwe w": 1, "q wer": 1, "q w": 1
		},
		total_two_words: 4,
		n_words: {},
		total_n_words: 0
	}),
	dict_ex = new Dictionary({
		text: '',
		words: {},
		total_words: 0,
		two_words: {
			"qwe rty": 1
		},
		total_two_words: 1,
		n_words: {},
		total_n_words: 0
	});
	dict_test.clean_f();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), JSON.parse(JSON.stringify(dict_ex)));
});
test("", function (){
	let dict_test = new Dictionary({
		text: '',
		words: {},
		total_words: 0,
		two_words: {},
		total_two_words: 0,
		n_words: {
			"qwe rty": 1,"qwe rty qwes": 1,"qwe, rty": 1,"qwe rty, qwes": 1,
			"qwe n": 1,"qwe, n": 1,"n rty": 1,"n, rty": 1,"qwe n rty": 1,"qwe, n rty": 1,
			"qwe n, rty": 1,"qwe n,": 1
		},
		total_n_words: 12
	}),
	dict_ex = new Dictionary({
		text: '',
		words: {},
		total_words: 0,
		two_words: {},
		total_two_words: 0,
		n_words: {
			"qwe rty": 1,"qwe rty qwes": 1,"qwe, rty": 1,"qwe rty, qwes": 1
		},
		total_n_words: 4
	});
	dict_test.clean_f();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), JSON.parse(JSON.stringify(dict_ex)));
});
