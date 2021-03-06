module.exports = {
    block: 'md-root',
    content: [{ lang: 'javascript', block: 'code', content: 'var p = null;\n' },
        { block: 'blockquote', content: { block: 'paragraph', content: 'my blockquote' } },
        { block: 'html', content: '<h1>qwerty</h1>' },
        { level: 1, block: 'heading', mods: { level: 1 }, content: 'Heading' },
        { level: 2, block: 'heading', mods: { level: 2 }, content: 'Heading 2' },
        { block: 'thematic-break' }, {
            ordered: false,
            spread: false,
            block: 'list',
            content: [{
                spread: false,
                checked: null,
                block: 'list-item',
                content: { block: 'paragraph', content: 'item 1' }
            }, {
                spread: false,
                checked: null,
                block: 'list-item',
                content: { block: 'paragraph', content: 'item 2' }
            }]
        }, {
            ordered: true,
            spread: false,
            start: 5,
            block: 'list',
            mods: { ordered: true },
            content: [{
                spread: false,
                checked: null,
                block: 'list-item',
                content: { block: 'paragraph', content: 'item 5' }
            }, {
                spread: false,
                checked: null,
                block: 'list-item',
                content: { block: 'paragraph', content: 'item 6' }
            }]
        }]
};
