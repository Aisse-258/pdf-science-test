# SciLexic
______________________________________

[![NPM](https://nodei.co/npm/scilexic.png?downloads=true&stars=true)](https://nodei.co/npm/scilexic/)

WEB UI: https://scilexic.github.io/

CLI:
Creating dictionary

node cli/dictionary_create.js {dictionary_name.json} {file1.pdf file2.pdf ...}

Unite dictionaries

node cli/dictionary_union.js {dictionary_union_name.json} {dict1.json dict2.json ...}

Compare text with dictionaries

node cli/dictionary_compare.js {mytext.pdf} {number} {dict1.json dict2.json ...}
number = "rare" words count
