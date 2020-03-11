var childProcess = require('child_process');
var n_word_ext = require('../common/n_word_ext.js');
var fs = require('fs');
QUnit.module("Test1");
childProcess.execSync('node ./cli/create_dictionary.js ./test/test1_dict.json ./test/test1.pdf');
var text = fs.readFileSync('./test/test1.txt', "utf-8");
test("Extracting combinations of n words", function (){
    let str = '';
    let dict_ex = {};
    let dict_test = n_word_ext(str.toLowerCase(), 2);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let str = 'Ощущение';
    let dict_ex = {};
    let dict_test = n_word_ext(str.toLowerCase(), 2);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let str = 'Ощущение мира';
    let dict_ex = {
        "ощущение мира":1
    };
    let dict_test = n_word_ext(str.toLowerCase(), 2);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let str = 'Ощущение мира, осмысленно';
    let dict_ex = {
        "ощущение мира":1, "мира, осмысленно":1
    };
    let dict_test = n_word_ext(str.toLowerCase(), 2);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let str = 'Ощущение мира осмысленно';
    let dict_ex = {
        "ощущение":1, "мира":1, "осмысленно":1
    };
    let dict_test = n_word_ext(str.toLowerCase(), 1);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let str = 'Ощущение мира осмысленно';
    let dict_ex = {
        "ощущение мира":1, "мира осмысленно":1
    };
    let dict_test = n_word_ext(str.toLowerCase(), 2);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let str = 'Ощущение мира осмысленно';
    let dict_ex = {
        "ощущение мира осмысленно":1
    };
    let dict_test = n_word_ext(str.toLowerCase(), 3);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let dict_ex = {
        "реферат": 1, "по": 2, "математике": 1, "и": 1, "философии": 1, "тема": 1, "почему": 1, "не": 1, "так": 1,
        "уж": 1, "очевиден": 1, "двойной": 1, "интеграл": 2, "рациональное": 1, "число": 1, "восстанавливает": 1,
        "гений": 1, "закон": 1, "исключенного": 1, "третьего": 1, "определяет": 1, "эмпирический": 1, "поверхности": 1,
        "гегельянство": 1, "расточительно": 1, "представляет": 1, "собой": 1, "минимум": 1, "таким": 1, "образом": 1,
        "сбылась": 1, "мечта": 1, "идиота": 1, "утверждение": 1, "полностью": 1, "доказано": 1
    };
    let dict_test = n_word_ext(text.toLowerCase(), 1);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let dict_ex = {
        "реферат по": 1, "по математике": 1, "математике и": 1, "и философии": 1, "философии тема": 1, "почему не": 1, "не так": 1,
        "так уж": 1, "уж очевиден": 1, "очевиден двойной": 1, "двойной интеграл": 1, "рациональное число": 1,
        "число восстанавливает": 1, "восстанавливает гений": 1, "закон исключенного": 1, "исключенного третьего": 1,
        "третьего определяет": 1, "определяет эмпирический": 1, "эмпирический интеграл": 1, "интеграл по": 1,
        "по поверхности": 1, "гегельянство расточительно": 1, "расточительно представляет": 1, "представляет собой": 1,
        "собой минимум": 1, "минимум, таким": 1, "таким образом": 1, "образом сбылась": 1, "сбылась мечта": 1, "мечта идиота": 1,
        "утверждение полностью": 1, "полностью доказано": 1
    };
    let dict_test = n_word_ext(text.toLowerCase(), 2);
    assert.deepEqual(dict_test, dict_ex);
});
test("", function (){
    let dict_ex = {
        "реферат по математике": 1, "по математике и": 1, "математике и философии": 1, "и философии тема": 1, "почему не так": 1, "не так уж": 1, "так уж очевиден": 1,
        "уж очевиден двойной": 1, "очевиден двойной интеграл": 1, "рациональное число восстанавливает": 1, "число восстанавливает гений": 1,
        "закон исключенного третьего": 1, "исключенного третьего определяет": 1, 
        "третьего определяет эмпирический": 1, "определяет эмпирический интеграл": 1, "эмпирический интеграл по": 1, "интеграл по поверхности": 1,
        "гегельянство расточительно представляет": 1, "расточительно представляет собой": 1, "представляет собой минимум": 1, "собой минимум, таким": 1, "минимум, таким образом": 1,
        "таким образом сбылась": 1, "образом сбылась мечта": 1, "сбылась мечта идиота": 1, "утверждение полностью доказано": 1
    };
    let dict_test = n_word_ext(text.toLowerCase(), 3);
    assert.deepEqual(dict_test, dict_ex);
});
try {
    childProcess.execSync('rm ./test/test1_dict.json ./test/test1.txt');
}
catch (e) {
    console.log(e);
}
