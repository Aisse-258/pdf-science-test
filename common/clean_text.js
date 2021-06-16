var clean_text = function(data) {
	let first_str_pos = 0;
	let clean_data = '';
	for (let i = 0; i < data.length; i++){
		if (data[i] == '-' && data[i+1] == '\n'){
			clean_data = clean_data + data.slice(first_str_pos, i);
			first_str_pos = i+2;
		}
		else if (data[i] == '\n' && data[i-1] != '-'){
			clean_data = clean_data + data.slice(first_str_pos, i+1);
			first_str_pos = i+1;
		}
	}
	return clean_data;
}
var clean_with_replace = function (data) {
	let clean_data = data.replace(/\s+-+\s+/g,' ^-^ ');
	clean_data = clean_data.replace(/-\s+/g,'');
	clean_data = clean_data.replace(/\s+/g,' ');
	clean_data = clean_data.replace(/\s\^-\^\s/g,' - ');
	return clean_data;
}
module.exports = {
	clean_text: clean_text,
	clean_with_replace: clean_with_replace,
};
