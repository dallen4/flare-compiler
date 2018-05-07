// Transformer function file
const DataElement = require('./DateElement');

'use strict';

module.exports = function transformer(ast) {

    let { type, name, permissions } = ast;

    // init new DataElement object
    var newAst = new DataElement(type, name);

    // traverse array of permissions (or rules)
    newAst.traverse(permissions);

    return newAst;

}
