import { throws } from "assert";

// nodes util functions

// TODO parse line into node
// -- compensate for line type (access vs. variable)
function lineToNode(line = []) {

    let node = {};

    if (isAccessState(line[0])) {

        node.type = 'access';
        node.name = line[0];
        node.condition = line[2];

        if (line[2] === 'restricted' && line[3] === '(' && line[5] === ')')
            node.param = line[4];
        else if (line[2] === 'private' && line[4] !== ')')
            node.param = line[4];
        else if (line[2] === 'private')
            node.param = 'uid';
        else
            throw new TypeError('Error in access state declaration!'
            + '\nRemember: "restricted" access state requires a parameter.');

        return node;

    
    } else {

        node.type = 'variable';
        
        while (line.length) {

            let item = line.shift();

            if (item === 'required') {
                node.required = true;
            } else if(item === 'static') {
                node.static = true;
            } else if (isDataType(item)) {
                // TODO support 
            } else if (line.length > 1) {
                node.name = item;
                // TODO support conditional
            }
            
        }

        return;
    }

}

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
    lineToNode
};
