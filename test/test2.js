var childProcess = require('child_process');
var fs = require('fs');
QUnit.module("Test1");
test("", function (){
    childProcess.execSync('node ./cli/dictionary_create.js ./test/test2_dict.json ./test/test2.pdf');
    var dict_ex = {
        "реферат": 1, "по": 2, "математике": 1, "и": 1, "философии": 1, "тема": 1, "почему": 1, "не": 1, "так": 1, "уж": 1, "очевиден": 1, "двойной": 1, "интеграл": 2,
        "рациональное": 1, "число": 1, "восстанавливает": 1, "гений": 1, "закон": 1, "исключенного": 1, "третьего": 1, "определяет": 1, "эмпирический": 1,
        "поверхности": 1, "гегельянство": 1, "расточительно": 1, "представляет": 1, "собой": 1, "минимум": 1, "таким": 1, "образом": 1, "сбылась": 1, "мечта": 1,
        "идиота": 1, "утверждение": 1, "полностью": 1, "доказано": 1
    },
    dict_test = JSON.parse(fs.readFileSync('./test/test2_dict.json', "utf-8"));
    assert.deepEqual(dict_ex, dict_test);
    childProcess.execSync('rm ./test/test2_dict.json');
}
);