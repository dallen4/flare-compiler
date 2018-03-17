// unit tests (mocha)
const assert = require('assert');

// import compiler functions
var {
    tokenizer,
    parser
} = require('../src/parts');

// import test data
var {
    voltCode,
    tokens,
    ast
} = require('./data');

describe('Volt Compiler', function() {

    describe('Tokenizer', function() {
        it('should generate correct array of tokens from volt code', function() {
            var testTokens = tokenizer(voltCode);
            assert.deepStrictEqual(tokens, testTokens);
        });
    });
    
    describe('Parser', function() {
        it('should generate correct AST from tokens array', function() {
            var testAst = parser(tokens);
            assert.deepStrictEqual(ast, testAst);
        });
    });
    
});
