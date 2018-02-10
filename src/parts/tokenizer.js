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

    while (current < inputLength);

    return tokens;

}
