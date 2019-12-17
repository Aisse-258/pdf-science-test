var word_count = function (dictionary) {
    let count = 0;
    for (let i in dictionary){
        count += dictionary[i];
    }
    return count;
}
module.exports = word_count;
