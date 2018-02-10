// TODO Tokenizer function file
'use strict';

module.exports = function tokenizer(input = '') {

    console.log('tokenizing...');

    // init cursor variable
    let current = 0;

    // init empty tokens array
    let tokens = [];

    // init regexes
    let WHITESPACE = /\s|\t|\n/;
    let LETTERS = /[a-z]/i;
    let NUMBERS = /[0-9]/;

    // init var with string length
    // -- property lookup is resource/time intensive task and will save time
    let inputLength = input.length;

    while (current < inputLength) {

        let char = input[current];

        // skip all whitespace
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        // 'number' token
        // grab entire number sequence
        if (NUMBERS.test(char)) {

            // init string to store num terms
            let value = '';

            // while char is num, add to value
            // increment after adding using ++current
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            // push token with whole num value to tokens
            tokens.push({ type: 'number', value });

            continue;

        }

        // TODO 'word' token

        // TODO 'string' token

        // TODO 'brace' token

        // TODO 'paren' token

        // TODO 'colon' token

        // TODO 'semi' token

    }

    return tokens;

}
