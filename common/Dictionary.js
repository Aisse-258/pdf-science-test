var Dictionary = function(o) {
    o = o || {};
    this.text = o.text || '';
    this.words = o.words || {};
    this.total_words = o.total_words || 0;
    this.two_words = o.two_words || {};
    this.total_two_words = o.total_two_words || 0;
    this.n_words = o.n_words || {};
    this.total_n_words = o.total_n_words || 0;
    this.word_count = function () {
        this.total_words = 0;
        for (let i in this.words) {
            this.total_words += this.words[i];
        }
        this.total_two_words = 0;
        for (let i in this.two_words) {
            this.total_two_words += this.two_words[i];
        }
        this.total_n_words = 0;
        for (let i in this.n_words) {
            this.total_n_words += this.n_words[i];
        }
    }
    this.clean_f = function () {
        f_reg = /^[npmlobtyjksedqwrufghzxcv]$/;
        for (let i in this.words) {
            if (f_reg.test(i)) {
                this.total_words -= this.words[i];
                delete this.words[i];
            }
        }
        for (let i in this.two_words) {
            let a = i.split(' ')[0], b = i.split(' ')[1];
            if (f_reg.test(a) || f_reg.test(b)) {
                this.total_two_words -= this.two_words[i];
                delete this.two_words[i];
            }
        }
        for (let i in this.n_words) {
            let a = i.split(' ');
            for (let j = 0; j < a.length; j++) {
                a[j] = a[j].split(',')[0];
                if (f_reg.test(a[j])) {
                    this.total_n_words -= this.n_words[i];
                    delete this.n_words[i];
                }
            }
        }
    }
    this.repair_broken_words = function () {
        for (let twoWords in this.two_words) {
            var maybeUnited = twoWords.split(' ');
            if (maybeUnited[0] + maybeUnited[1] in this.words && this.two_words[twoWords] == 1) {
                console.log(twoWords);
                this.words[maybeUnited[0] + maybeUnited[1]]++;
                delete this.two_words[twoWords];
            }
        }
        this.word_count();
    }
}
module.exports = Dictionary;
