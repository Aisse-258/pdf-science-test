var tex = require('tex-lint/common/Nodes.js');
var get_formula = require('tex-lint/common/Nodes_get_formula.js');
var tex_cleaner = function(data) {
	var clean_data = new tex.Nodes(data);
	for(let i = clean_data.nodes.length-1;i > -1 ;i--){//убираем комментарии
		if(clean_data.nodes[i].type == 'comment') {
			clean_data.nodes.splice(i,1);
		}
	}
	for (let i = 0;i < clean_data.nodes.length-4;i++) {//убираем преамбулу
		if (clean_data.nodes[i].text + clean_data.nodes[i+1].text +
			clean_data.nodes[i+2].text + clean_data.nodes[i+3].text == '\\begin{document}') {
			clean_data.nodes.splice(0,i+4);
			break;
		}
	}
	for(let i = clean_data.nodes.length-1;i > 4;i--) {//убираем хвост
		if (clean_data.nodes[i-3].text + clean_data.nodes[i-2].text +
			clean_data.nodes[i-1].text + clean_data.nodes[i].text == '\\end{document}') {
			clean_data.nodes.splice(i-3,clean_data.nodes.length-i+2);
			break;
		}
	}
	let formulaIndexes = {begin: 0, end: 0};
	for(let i = clean_data.nodes.length-1;i > -1;i--) {//убираем формулы в $F$
		if(clean_data.isInside$(i,true) && !clean_data.isInside$(i+1,true)){
			formulaIndexes.end = i;
		}
		else if(clean_data.isInside$(i,true) && !clean_data.isInside$(i-1,true)){
			formulaIndexes.begin = i;
			clean_data.nodes.splice(formulaIndexes.begin,formulaIndexes.end-formulaIndexes.begin+1,{text:'FFFF',type:null});
			//console.log(formulaIndexes)
		}
	}
	for(let i = clean_data.nodes.length-1;i > -1;i--) {//убираем формулы в $$F$$
		if(clean_data.isInside$$(i,true) && !clean_data.isInside$$(i+1,true)){
			formulaIndexes.end = i;
		}
		else if(clean_data.isInside$$(i,true) && !clean_data.isInside$$(i-1,true)){
			formulaIndexes.begin = i;
			clean_data.nodes.splice(formulaIndexes.begin,formulaIndexes.end-formulaIndexes.begin+1,{text:'FFFFFF',type:null});
		}
	}
	for(let i = clean_data.nodes.length-5;i > -1;i--){//убираем формулы в equation
		if(clean_data.nodes[i].text + clean_data.nodes[i+1].text +
			clean_data.nodes[i+2].text + clean_data.nodes[i+3].text == '\\end{equation}'
			||
			clean_data.nodes[i].text + clean_data.nodes[i+1].text +
			clean_data.nodes[i+2].text + clean_data.nodes[i+3].text + clean_data.nodes[i+4].text == '\\end{equation*}') {
			formulaIndexes.end = i+3;
		}
		else if(clean_data.nodes[i].text + clean_data.nodes[i+1].text +
			clean_data.nodes[i+2].text + clean_data.nodes[i+3].text == '\\begin{equation}'
			||
			clean_data.nodes[i].text + clean_data.nodes[i+1].text +
			clean_data.nodes[i+2].text + clean_data.nodes[i+3].text + clean_data.nodes[i+4].text == '\\begin{equation*}'){
			formulaIndexes.begin = i;
			clean_data.nodes.splice(formulaIndexes.begin,formulaIndexes.end-formulaIndexes.begin+1,{text:'FFFFFF',type:null});
		}
	}
	for(let i = clean_data.nodes.length-1;i > 1;i--){//удаляем квадратные скобки с опциями
		if(clean_data.nodes[i].text == '[' && (clean_data.nodes[i-1].type == 'tag' || clean_data.nodes[i-1].text == '}')) {
			let j = i+2;
			for(;clean_data.nodes[j].text != ']';j++){}
			clean_data.nodes.splice(i,j-i+1);
		}
	}
	var tagsWithOption = ['\\begin', '\\label','\\includegraphics','\\includepdf','\\setcounter','\\input','\\cite','\\ref','\\end','\\parbox','\\selectlanguage','\\eqref','\\bibitem','\\href','\\nolinkurl'];
	for(let i = clean_data.nodes.length-2;i > -1;i--){//удаляем теги с одним техническим параметром
		if(tagsWithOption.indexOf(clean_data.nodes[i].text) != -1 && clean_data.nodes[i+1].text == '{') {
			let j = i+2;
			for(;clean_data.nodes[j].text != '}';j++){}
			clean_data.nodes.splice(i,j-i+1);
		}
	}
	var tagsWithTwoOptions = ['\\multicolumn','\\setlength'];
	for(let i = clean_data.nodes.length-2;i > -1;i--){//удаляем теги с двумя техническими параметрами
		if(tagsWithTwoOptions.indexOf(clean_data.nodes[i].text) != -1 && clean_data.nodes[i+1].text == '{') {
			let j = i+2, bracketCount = 0;
			for(;bracketCount != 2;j++){
				if(clean_data.nodes[j].text == '}') {
					bracketCount++;
				}
			}
			clean_data.nodes.splice(i,j-i+1);
		}
	}

	for(let i = clean_data.nodes.length-1;i > -1 ;i--){//убираем оставшиеся теги и скобки
		if(clean_data.nodes[i].type == 'tag' || clean_data.nodes[i].type == 'bracket') {
			clean_data.nodes.splice(i,1);
		}
		else if(clean_data.nodes[i].text == '\t' || clean_data.nodes[i].text == '~' || clean_data.nodes[i].type == 'linebreak') {
			clean_data.nodes.splice(i,1,{text:' ',type:'space'});
		}
	}
	//console.log(clean_data)
	//console.log(clean_data.nodes.length)
	var cleanDataStr = '';
	clean_data.nodes.forEach(
		function (item,index,array)
		{
			cleanDataStr += item.text;
		}
	);
	cleanDataStr = cleanDataStr.replace(/\s+/g,' ');
	return cleanDataStr;
}
module.exports = tex_cleaner;
