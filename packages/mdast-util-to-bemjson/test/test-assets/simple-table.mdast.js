module.exports = {
    type: 'table',
    align: ['left', 'center'],
    children: [
        {
            type: 'tableRow',
            children: [
                {
                    type: 'tableCell',
                    children: [{
                        type: 'text',
                        value: 'foo'
                    }]
                },
                {
                    type: 'tableCell',
                    children: [{
                        type: 'text',
                        value: 'bar'
                    }]
                }
            ]
        },
        {
            type: 'tableRow',
            children: [
                {
                    type: 'tableCell',
                    children: [{
                        type: 'text',
                        value: 'baz'
                    }]
                },
                {
                    type: 'tableCell',
                    children: [{
                        type: 'text',
                        value: 'qux'
                    }]
                }
            ]
        }
    ]
};
