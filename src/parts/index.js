// import all parts and export together
const tokenizer = require('./tokenizer');
const parser = require('./parser');
const transformer = require('./transformer');
const codeGenerator = require('./codeGenerator');

module.exports = {
    tokenizer,
    parser,
    transformer,
    codeGenerator
};
