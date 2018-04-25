// TODO Traverser function file
'use strict';

module.exports = function traverser(ast, visitor) {

    console.log('traversing AST for transformation...');

    // traverses array of child nodes
    function traverseArray(array, parentNode) {
        array.forEach(childNode => {
            traverseNode(childNode, parentNode);
        });
    }

    function traverseNode(childNode, parentNode) {

        // TODO implement enter methods

        let { type } = childNode;

        switch (type) {

            case 'collection':
            case 'document':
                traverseArray(childNode.permissions, childNode);
                break;

            case 'access':
            case 'variable':
                break;

            default:
                throw new TypeError(`Unknown node type: ${type}`);
            
        }

        // TODO implement exit methods

    }

    return;

}
