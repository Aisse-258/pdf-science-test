'use strict';

require('pdfjs-dist/build/pdf.js');
var pdfjsLib = PDFJS;
pdfjsLib.workerSrc = 'node_modules/pdfjs-dist/build/pdf.worker.js';
var pdf = require('../common/read_pdf.js');
var Dictionary = require('../common/Dictionary.js');
var dictionary_union = require('../common/dictionary_union.js');
var word_ext = require('../common/word_ext_match.js');
var two_word_ext = require('../common/two_word_ext.js');
var is_in_right_order = require('../common/is_in_right_order.js');
var is_two_compatible = require('../common/is_two_compatible.js');
var clean_text = require('../common/clean_text.js').clean_with_replace;
var extra_words = require('../common/extra_words.js');
var $ = require('jquery-with-bootstrap-for-browserify');
var MainDictionary = new Dictionary({});
var dict_info, not_in_right_order = [], not_compatible = [];
var tmp_dict = new Dictionary({});
var rare_count = 2;
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
			dictionaries.push(new Dictionary(JSON.parse(bin)));
			readFile(index+1)
		}
		reader.readAsText(file);
		reader.onloadend = function(e) {
			if (index == files.length-1){
				MainDictionary = dictionary_union(MainDictionary, dictionaries);
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
								MainDictionary.text += texts[j];
								if (j == texts.length - 1){
									word_ext(MainDictionary.text.toLowerCase(), MainDictionary.words);
									MainDictionary.two_words = two_word_ext(MainDictionary.text.toLowerCase());
									if(document.getElementById("repair-broken-words").checked) {
										MainDictionary.repair_broken_words();
									}
									else {
										MainDictionary.word_count();
									}
									MainDictionary.clean_f();
									if(document.getElementById("clean-greek").checked) {
										MainDictionary.clean_greek();
									}
								}
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

function createDictionaryTxt(files) {
	let texts = [];
	let dictionaries = [];
	var reader = new FileReader();
	function readFile(index) {
		if( index >= files.length ) {
			return;
		}
		var file = files[index];
		reader.onload = function(e) {
			var bin = e.target.result;
			texts.push(bin);
			readFile(index+1)
		}
		reader.readAsText(file);
		reader.onloadend = function(e) {
			if (index == files.length-1){
				for(let i = 0; i < texts.length; i++){
					dictionaries.push(new Dictionary({
						text: clean_text(texts[i].normalize('NFKC'))
					}));
					word_ext(dictionaries[i].text.toLowerCase(), dictionaries[i].words);
					dictionaries[i].two_words = two_word_ext(dictionaries[i].text.toLowerCase());
					if(document.getElementById("repair-broken-words").checked) {
						dictionaries[i].repair_broken_words();
					}
					else {
						dictionaries[i].word_count();
					}
					dictionaries[i].clean_f();
					if(document.getElementById("clean-greek").checked) {
						dictionaries[i].clean_greek();
					}
				}
				MainDictionary = dictionary_union(MainDictionary, dictionaries);
				fileSaveDelayed();
			}
		}
	}
	readFile(0);
}

function compareWithDictionary(file) {
	rare_count = 1 * $('#rare-less-than').val();
	tmp_dict = new Dictionary({});
	not_in_right_order = [];
	not_compatible = [];
	if (rare_count <= 0) {
		rare_count = 2;
	}
	let reader = new FileReader();
	reader.onload = function(e) {
		var bin = e.target.result;
		pdf(pdfjsLib, bin, function(text) {
			tmp_dict.text = clean_text(text.normalize('NFKC'));
			word_ext(tmp_dict.text.toLowerCase(), tmp_dict.words);
			tmp_dict.two_words = two_word_ext(tmp_dict.text.toLowerCase());
			if(document.getElementById("repair-broken-words").checked) {
				tmp_dict.repair_broken_words();
			}
			else {
				tmp_dict.word_count();
			}
			tmp_dict.clean_f();
			if(document.getElementById("clean-greek").checked) {
				tmp_dict.clean_greek();
			}
			dict_info = extra_words(tmp_dict.words, MainDictionary.words, rare_count);
			not_in_right_order = Object.keys(is_in_right_order(tmp_dict, MainDictionary));
			not_compatible = Object.keys(is_two_compatible(tmp_dict, MainDictionary));
			viewDictInfo();
		});
	}
	reader.readAsArrayBuffer(file);
}

function compareTxtWithDictionary(file) {
	rare_count = 1 * $('#rare-less-than').val();
	tmp_dict = new Dictionary({});
	not_in_right_order = [];
	not_compatible = [];
	if (rare_count <= 0) {
		rare_count = 2;
	}
	let reader = new FileReader();
	reader.onload = function(e) {
		var bin = e.target.result;
		tmp_dict.text = clean_text(bin.normalize('NFKC'));
		word_ext(tmp_dict.text.toLowerCase(), tmp_dict.words);
		tmp_dict.two_words = two_word_ext(tmp_dict.text.toLowerCase());
		if(document.getElementById("repair-broken-words").checked) {
			tmp_dict.repair_broken_words();
		}
		else {
			tmp_dict.word_count();
		}
		tmp_dict.clean_f();
		if(document.getElementById("clean-greek").checked) {
			tmp_dict.clean_greek();
		}
		dict_info = extra_words(tmp_dict.words, MainDictionary.words, rare_count);
		not_in_right_order = Object.keys(is_in_right_order(tmp_dict, MainDictionary));
		not_compatible = Object.keys(is_two_compatible(tmp_dict, MainDictionary));
		viewDictInfo();
	}
	reader.readAsText(file);
}

function compareReload () {
	rare_count = 1 * $('#rare-less-than').val();
	if (rare_count <= 0) {
		rare_count = 2;
	}
	if (document.getElementById("repair-broken-words").checked) {
		MainDictionary.repair_broken_words();
		tmp_dict.repair_broken_words();
		not_in_right_order = Object.keys(is_in_right_order(tmp_dict, MainDictionary));
		not_compatible = Object.keys(is_two_compatible(tmp_dict, MainDictionary));
	}
	if(document.getElementById("clean-greek").checked) {
		MainDictionary.clean_greek();
		tmp_dict.clean_greek();
	}
	MainDictionary.word_count();
	tmp_dict.word_count();
	dict_info = extra_words(tmp_dict.words, MainDictionary.words, rare_count);
	viewDictInfo();
}

function fileLoad() {
	// Closure to capture the file information.
	let Files = document.getElementById('file-load').files;
	let FilesPdf = [],
		FilesJSON = [],
		FilesTXT = [];
	for (let i = 0; i < Files.length; i++) {
		if (Files[i].name.slice(-4).toLowerCase() == ".pdf") {
			FilesPdf.push(Files[i]);
		}
		else if (Files[i].name.slice(-5).toLowerCase() == ".json") {
			FilesJSON.push(Files[i]);
		}
		else if (Files[i].name.slice(-4).toLowerCase() == ".txt") {
			FilesTXT.push(Files[i]);
		}
	}
	document.getElementById('span-save').innerHTML = 'Обработка...';
	if (FilesPdf[0]){
		createDictionary(FilesPdf);
	}
	if (FilesJSON[0]){
		addDictionary(FilesJSON);
	}
	if (FilesTXT[0]){
		createDictionaryTxt(FilesTXT);
	}
}

function fileLoadCompare() {
	let file = document.getElementById('file-load-compare').files[0];
	document.getElementById('compare-result').innerHTML = 'Обработка...';
	if (file.name.slice(-4) == '.pdf') {
		compareWithDictionary(file);
	}
	else if (file.name.slice(-4) == '.txt') {
		compareTxtWithDictionary(file);
	}
}
window.fileLoad = fileLoad;

document.getElementById('file-load').onchange = fileLoad;
function addToDictionary() {
	let newWord = '' + $('#add-to-dictionary').val().toLowerCase();
	let wordCount = 1 * $('#add-to-dictionary-count').val();
	if (wordCount == 0) {
		wordCount = 1;
	}
	if(newWord.split(' ').length == 1) {
		if (newWord in MainDictionary.words) {
			MainDictionary.words[newWord] += wordCount;
			MainDictionary.total_words += wordCount;
		}
		else {
			MainDictionary.words[newWord] = wordCount;
			MainDictionary.total_words += wordCount;
		}
	}
	else if (newWord.split(' ').length == 2) {
		if (newWord in MainDictionary.two_words) {
			MainDictionary.two_words[newWord] += wordCount;
			MainDictionary.total_two_words += wordCount;
		}
		else {
			MainDictionary.two_words[newWord] = wordCount;
			MainDictionary.total_two_words += wordCount;
		}
	}
	fileSave();
}

window.fileLoadCompare = fileLoadCompare;


document.getElementById('file-load-compare').onchange = fileLoadCompare;
document.getElementById('add-to-dictionary-btn').onclick = addToDictionary;
document.getElementById('compare-reload').onclick = compareReload;

function fileSave() {
	var blob = new Blob([JSON.stringify(MainDictionary)], {type: 'application/json'});
	var a = $('<a>', {
		download : 'dictionary.json',
		href : URL.createObjectURL(blob),
		html : '<button class="btn btn-default">Сохранить json-файл</button>',
		id : 'save'
	});
	document.getElementById('span-save').innerHTML = '';
	document.getElementById('span-save').appendChild(a[0]);
}

function view() {
	var str = '';
	if (Object.keys(dict_info.ExtraWords).length != 0) {
		str = '<h3>Не найдено в словаре:</h3><br><h4> Всего ' +
		Object.keys(dict_info.ExtraWords).length + '</h4><br>';
		for (let i in dict_info.ExtraWords) {
			str += i + '<br>';
		}
	}
	if (Object.keys(dict_info.RareWords).length != 0) {
		str = str + '<h3>Встречается менее ' + rare_count + ' раз:</h3><br><h4> Всего ' +
		Object.keys(dict_info.RareWords).length + '</h4><br>';
		for (let i in dict_info.RareWords) {
			str += i + '<br>';
		}
	}
	if (not_in_right_order.length != 0) {
		str += '<h3>Возможно стоят в неправильном порядке:</h3><br><h4> Всего ' +
		not_in_right_order.length + '</h4><br>' + not_in_right_order.join('<br>') + '<br>';
	}
	if (not_compatible.length != 0) {
		str += '<h3>Возможно несочетаемы:</h3><br><h4> Всего ' +
		not_compatible.length + '</h4><br>' + not_in_right_order.join('<br>') + '<br>' + not_compatible.join('<br>');
	}
	document.getElementById('compare-result').innerHTML = str;
}
function fileSaveDelayed() {
	setTimeout(fileSave, 1);
}

function viewDictInfo() {
	setTimeout(view, 1);
}
