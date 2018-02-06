const { read, write } = require('./io');

'use strict';

function voltToRules(inputFileName = 'test.vlt', outputFileName = 'test.rules') {

    return read(inputFileName)
        // .then(voltInput => {
            // let rules = compiler(voltInput);
        .then(rules => {
            return write(outputFileName, rules);
        }).catch(error => {
            console.log(error);
        });
    
}

/**
 * FINALLY! We'll create our `compiler` function. Here we will link together
 * every part of the pipeline.
 *
 *   1. input  => tokenizer   => tokens
 *   2. tokens => parser      => ast
 *   3. ast    => transformer => newAst
 *   4. newAst => generator   => output
 * 
 * from: https://github.com/thejameskyle/the-super-tiny-compiler/blob/master/the-super-tiny-compiler.js
 */
function compiler(voltInput) {

    let tokens = tokenizer(voltInput);
    let ast = parser(tokens);
    let newAst = transformer(ast);
    let rules = codeGenerator(newAst);

    return rules;

}

module.exports = {
    voltToRules,
    compiler
};
