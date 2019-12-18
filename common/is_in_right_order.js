var is_in_right_order = function(current_dictionary, ex_dict) {
    let rare_B_A = {};
    for (let A_B in current_dictionary.two_words) {
        let A = A_B.split(' ')[0], B = A_B.split(' ')[1];
        if (B+' '+A in ex_dict.two_words) {
            if(ex_dict.two_words[A_B] < ex_dict.two_words[B+' '+A] || (!ex_dict.two_words[A_B] && ex_dict.two_words[B+' '+A])){
                rare_B_A[A_B] = {
                    [A+' '+B]: ex_dict.two_words[A_B],
                    [B+' '+A]: ex_dict.two_words[B+' '+A]
                }
            }
        }
    }
    return rare_B_A;
}
module.exports = is_in_right_order;
