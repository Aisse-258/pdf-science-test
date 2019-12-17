var is_two_compatible = function(dictionary) {
    let not_compatible = {};
    for (let A_B in dictionary.two_words) {
        let A = A_B.split(' ')[0], B = A_B.split(' ')[1];
        let freq_AB = dictionary.two_words[A_B]/dictionary.total_two_words*1.,
            freq_A = dictionary.words[A]/dictionary.total_words*1.,
            freq_B = dictionary.words[B]/dictionary.total_words*1.;
        if(freq_AB < freq_A*freq_B) {
            not_compatible[A_B] = {
                [A_B]: Number((freq_AB*100).toFixed(2)),
                [A]: Number((freq_A*100).toFixed(2)),
                [B]: Number((freq_B*100).toFixed(2))
            }
        }
    }
    return not_compatible;
}
module.exports = is_two_compatible;
