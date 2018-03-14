// Tokenizer function
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
    let CONDITIONALS = /[=|>|<|!]/;

    // init var with string length
    // -- property lookup is resource/time intensive task and will save time
    let inputLength = input.length;

    while (current < inputLength) {

        let char = input[current];

        // init string to store words or digit sequence
        let value = '';

        // skip all whitespace
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        
        // 'word' token
        } else if (LETTERS.test(char)) {

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
        } else if (CONDITIONALS.test(char)) {

            // grabs next char in input string
            let next = input[++current];

            // tests if next char is '='
            // -- all conditionals are two chars and end with '='
            if (next === '=') {

                char += next;
                tokens.push({ type: 'cond', value: char });

                continue;
                
            } else {
                throw new TypeError('Conditionals require two characters.');
            }

        } else if (NUMBERS.test(char)) {

            // while char is num, add to value
            // increment after adding using ++current
            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            // push token with num value to tokens
            tokens.push({ type: 'number', value });
            continue;

        }

        // cases ordered by estimated frequency
        switch (char) {
            
            // 'string' token
            case '\'':
                
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
                break;
            
            // "string" token
            case '"':
                
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
                break;

            // open 'paren' token
            case '(':
                tokens.push({
                    type: 'paren',
                    value: char
                });
                current++;
                break;
            
            // close 'paren' token
            case ')':
                tokens.push({
                    type: 'paren',
                    value: char
                });
                current++;
                break;

            // 'semi' token
            case ';':
                tokens.push({
                    type: 'semi',
                    value: char
                });
                current++;
                break;
            
            // 'colon' token
            case ':':
                tokens.push({
                    type: 'colon',
                    value: char
                });
                current++;
                break;

            // open 'brace' token
            case '{':
                tokens.push({
                    type: 'brace',
                    value: char
                });
                current++;
                break;
            
            // close 'brace' token
            case '}':
                tokens.push({
                    type: 'brace',
                    value: char
                });
                current++;
                break;
            
            // disregard comments
            case '/':

                // skip commented chars until end of line
                while (char !== '\n') {
                    char = input[++current];
                }
                
                // skip new line char
                char = input[++current];
                break;
            
            // unknown token type
            // -- throw TypeError
            default:
                throw new TypeError('Unexpected token: ' + char
                    + '\nPlease see documentation for syntax guidelines.');
            
        }
    
    }

    return tokens;

}
