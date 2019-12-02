'use strict';

require('pdfjs-dist/build/pdf.js');
var pdfjsLib = PDFJS;
pdfjsLib.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
var pdf = require('../common/read_pdf.js');
var dictionary_union = require('../common/dictionary_union.js');
var word_ext = require('../common/word_ext_match.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var $ = require('jquery-with-bootstrap-for-browserify');
var DictionaryUnion;
var dictionaries = [];
var pdfs = [];
var texts = [];
var Dictionary = {};
function uniteDictionaries(files, dictionaries) {
	var reader = new FileReader();  
	function readFile(index) {
		if( index >= files.length ) return;
		var file = files[index];
		reader.onload = function(e) {
			var bin = e.target.result;
			dictionaries.push(JSON.parse(bin));
			readFile(index+1)
		}
		reader.readAsText(file);
		reader.onloadend = function(e) {
			if (index == files.length-1){
				DictionaryUnion = dictionary_union(dictionaries[0], dictionaries.slice(1));
				codeSaveDelayedJSON();
			}
		}
	}
	readFile(0);
}

function createDictionary (files) {
	var reader = new FileReader();  
	function readFile(index) {
		if( index >= files.length ) return;
		var file = files[index];
		reader.onload = function(e) {
			var bin = e.target.result;
			pdfs.push(bin);
			readFile(index+1)
		}
		reader.readAsDataURL(file);
		reader.onloadend = function(e) {
			if (index == files.length-1){
				
				let counter = 0;
				for (let i = 0; i < pdfs.length; i++){
					pdf(pdfjsLib, pdfs[i], function(text){
						counter++;
						texts.push(clean_text(text.normalize('NFKC')));
						word_ext(texts[i].toLowerCase(), Dictionary);
						if (counter == pdfs.length){
							codeSaveDelayedPDF();
						}
					});
				}
			}
		}
	}
	readFile(0);
}

function codeLoadPDF() {
	// Closure to capture the file information.
	var FilesPdf = document.getElementById('file-load-pdf').files;
	createDictionary(FilesPdf);
}
function codeLoadJSON() {
	// Closure to capture the file information.
	var FilesJSON = document.getElementById('file-load-json').files;
	uniteDictionaries(FilesJSON, dictionaries);
}
window.codeLoadPDF = codeLoadPDF;
window.codeLoadJSON = codeLoadJSON;

document.getElementById('file-load-pdf').onchange = codeLoadPDF;
document.getElementById('file-load-json').onchange = codeLoadJSON;

function codeSavePDF() {
	var blob = new Blob([JSON.stringify(Dictionary)], {type: 'application/json'});
	var div = $('<div>', {
		style : "border: 1px black solid; padding:5px; height: 200px; overflow:scroll;",
		text : JSON.stringify(Dictionary)
	});
	var a = $('<a>', {
		download : 'dictionary.json',
		href : URL.createObjectURL(blob),
		html : '<button class="btn btn-default">Сохранить json-файл</button>',
		id : 'save'
	});
	document.getElementById('span-save').innerHTML = '';
	document.getElementById('span-save').appendChild(a[0]).after(div[0]);
}

function codeSaveJSON() {
	var blob = new Blob([JSON.stringify(Dictionary)], {type: 'application/json'});
	var div = $('<div>', {
		style : "border: 1px black solid; padding:5px; height: 200px; overflow:scroll;",
		text : JSON.stringify(DictionaryUnion)
	});
	var a = $('<a>', {
		download : 'dictionary-union.json',
		href : URL.createObjectURL(blob),
		html : '<button class="btn btn-default">Сохранить json-файл</button>',
		id : 'save'
	});
	document.getElementById('span-save').innerHTML = '';
	document.getElementById('span-save').appendChild(a[0]).after(div[0]);
}
function codeSaveDelayedPDF() {
	setTimeout(codeSavePDF, 1);
}

function codeSaveDelayedJSON() {
	setTimeout(codeSaveJSON, 1);
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
