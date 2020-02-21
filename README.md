# SciLexic
______________________________________

[![NPM](https://nodei.co/npm/scilexic.png?downloads=true&stars=true)](https://nodei.co/npm/scilexic/)

**WEB UI**: [SciLexic](https://scilexic.github.io/)

**CLI**:

**Creating dictionary**

```
node cli/create_dictionary.js {dictionary_name.json} {file1.pdf file2.pdf ...}
```

**Unite dictionaries**

```
node cli/unite_dictionaries.js {dictionary_union_name.json} {dict1.json dict2.json ...}
```

**Compare text with dictionaries**

```
node cli/compare_dictionaries.js {mytext.pdf} {number} {dict1.json dict2.json ...}
```
number = "rare" words count

**Add word to dictionary**

```
node cli/add_to_dictionary.js {dictionary_name.json} {"word"} {number}
```
number = count of words to be added (affects the results of the program, recommended to be more than "rare" words count)
