var words = require('./words'+process.argv[2]+'.json');
for (let phrase in words) {
    if (words[phrase] > process.argv[3]) {
        console.log (phrase, '['+words[phrase]+']');
    }
}
