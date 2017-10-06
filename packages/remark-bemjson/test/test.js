'use strict';

const expect = require('chai').expect;
const remark = require('remark');
const vFile = require('vfile');
const nodeEval = require('node-eval');

const bemjson = require('../index');

function compare(tree, expected, options) {
    const bjsonString = remark().use(bemjson, options).stringify(tree);
    expect(tree.type === 'root' ? nodeEval(bjsonString) : JSON.parse(bjsonString)).to.deep.equal(expected);
}

describe('remark-bemjson()', () => {
    it('should be a function', () => {
        expect(bemjson).to.be.a('function');
    });

    it('should not throw exception when called without args', () => {
        expect(() => bemjson.call(remark())).to.not.throw(Error);
    });

    it('should throw should throw when not given a node', () => {
        expect(() => {
            remark().use(bemjson).stringify({
                type: 'root',
                children: [{ value: 'baz' }]
            });
        }).to.throw('Expected node, got \'[object Object]\'');
    });

    it('should stringify unknown nodes', () => {
        compare({ type: 'alpha' }, { block: 'alpha' });
    });

    it('should stringify unknown nodes with children', () => {
        compare({
            type: 'alpha', children: [{ type: 'strong', children: [{ type: 'text', value: 'bravo' }] }]
        }, {
            block: 'alpha', content: { block: 'strong', content: 'bravo' }
        });
    });

    it('should add `module.exports =` to the root', () => {
        const bjsonString = remark().use(bemjson).stringify({ type: 'root' });
        expect(bjsonString).to.contain('module.exports =');
    });

    it('should replace file extension with `.bemjson.js`', () => {
        const file = vFile({ path: '~/example.md', contents: 'Alpha *braavo* charlie.' });
        file.extname = '.md';

        const bjsonFile = remark().use(bemjson).processSync(file);

        expect(bjsonFile.basename).to.equal('example.bemjson.js');
    });

    it('should not generate content with export=false', () => {
        const file = vFile({ path: '~/example.md', contents: 'Alpha *braavo* charlie.' });
        file.extname = '.md';

        const bjsonFile = remark().use(bemjson, { 'export': false }).processSync(file);

        expect(bjsonFile.data).to.have.property('block', 'md-root');
        expect(bjsonFile.toString()).to.equal('');
    });
});
