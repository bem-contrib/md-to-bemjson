'use strict';

const fs = require('fs');

const expect = require('chai').expect;

const Converter = require('../index');
const md = fs.readFileSync(__dirname + '/test-assets/test.md');

describe('test', () => {
    it('should convert md to bemjson', () => {
        const bjson = Converter.convertSync(md);
        expect(bjson).to.deep.equal(require('./test-assets/test.bemjson'));
    });

    it('should success with usage example', () => {
        const toBemjson = require('../index').convertSync;
        const bemjson = toBemjson('# Hello world');

        expect(bemjson).to.deep.equal({
            block: 'md-root',
            content: {
                block: 'heading',
                content: 'Hello world',
                level: 1,
                mods: {
                    level: 1
                }
            }
        });
    });
});
