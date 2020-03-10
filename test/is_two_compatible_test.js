var Dictionary = require('..//common/Dictionary.js');
var is_two_compatible = require('../common/is_two_compatible.js');
QUnit.module("Test1");
test("Is_two_compatible test", function (){
    let dict_test = new Dictionary({
        text: '',
        words: {
            "abc": 1, "b": 2, "w": 2, "qwe": 2, "a": 2, "v":4, "s": 10, "d": 6
        },
        total_words: 7,
        two_words: {
            "a b": 2, "v s": 4, "d s":6, "qwe abc": 1
        },
        total_two_words: 13,
        n_words: {},
        total_n_words: 0
    }),
    dict_ex = new Dictionary({
        text: '',
        words: {
            "a": 20, "b": 43, "v": 12, "s": 10, "d": 6, "qw": 5, "eee": 4
        },
        total_words: 100,
        two_words: {
            "a b": 2, "v s": 10, "d s":6, "qw eee": 4, "v qw": 2, "eee a": 4
        },
        total_two_words: 28,
        n_words: {},
        total_n_words: 0
    })
    res = {
        "a b": {
            "a b": "7.14%",
            "a": "20%",
            "b": "43%"
        }
    };
    assert.deepEqual(is_two_compatible(dict_test, dict_ex), res);
});
/*test("", function (){
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
});*/
