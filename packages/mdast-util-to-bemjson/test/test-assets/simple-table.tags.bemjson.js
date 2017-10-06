module.exports = {
    align: ['left', 'center'],
    tag: 'table',
    block: 'table',
    content: [{
        elem: 'thead',
        content: {
            elem: 'row',
            content: [{ elem: 'th', content: 'foo', tag: 'th' },
                { elem: 'th', content: 'bar', tag: 'th' }],
            tag: 'tr'
        },
        tag: 'thead'
    }, {
        elem: 'tbody',
        content: [{
            elem: 'row',
            content: [{ elem: 'cell', content: 'baz', tag: 'td' },
                { elem: 'cell', content: 'qux', tag: 'td' }],
            tag: 'tr'
        }],
        tag: 'tbody'
    }]
};
