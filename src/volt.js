const { read, write } = require('./io');
const {
    tokenizer,
    parser,
    transformer,
    codeGenerator
} = require('./parts');

'use strict';

function voltToRules(inputFileName = 'test.vlt', outputFileName = 'test.rules') {

    return read(inputFileName)
        .then(voltInput => {
            return compiler(voltInput);
        }).then(rules => {
            return write(outputFileName, rules);
        }).then(outputFile => {
            console.log(inputFileName, 'has been successfully compiled to', outputFileName, 'successfully...');
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

    let tokens = tokenizer();
    let ast = parser();
    let newAst = transformer();
    let rules = codeGenerator();

    return rules;

}

module.exports = {
    voltToRules,
    compiler
};
