module.exports = {
    align: ['left', 'center'],
    block: 'table',
    content: [{
        elem: 'thead',
        content: {
            elem: 'row',
            content: [{ elem: 'th', content: 'foo' }, { elem: 'th', content: 'bar' }]
        }
    }, {
        elem: 'tbody',
        content: [{
            elem: 'row',
            content: [{ elem: 'cell', content: 'baz' }, { elem: 'cell', content: 'qux' }]
        }]
    }]
};
