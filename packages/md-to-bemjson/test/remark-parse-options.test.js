'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;

const expect = require('chai').expect;

const Converter = require('../index');

describe('remark-parse-options', () => {
    it('should escape characters \' \\__\'', () => {
        const bjson = Converter.convertSync('# sssss \\__text\\__text2');

        expect(bjson, 'Doesn\'t escape \\_').to.deep.equal({
            block: 'md-root',
            content: {
                block: 'heading',
                content: ['sssss ', '_', '_text', '_', '_text2'],
                level: 1,
                mods: { level: 1 }
            }
        });
    });
});
