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

        // init string to store words or digit sequence
        let value = '';

        // cases ordered by estimated frequency
        switch (char) {

            // skip all whitespace
            case WHITESPACE.test(char):
                current++;
                continue;
            
            // 'word' token
            case LETTERS.test(char):

                // while char is letter, add to value
                // increment after adding using ++current
                while (LETTERS.test(char)) {
                    value += char;
                    char = input[++current];
                }

                // push token with word value to tokens
                tokens.push({ type: 'word', value });
                continue;

            // 'number' token
            // -- grab entire number
            case NUMBERS.test(char):

                // while char is num, add to value
                // increment after adding using ++current
                while (NUMBERS.test(char)) {
                    value += char;
                    char = input[++current];
                }

                // push token with num value to tokens
                tokens.push({ type: 'number', value });
                continue;
            
            // 'string' token
            case char === '\'':
                
                // skip quote
                char = input[++current];

                // while char isn't end quote, add to value
                // increment after adding using ++current
                while (char !== '\'') {
                    value += char;
                    char = input[++current];
                }

                // skip quote
                char = input[++current];

                // push token with string value to tokens
                tokens.push({ type: 'string', value });
                continue;
            
            // "string" token
            case char === '"':
                
                // skip quote
                char = input[++current];

                // while char isn't end quote, add to value
                // increment after adding using ++current
                while (char !== '"') {
                    value += char;
                    char = input[++current];
                }

                // skip quote
                char = input[++current];

                // push token with string value to tokens
                tokens.push({ type: 'string', value });
                continue;

            // open 'paren' token
            case char === '(':
                tokens.push({
                    type: 'paren',
                    value: char
                });
                current++;
                continue;
            
            // close 'paren' token
            case char === ')':
                tokens.push({
                    type: 'paren',
                    value: char
                });
                current++;
                continue;

            // 'semi' token
            case char === ';':
                tokens.push({
                    type: 'semi',
                    value: char
                });
                current++;
                continue;
            
            // 'colon' token
            case char === ':':
                tokens.push({
                    type: 'colon',
                    value: char
                });
                current++;
                continue;

            // open 'brace' token
            case char === '{':
                tokens.push({
                    type: 'brace',
                    value: char
                });
                current++;
                continue;
            
            // close 'brace' token
            case char === '}':
                tokens.push({
                    type: 'brace',
                    value: char
                });
                current++;
                continue;
            
            // unknown token type
            // -- throw TypeError
            default:
                throw new TypeError('Unexpected token: ' + char
                    + '\nPlease see documentation for syntax guidelines.');
            
        }

    }

    return tokens;

}
