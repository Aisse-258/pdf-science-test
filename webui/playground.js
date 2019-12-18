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
var word_count = require('../common/word_count.js');
var $ = require('jquery-with-bootstrap-for-browserify');
var MainDictionary = new Dictionary({});
var dict_info;
var tmp_dict = new Dictionary({});
var rare_count = 0;
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
								word_ext(texts[j].toLowerCase(), MainDictionary.words);
								MainDictionary.total_words = word_count(MainDictionary.words);
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
	rare_count = 1 * $('#rare-less-than').val();
	if (rare_count == 0) {
		rare_count = 2;
	}
	let reader = new FileReader();
	reader.onload = function(e) {
		var bin = e.target.result;
		pdf(pdfjsLib, bin, function(text) {
			tmp_dict.text = clean_text(text.normalize('NFKC'));
			word_ext(tmp_dict.text.toLowerCase(), tmp_dict.words);
			dict_info = extra_words(tmp_dict.words, MainDictionary.words, rare_count);
			viewDictInfo();
		});
	}
	reader.readAsArrayBuffer(file);
}

function compareReload () {
	rare_count = 1 * $('#rare-less-than').val();
	dict_info = extra_words(tmp_dict.words, MainDictionary.words, rare_count);
	viewDictInfo();
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
	if (FilesPdf[0]){
		createDictionary(FilesPdf);
	}
	if (FilesJSON[0]){
		addDictionary(FilesJSON);
	}
}

function fileLoadCompare() {
	let file = document.getElementById('file-load-compare').files[0];
	compareWithDictionary(file);
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
	var str = '<h3>Не найдено в словаре:</h3><br>';
	for (let i in dict_info.ExtraWords) {
		str = str + i + '<br>';
	}
	if (rare_count > 0) {
	str = str + '<h3>Встречается менее ' + rare_count + ' раз:</h3><br>';
	for (let i in dict_info.RareWords) {
		str = str + i + '<br>';
	}
	}
	document.getElementById('compare-result').innerHTML = str;
}
function fileSaveDelayed() {
	setTimeout(fileSave, 1);
}

function viewDictInfo() {
	setTimeout(view, 1);
}
