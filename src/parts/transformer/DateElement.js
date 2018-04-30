// TODO Data Element prototype

var DataElement = function(type, name) {
    this.type = type;
    this.name = name;
    this.collections = [];
    this.documents = [];
};

DataElement.prototype.traverse(nodeArray, parentNode) {

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
                // TODO conditional property
                parentNode.variables.push(newNode);
                break;

            default:
                throw new TypeError(`Unknown node type: ${type}`);
            
        }

    });

}

module.exports = DataElement;
