var is_two_compatible = function(current_dictionary, ex_dict) {
    let not_compatible = {};
    for (let A_B in current_dictionary.two_words) {
        if(A_B in ex_dict.two_words) {
            let A = A_B.split(' ')[0], B = A_B.split(' ')[1];
            let freq_AB = ex_dict.two_words[A_B]/ex_dict.total_two_words*1.,
                freq_A = ex_dict.words[A]/ex_dict.total_words*1.,
                freq_B = ex_dict.words[B]/ex_dict.total_words*1.;
            if(freq_AB < freq_A*freq_B) {
                not_compatible[A_B] = {
                    [A_B]: Number((freq_AB*100).toFixed(2)) + '%',
                    [A]: Number((freq_A*100).toFixed(2)) + '%',
                    [B]: Number((freq_B*100).toFixed(2)) + '%'
                }
            }
        }
    }
    return not_compatible;
}
module.exports = is_two_compatible;
