'use strict';

const expect = require('chai').expect;

const toBemjson = require('../index');

describe('Test bemjson markdown representation tree', () => {

    describe('Root', () => {
        it('should generate block `md-root`', () => {
            const tree = { type: 'root' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'md-root');
        });
    });

    describe('Paragraph', () => {
        it('should generate block `paragraph`', () => {
            const tree = { type: 'paragraph' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'paragraph');
        });
    });

    describe('Blockquote', () => {
        it('should generate block `blockquote`', () => {
            const tree = { type: 'blockquote' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'blockquote');
        });
    });

    describe('Heading', () => {
        it('should generate block `heading` with level', () => {
            const tree = { type: 'heading', depth: 1 };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'heading');
            expect(bjson).to.have.property('level', 1);
            expect(bjson).to.have.property('mods');
            expect(bjson.mods).to.have.property('level', 1);
        });
    });

    describe('Code', () => {
        it('should generate block `code`', () => {
            const tree = { type: 'code', lang: 'js' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'code');
            expect(bjson).to.have.property('lang', 'js');
        });

        it('should not set property lang', () => {
            const tree = { type: 'code', lang: null };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('lang');
        });

        it('should set property lang with custom lang', () => {
            const tree = { type: 'code', lang: 'bemjson' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('lang', 'bemjson');
        });

        it('should set content from value', () => {
            const tree = { type: 'code', lang: 'js', value: 'foo()' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('content', 'foo()\n');
        });

        it('should add \\n to content', () => {
            const tree = { type: 'code', lang: 'js', value: 'content' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('content', 'content\n');
        });
    });

    describe('InlineCode', () => {
        it('should generate block `inline-code`', () => {
            const tree = { type: 'inlineCode' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'inline-code');
        });
    });

    describe('YAML', () => {
        it('should generate block `yaml`', () => {
            const tree = { type: 'yaml' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'yaml');
        });
    });

    describe('HTML', () => {
        it('should generate block `html`', () => {
            const tree = { type: 'html' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'html');
        });
    });

    describe('List', () => {
        it('should generate block `list`', () => {
            const tree = { type: 'list', ordered: false, loose: false };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'list');
        });

        it('should set prop and mod `ordered`', () => {
            const tree = { type: 'list', ordered: true, loose: false };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('ordered', true);
            expect(bjson).to.have.property('mods');
            expect(bjson.mods).to.have.property('ordered', true);
        });

        it('should not set mod `ordered`', () => {
            const tree = { type: 'list', ordered: false, loose: false };
            const bjson = toBemjson(tree);

            bjson.mods && expect(bjson.mods).to.not.have.property('ordered');
        });

        it('should set property `loose`', () => {
            const tree = { type: 'list', ordered: false, loose: true };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('loose', true);
        });

        it('should set property `start`', () => {
            const tree = { type: 'list', ordered: false, loose: true, start: 2 };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('start', 2);
        });

        it('should not set property `start=1`', () => {
            const tree = { type: 'list', ordered: false, loose: true, start: 1 };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('start');
        });

        it('should not set property `start`', () => {
            const tree = { type: 'list', ordered: false, loose: true, start: null };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('start');
        });
    });

    describe('ListItem', () => {
        it('should generate block `list-item`', () => {
            const tree = { type: 'listItem', loose: false };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'list-item');
        });

        it('should set prop `loose`', () => {
            const tree = { type: 'listItem', loose: true, checked: null };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('loose', true);
        });

        it('should set prop `checked`', () => {
            const tree = { type: 'listItem', loose: true, checked: true };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('checked', true);
        });

        it('should set prop `checked=null`', () => {
            const tree = { type: 'listItem', loose: true, checked: null };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('checked', null);
        });
    });

    describe('Table', () => {
        it('should generate block `table`', () => {
            const tree = { type: 'table' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'table');
        });

        it('should set property align', () => {
            const tree = { type: 'table', align: ['left', 'center'] };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('align');
            expect(bjson.align).to.deep.equal(['left', 'center']);
        });

        it('should set property rows', () => {
            const tree = require('./test-assets/simple-table.mdast');
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('rows');
            expect(bjson.rows).to.deep.equal([
                ['foo', 'bar'],
                ['baz', 'qux']
            ]);
        });

        it('should not set property rows', () => {
            const tree = { type: 'table', children: null };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('rows');
        });
    });

    describe('ThematicBreak', () => {
        it('should generate block `thematic-break`', () => {
            const tree = { type: 'thematicBreak' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'thematic-break');
        });
    });

    describe('Break', () => {
        it('should generate block `break`', () => {
            const tree = { type: 'break' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'break');
        });
    });

    describe('Emphasis', () => {
        it('should generate block `emphasis`', () => {
            const tree = { type: 'emphasis' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'emphasis');
        });
    });

    describe('Strong', () => {
        it('should generate block `strong`', () => {
            const tree = { type: 'strong' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'strong');
        });
    });

    describe('Delete', () => {
        it('should generate block `delete`', () => {
            const tree = { type: 'delete' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'delete');
        });
    });

    describe('Link', () => {
        it('should generate block `link`', () => {
            const tree = { type: 'link', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'link');
        });

        it('should set property `href`', () => {
            const tree = { type: 'link', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('href', 'test.com');
        });

        it('should set property `title`', () => {
            const tree = { type: 'link', url: 'test.com', title: 'my title' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('title', 'my title');
        });

        it('should not set property `title`', () => {
            const tree = { type: 'link', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('title');
        });
    });

    describe('Image', () => {
        it('should generate block `image`', () => {
            const tree = { type: 'image', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('block', 'image');
        });

        it('should set property `src`', () => {
            const tree = { type: 'image', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('src', 'test.com');
        });

        it('should set property `title`', () => {
            const tree = { type: 'image', url: 'test.com', title: 'my title' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('title', 'my title');
        });

        it('should not set property `title`', () => {
            const tree = { type: 'image', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('title');
        });

        it('should set property `alt`', () => {
            const tree = { type: 'image', url: 'test.com', alt: 'my alt' };
            const bjson = toBemjson(tree);

            expect(bjson).to.have.property('alt', 'my alt');
        });

        it('should not set property `title`', () => {
            const tree = { type: 'image', url: 'test.com' };
            const bjson = toBemjson(tree);

            expect(bjson).to.not.have.property('alt');
        });
    });

    describe('Footnote', () => {
        it('should ignore', () => {
            const tree = { type: 'footnote' };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.an('undefined');
        });
    });

    describe('LinkReference', () => {
        it('should ignore', () => {
            const tree = { type: 'linkReference' };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.an('undefined');
        });
    });

    describe('ImageReference', () => {
        it('should ignore', () => {
            const tree = { type: 'imageReference' };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.an('undefined');
        });
    });

    describe('FootnoteReference', () => {
        it('should ignore', () => {
            const tree = { type: 'footnoteReference' };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.an('undefined');
        });
    });

    describe('Definition', () => {
        it('should ignore', () => {
            const tree = { type: 'definition', identifier: 'test' };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.an('undefined');
        });
    });

    describe('FootnoteDefinition', () => {
        it('should ignore', () => {
            const tree = { type: 'footnoteDefinition' };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.an('undefined');
        });
    });

    describe('TextNode', () => {
        it('should replace node with its value', () => {
            const tree = { type: 'text', value: 123 };
            const bjson = toBemjson(tree);

            expect(bjson).to.be.equal(123);
        });
    });
});
