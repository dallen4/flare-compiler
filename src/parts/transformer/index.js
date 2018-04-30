// TODO Transformer function file
const traverser = require('./traverser');
const DataElement = require('./DateElement');

'use strict';

module.exports = function transformer(ast) {

    let { type, name, permissions } = ast;

    var newAst = new DataElement(type, name);

    newAst.traverse(permissions);

    // TODO consider doing away with traverser
    // -- add functions to Ast prototype

    return newAst;

}
