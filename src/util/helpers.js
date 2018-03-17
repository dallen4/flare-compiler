// general helper functions

function isAccessState(term) {
    switch (term) {
        case 'read':
        case 'get':
        case 'list':
        case 'write':
        case 'create':
        case 'update':
        case 'delete':
            return true;
        default:
            return false;
    }
}

// test all data types supported by Firebase Security Rules
// data types from: https://firebase.google.com/docs/firestore/reference/security/
function isDataType(term) {
    switch(term) {
        case 'null':
        case 'bool':
        case 'int':
        case 'float':
        case 'string':
        case 'timestamp':
        case 'duration':
        case 'list':
        case 'map':
            return true;
        default:
            return false;
    }
}

module.exports = {
    isAccessState,
    isDataType
};
