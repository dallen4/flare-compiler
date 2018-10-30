// src/util/syntax.js
// functions to help generate .rules syntax

const pluralize = require('pluralize');

// init prefix strings for .rules doc referencing
const resourceDataPrefix = 'resource.data';
const requestDataPrefix = 'request.' + resourceDataPrefix;
const andLinePrefix = '\t\t\t\t&& ';
const orLinePrefix = '\t\t\t\t|| ';

function designateService(serviceType = 'firestore') {

    return `service cloud.${serviceType} {\n\n`;

}

function designateDatabase(dbName = 'default') {

    if (dbName === 'default')
        dbName = '{database}';

    return `\tmatch /databases/${dbName}/documents {\n\n`;

}

function generateWildcardMatch(collectionName, recursive = false) {

    let docsRef = 'docs';

    if (pluralize.isPlural(collectionName))
        docsRef = pluralize.singular(collectionName);

    if (recursive)
        docsRef = docsRef + '=**';

    return `\t\tmatch /${collectionName}/{${docsRef}} {\n\n`;

}

function generateDocumentMatch(collectionName, docID) {

    return `\t\tmatch /${collectionName}/${docID} {\n\n`;

}

function generateAccessState(accessType, stateType, variableName = 'uid') {

    var statePrefix = `\t\t\tallow ${accessType}: if `;
    var value;

    switch(stateType) {

        // read or write is public -- no auth required
        case 'public':
            value = 'true';
            break;

        // read or write for auth users
        case 'protected':
            value = 'request.auth != null';
            break;

        // read or write for uids in array (variableName)
        case 'restricted':
            value = `request.auth.uid in ${resourceDataPrefix}.${variableName}`;
            break;

        // read or write for uid (or variableName) in doc
        case 'private':
            value = `request.auth.uid == ${resourceDataPrefix}.${variableName}`;
            break;

        // read or write is prohibited
        case 'none':
            value = 'false';
            break;

        default:
            throw new TypeError('invalid access state type: ' + stateType
                + '\nPlease see documentation for syntax guidelines.');
        
    }

    return statePrefix + value;

}

function makeStatic(variableName) {

    return `\t\t\t\t && ${requestDataPrefix}.${variableName} == ${resourceDataPrefix}.${variableName}`;
    
}

function addType(variableName, variableType) {

    return `\t\t\t\t && ${requestDataPrefix}.${variableName} is ${variableType}`;

}

function addValueCondition(variableName, condition = '!= null') {

    return `\t\t\t\t && ${requestDataPrefix}.${variableName} ${condition}`;
}

module.exports = {
    designateService,
    designateDatabase,
    generateWildcardMatch,
    generateDocumentMatch,
    generateAccessState,
    makeStatic,
    addType,
    addValueCondition
};
