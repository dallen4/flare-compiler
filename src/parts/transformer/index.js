// TODO Transformer function file
const traverser = require('./traverser');

'use strict';

module.exports = function transformer(ast = {}) {

    console.log('transforming AST...');

    var newAst = {
        service: '',
        name: '',
        collections: [],
        documents: []
    };

    return;

}

// TODO define visitor object to pass to Traverser
// visitor object should include:
// -- function to filter document nodes out of collection nodes
// const visitor = {
//     collection,
//     document
// };
