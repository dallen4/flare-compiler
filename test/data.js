// test data

const voltSample = '';

const parserAst = {
    service: 'firestore',
    name: 'default',
    rules: [
        {
            type: 'collection',
            name: 'chatRooms',
            permissions: [
                {
                    type: 'access',
                    name: 'read',
                    condition: 'private',
                    param: ''
                },
                {
                    type: 'variable',
                    name: 'roomName',
                    required: false,
                    static: false,
                    conditional: {
                        value: 0,
                        relation: '='
                    }
                }
            ]
        }
    ]
};

module.exports = {
    voltSample
};
