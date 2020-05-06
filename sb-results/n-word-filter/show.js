var words = require('./words'+process.argv[2]+'.json');
let min_count = process.argv[3] || 1, max_count = process.argv[4] || Infinity;
for (let phrase in words) {
    if (words[phrase] >= min_count && words[phrase] < max_count) {
        console.log ('['+words[phrase]+']', phrase);
    }
}
