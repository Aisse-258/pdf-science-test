'use strict';

require('pdfjs-dist/build/pdf.js');
var pdfjsLib = PDFJS;
pdfjsLib.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
var pdf = require('../common/read_pdf.js');
var dictionary_union = require('../common/dictionary_union.js');
var word_ext = require('../common/word_ext_match.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var dictionary_compare = require('../common/extra_words.js');
var $ = require('jquery-with-bootstrap-for-browserify');
var Dictionary = {};
var dict_info;
var rare_count = 0;
var div = $(document.getElementById('compare-result'));
function addDictionary(files) {
	let dictionaries = [];
	var reader = new FileReader();  
	function readFile(index) {
		if( index >= files.length ) {
			return;
		}
		var file = files[index];
		reader.onload = function(e) {
			var bin = e.target.result;
			dictionaries.push(JSON.parse(bin));
			readFile(index+1)
		}
		reader.readAsText(file);
		reader.onloadend = function(e) {
			if (index == files.length-1){
				Dictionary = dictionary_union(Dictionary, dictionaries);
				fileSaveDelayed();
			}
		}
	}
	readFile(0);
}

function createDictionary (files) {
	let pdfs = [];
	let texts = [];
	let reader = new FileReader();
	function readFile(index) {
		if( index >= files.length ) {
			return;
		}
		var file = files[index];
		reader.onload = function(e) {
			var bin = e.target.result;
			pdfs.push(bin);
			readFile(index+1)
		}
		reader.readAsArrayBuffer(file);
		reader.onloadend = function(e) {
			if (index == files.length-1){
				for (let i = 0; i < pdfs.length; i++){
					pdf(pdfjsLib, pdfs[i], function(text){
						texts[i] = clean_text(text.normalize('NFKC'));
						if (i == pdfs.length-1){
							//внешний цикл проходит элементы по два раза, пока фиксим так
							for(let j = 0; j < texts.length; j++){
								word_ext(texts[j].toLowerCase(), Dictionary);
							}
							fileSaveDelayed();
						}
					});
				}
			}
		}
	}
	readFile(0);
}

function compareWithDictionary(file) {
	let tmp_dict = {};
	rare_count = 1 * $('#rare-less-than').val();
	let reader = new FileReader();
	reader.onload = function(e) {
		var bin = e.target.result;
		pdf(pdfjsLib, bin, function(text) {
			text = clean_text(text.normalize('NFKC'));
			word_ext(text.toLowerCase(), tmp_dict);
			dict_info = dictionary_compare(tmp_dict, [Dictionary], rare_count);
			codeViewDictInfo();
		});
	}
	reader.readAsArrayBuffer(file);
}

}

function fileLoad() {
	// Closure to capture the file information.
	let Files = document.getElementById('file-load').files;
	let FilesPdf = [],
		FilesJSON = [];
	for (let i = 0; i < Files.length; i++) {
		if (Files[i].name.slice(-4).toLowerCase() == ".pdf") {
			FilesPdf.push(Files[i]);
		}
		else if (Files[i].name.slice(-5).toLowerCase() == ".json") {
			FilesJSON.push(Files[i]);
		}
	}
	if (FilesPdf){
		createDictionary(FilesPdf);
	}
	if (FilesJSON){
		addDictionary(FilesJSON);
	}
}
function codeLoadCompare() {
	let file = document.getElementById('file-load-compare').files[0];
	compareWithDictionary(file);
}
window.fileLoad = fileLoad;
window.codeLoadCompare = codeLoadCompare;

document.getElementById('file-load').onchange = fileLoad;
document.getElementById('file-load-compare').onchange = codeLoadCompare;



function fileSave() {
	var blob = new Blob([JSON.stringify(Dictionary)], {type: 'application/json'});
	var a = $('<a>', {
		download : 'dictionary.json',
		href : URL.createObjectURL(blob),
		html : '<button class="btn btn-default">Сохранить json-файл</button>',
		id : 'save'
	});
	document.getElementById('span-save').innerHTML = '';
	document.getElementById('span-save').appendChild(a[0]);
}

function codeView() {
	var str = '<h3>Не найдено в словаре:</h3><br>';
	for (let i in dict_info.ExtraWords) {
		str = str + i + '<br>';
	}
	str = str + '<h3>Встречается менее ' + rare_count + ' раз:</h3><br>';
	for (let i in dict_info.RareWords) {
		str = str + i + '<br>';
	}
	document.getElementById('compare-result').innerHTML = str;
}
function fileSaveDelayed() {
	setTimeout(fileSave, 1);
}

function codeViewDictInfo() {
	setTimeout(codeView, 1);
}
/*var myCodeMirror = CodeMirror(document.getElementById('code-mirror-holder'), {
	lineNumbers: true,
});

myCodeMirror.on('change', codeSaveDelayed);
document.getElementById('file-save-encoding').onchange = codeSave;

function getNodesAsIs() {
	return new Nodes(myCodeMirror.getValue());
}

function checkRules(rulesetName, nodesObject) {
	console.time('checkRules()');
	HTMLreport.createHTMLreport({
		rulesetName: rulesetName,
		nodesObject: nodesObject,
		targetElement: document.getElementById('result-container'),
		editor: myCodeMirror,
		getNodes: getNodesAsIs,
		recheck: runcheck,
	});
	console.timeEnd('checkRules()');
}

function runcheck() {
	console.time('runcheck()');
	var nodesObject = getNodesAsIs();
	checkRules(hashOptions.ruleset, nodesObject);
	console.timeEnd('runcheck()');
}
*/
//document.getElementById('file-load').onchange = codeLoad;
/*
document.getElementById('runcheck').onclick = runcheck;

var hashOptions = JSONfromHash.getHashAsObject({
	defaults: {
		ruleset: 'defaultSet',
	},
});

function switchToRuleset(ruleset) {
	hashOptions.ruleset = ruleset;
	document.getElementById('ruleset-info').href = rulesets[ruleset].url;
	document.getElementById('ruleset-info').innerHTML = rulesets[ruleset].title;
	document.getElementById('ruleset-comment').innerHTML = rulesets[ruleset].comment;

	if (rulesets[ruleset].examples && rulesets[ruleset].examples.length) {
		var optionsString = '';
		var examples = rulesets[ruleset].examples;
		for (var i = 0; i < examples.length; i++) {
			optionsString += '<option value="' + i + '">' + examples[i].title + '</option>';
		}
		document.getElementById('tex-examples-list').innerHTML = optionsString;
	} else {
		document.getElementById('tex-examples').style.display = 'none';
	}
}

switchToRuleset(hashOptions.ruleset);

document.getElementById('paste-example').onclick = pasteExample;

function pasteExample() {
	var exampleNumber = document.getElementById('tex-examples-list').value;
	myCodeMirror.setValue(
		texExamples[
			rulesets[hashOptions.ruleset].examples[exampleNumber].source
		]
	);
}
*/

// То, что должно торчать наружу для тестирования и отладки
window.exportedControls = {
	// Данные
	//texExampless: texExamples,
	//rulesets: rulesets,
	//hashOptions: hashOptions,

	// Объект CodeMirror
	//myCodeMirror: myCodeMirror,

	// Функции
	//runcheck: runcheck,
	//checkRules: checkRules,
	//switchToRuleset: switchToRuleset,
	//pasteExample: pasteExample,
};
