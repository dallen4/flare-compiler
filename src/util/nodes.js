// nodes util functions
// TODO COMMENT CODE
var { isAccessState, isDataType } = require('./helpers');

// parse line into node
// -- compensate for line type (access vs. variable)
function lineToNode(line = []) {

    let node = {};

    if (isAccessState(line[0].value)) {

        node = {
            type: 'access',
            name: line[0].value,
            condition: line[2].value,
            param: ''
        };

        line[2].value === 'restricted' && line[3].value === '(' && line[5].value === ')'
            ? node.param = line[4].value
        : line[2].value === 'private' && line[4].value !== ')'
            ? node.param = line[4].value
        : line[2].value === 'private'
            ? node.param = 'uid'
        : (() => {
            throw new TypeError('Error in access state declaration!'
            + '\nRemember: "restricted" access state requires a parameter.')
        });

        return node;

    
    } else {

        node = {
            type: 'variable',
            name: '',
            dataType: '',
            required: false,
            static: false,
            conditional: null
        };
        
        while (line.length) {

            let item = line.shift();

            let { type, value } = item;

            if (value === 'require') {
                node.required = true;
            } else if(value === 'static') {
                node.static = true;
            } else if (isDataType(value)) {
                node.dataType = value;
            } else if (type === 'word') {
                node.name = value;
            } else if (type === 'cond') {
                node.conditional = {
                    value: line[0].value,
                    relation: value
                };
                return node;
            } else {
                throw new TypeError(`Error converting tokens to variable node
                failed on token: ${item}`)
            }
            
        }

        return node;

    }

}

module.exports = {
    lineToNode
};
