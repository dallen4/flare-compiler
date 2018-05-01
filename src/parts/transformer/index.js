// Transformer function file
const traverser = require('./traverser');
const DataElement = require('./DateElement');

'use strict';

module.exports = function transformer(ast) {

    let { type, name, permissions } = ast;

    var newAst = new DataElement(type, name);

    newAst.traverse(permissions);

    return newAst;

}
