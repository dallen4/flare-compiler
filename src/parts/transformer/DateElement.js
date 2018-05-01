// Data Element prototype

// DataElement constructor
var DataElement = function(type, name) {
    this.type = type;
    this.name = name;
    this.collections = [];
    this.documents = [];
};

// recursively traverses nodes, beginning with root permissions array
DataElement.prototype.traverse = function(nodeArray, parentNode) {

    let node = {};

    nodeArray.forEach(node => {

        let { type, name } = node;
        let newNode = {};
        newNode.name = name;

        switch (type) {

            case 'collection':
                newNode.documents = [];
            case 'document':
                newNode.access = {};
                newNode.variables = [];
                this.traverse(node.permissions, newNode);
                this[`${type}s`].push(newNode);
                break;

            case 'access':
                parentNode.access[name] = {
                    type: node.condition,
                    variable: node.param
                };
                break;
                
            case 'variable':
                newNode.type = node.dataType;
                newNode.required = node.required;
                newNode.static = node.static;
                newNode.condition = node.conditional !== null
                    ? `${node.conditional.relation} ${node.conditional.value}`
                    : null;
                parentNode.variables.push(newNode);
                break;

            default:
                throw new TypeError(`Unknown node type: ${type}`);
            
        }

    });

}

// returns properly formatted representaiton of AST for testing
DataElement.prototype.valueOf = function() {
    
    return {
        type: this.type,
        name: this.name,
        collections: this.collections,
        documents: this.documents,
    };

}

module.exports = DataElement;
