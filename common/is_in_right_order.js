var is_in_right_order = function(dictionary) {
    let rare_B_A = {};
    for (let A_B in dictionary.two_words) {
        let A = A_B.split(' ')[0], B = A_B.split(' ')[1];
        if (B+' '+A in dictionary.two_words) {
            if(dictionary.two_words[A_B] > dictionary.two_words[B+' '+A]){
                rare_B_A[A_B] = {
                    [A+' '+B]: dictionary.two_words[A_B],
                    [B+' '+A]: dictionary.two_words[B+' '+A]
                }
            }
        }
    }
    return rare_B_A;
}
module.exports = is_in_right_order;
