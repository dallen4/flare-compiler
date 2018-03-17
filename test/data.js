// test data

const voltCode = `
use default in firestore;
collection chatRooms {
    read: private();
    write: restricted(members);

    require static int roomName == 110;
    static string name;
    require list members;

}
`;

const tokens = [
    {
        type: 'word',
        value: 'use'
    },
    {
        type: 'word',
        value: 'default'
    },
    {
        type: 'word',
        value: 'in'
    },
    {
        type: 'word',
        value: 'firestore'
    },
    {
        type: 'semi',
        value: ';'
    },
    {
        type: 'word',
        value: 'collection'
    },
    {
        type: 'word',
        value: 'chatRooms'
    },
    {
        type: 'brace',
        value: '{'
    },
    {
        type: 'word',
        value: 'read'
    },
    {
        type: 'colon',
        value: ':'
    },
    {
        type: 'word',
        value: 'private'
    },
    {
        type: 'paren',
        value: '('
    },
    {
        type: 'paren',
        value: ')'
    },
    {
        type: 'semi',
        value: ';'
    },
    {
        type: 'word',
        value: 'write'
    },
    {
        type: 'colon',
        value: ':'
    },
    {
        type: 'word',
        value: 'restricted'
    },
    {
        type: 'paren',
        value: '('
    },
    {
        type: 'word',
        value: 'members'
    },
    {
        type: 'paren',
        value: ')'
    },
    {
        type: 'semi',
        value: ';'
    },
    {
        type: 'word',
        value: 'require'
    },
    {
        type: 'word',
        value: 'static'
    },
    {
        type: 'word',
        value: 'int'
    },
    {
        type: 'word',
        value: 'roomName'
    },
    {
        type: 'cond',
        value: '=='
    },
    {
        type: 'number',
        value: '110'
    },
    {
        type: 'semi',
        value: ';'
    },
    {
        type: 'word',
        value: 'static'
    },
    {
        type: 'word',
        value: 'string'
    },
    {
        type: 'word',
        value: 'name'
    },
    {
        type: 'semi',
        value: ';'
    },
    {
        type: 'word',
        value: 'require'
    },
    {
        type: 'word',
        value: 'list'
    },
    {
        type: 'word',
        value: 'members'
    },
    {
        type: 'semi',
        value: ';'
    },
    {
        type: 'brace',
        value: '}'
    }
];

const ast = {
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
                    param: 'uid'
                },
                {
                    type: 'access',
                    name: 'write',
                    condition: 'restricted',
                    param: 'members'
                },
                {
                    type: 'variable',
                    name: 'roomName',
                    dataType: 'int',
                    required: true,
                    static: true,
                    conditional: {
                        value: '110',
                        relation: '=='
                    }
                },
                {
                    type: 'variable',
                    name: 'name',
                    dataType: 'string',
                    required: false,
                    static: true,
                    conditional: null
                },
                {
                    type: 'variable',
                    name: 'members',
                    dataType: 'list',
                    required: true,
                    static: false,
                    conditional: null
                }
            ]
        }
    ]
};

module.exports = {
    voltCode,
    tokens,
    ast
};
