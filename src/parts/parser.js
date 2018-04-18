// Parser function file
'use strict';

var { lineToNode } = require('../util/nodes');

module.exports = function parser(tokens) {

    let current = 0;

    function walk() {

        let token = tokens[current];

        if ((token.value === 'collection' || token.value === 'document')
            && tokens[current + 1].type === 'word') {

            // grab node type and name
            let type = token.value;
            let name = tokens[++current].value

            // create node object
            let node = {
                type,
                name,
                permissions: []
            };

            // skip '{' token
            current += 2;

            // console.log(node);
            // continue while within scope defined by braces
            while (token.value !== '}') {
                node.permissions.push(walk());
                // console.log(node);
                token = tokens[++current];
            }

            // skip '}' token
            current++;

            return node;

        } else {

            // console.log(ast);

            let line = [];

            while (token.type !== 'semi') {
                line.push(token);
                token = tokens[++current];
            }

            return lineToNode(line);

        }

    }

    // init ast
    var ast = {
        service: '',
        name: '',
        rules: []
    };

    // grab first token
    let token = tokens[current];

    // test if user declared service type and db/bucket
    if (token.value === 'use' && tokens[current + 2].value === 'in') {

        // grab name of db or bucket
        let name = tokens[++current].value;

        // assign ast service name value
        ast.name = name;

        // skip 'in' token
        current++;

        // grab name of service (firestore or storage)
        let service = tokens[++current].value;

        // assign ast service value
        ast.service = service;

        // skip to token after ';' token
        current = current + 2;

    // else fallback to default db in firestore
    } else {

        ast.service = 'firestore';
        ast.name = 'default';
        
    }

    // iterate over tokens array
    while (current < tokens.length)
        ast.rules.push(walk());
    
    return ast;

}
