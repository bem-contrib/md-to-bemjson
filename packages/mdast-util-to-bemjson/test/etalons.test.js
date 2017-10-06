'use strict';

const fs = require('fs');

const unified = require('unified');
const markdown = require('remark-parse');

const expect = require('chai').expect;

const toBemjson = require('../index');

const processor = unified().use(markdown);

describe('Test etalons', () => {
    it('should convert test.md', () => {
        const tree = processor.parse(fs.readFileSync(__dirname + '/test-assets/test.md'));
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal(require('./test-assets/test.bemjson'));
    });
});
