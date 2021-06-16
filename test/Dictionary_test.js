var Dictionary = require('..//common/Dictionary.js');
QUnit.module("Test1");
test("Constructor test", function (){
	let dict_ex = {
		text: '',
		words: {},
		total_words: 0,
		two_words: {},
		total_two_words: 0,
		n_words: {},
		total_n_words: 0
	};
	let dict_test = new Dictionary();
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), dict_ex);
});
test("", function (){
	let dict_ex = {
		text: 'Hello world!',
		words: {'hello': 1, 'world': 1},
		total_words: 2,
		two_words: {'hello world': 1},
		total_two_words: 1,
		n_words: {},
		total_n_words: 0
	};
	let dict_test = new Dictionary({
		text: 'Hello world!',
		words: {'hello': 1, 'world': 1},
		total_words: 2,
		two_words: {'hello world': 1},
		total_two_words: 1,
		n_words: {},
		total_n_words: 0
	});
	assert.deepEqual(JSON.parse(JSON.stringify(dict_test)), dict_ex);
});
