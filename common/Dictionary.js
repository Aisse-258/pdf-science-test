var Dictionary = function(o) {
    o = o || {};
    this.text = o.text || '';
    this.words = o.words || {};
    this.total_words = o.total_words || 0;
    this.two_words = o.two_words || {};
    this.total_two_words = o.total_two_words || 0;
    this.n_words = o.n_words || {};
    this.total_n_words = o.total_n_words || 0;
}
module.exports = Dictionary;
