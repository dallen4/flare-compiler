// unit tests (mocha)
const assert = require('assert');

// import compiler functions
var {
    tokenizer,
    parser,
    transformer
} = require('../src/parts');

// import test data
var {
    voltCode,
    tokens,
    ast,
    finalAst
} = require('./data');

// run all Volt Compiler tests
describe('Volt Compiler', function() {

    // test Tokenizer function
    describe('Tokenizer', function() {
        it('should generate correct array of tokens from volt code', function() {
            var testTokens = tokenizer(voltCode);
            assert.deepStrictEqual(tokens, testTokens);
        });
    });
    
    // test Parser function
    describe('Parser', function() {
        it('should generate correct AST from tokens array', function() {
            var testAst = parser(tokens);
            assert.deepStrictEqual(ast, testAst);
        });
    });

    // test Transformer function
    describe('Transformer', function() {
        it('should transform AST from Parser to new AST format', function() {
            var testFinalAst = transformer(ast);
            assert.deepStrictEqual(finalAst, testFinalAst.valueOf());
        });
    });
    
});
