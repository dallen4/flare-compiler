// TODO Code Generator function file
'use strict';

const {
    designateService,
    designateDatabase,
    generateWildcardMatch,
    generateAccessState,
    addType,
    addValueCondition,
    makeStatic,
} = require('../util/syntax');

module.exports = function codeGenerator(ast) {

    let codeString = ``;

    codeString += designateService(ast.type);
    codeString += designateDatabase(ast.name);

    ast.collections.forEach(collection => {
        codeString += handleCollection(collection);
    });

    codeString += '\n\t}\n}';

    console.log(codeString);

    console.log('generating new rules code...');

    return codeString;

}

function handleCollection(collection) {

    let collectionString = ``;

    let isRecursive = true;

    if (collection.documents.length || collection.collections.length)
        isRecursive = false;
    
    collectionString += generateWildcardMatch(collection.name, isRecursive);
    let stateStrings = handleAccessStates(collection.access);
    let variableString = handleVariables(collection.variables);

    Object.keys(stateStrings).forEach(state => {

        let statePermissionString = ``;

        collectionString += stateStrings[state];
        collectionString += `${variableString};\n`

        switch (state) {
            case 'create':
            case 'update':
            case 'delete':
            case 'read':
            case 'write':
        }

    });

    collectionString += '\n\t\t}';

    return collectionString;

}

function handleDocument(document) {}

function handleAccessStates(accessObject) {

    let states = Object.keys(accessObject);
    let stateStrings = {};

    states.forEach(state => {
        stateStrings[state] = generateAccessState(state, accessObject[state].type, accessObject[state].variable)
    });

    return stateStrings;

}

// required -> create (or write)
// -- condition
// static -> update (or write)
function handleVariables(variables) {

    let variablesString = ``;

    variables.forEach(variable => {

        if (variable.type)
            variablesString += `\n${addType(variable.name, variable.type)}`;
        
        if (variable.condition)
            variablesString += `\n${addValueCondition(variable.name, variable.condition)}`;

        if (variable.static)
            variablesString += `\n${makeStatic(variable.name)}`;
        
    });

    return variablesString;

}
