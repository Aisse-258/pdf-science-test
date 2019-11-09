var reg_letter = /[^\d\s.,“”""''<>…|&√\^=_↔«»\\\/()@#\[\]—{}–\*$№/+%:;!‘’`\?]/;
var first_str_pos = 0;
var clean_text = function(data) {
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
module.exports = clean_text;
