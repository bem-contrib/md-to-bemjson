'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;

const expect = require('chai').expect;

const toBemjson = require('../index');

describe('Common tests', () => {

    it('should not create array for content with 1 element', () => {
        const tree = { type: 'node', children: [{ type: 'child-node' }] };
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({
            block: 'node',
            content: { block: 'child-node' }
        });
    });

    it('should decamelize node.type', () => {
        const tree = { type: 'MyNodeType' };
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({ block: 'my-node-type' });
    });

    it('should extend context with hProps', () => {
        const tree = { type: 'MyNodeType', data: { htmlAttributes: { id: '222' }, hProperties: { prop: 1 } } };
        const bjson = toBemjson(tree);

        expect(bjson).to.deep.equal({
            attrs: {
                id: '222'
            },
            block: 'my-node-type',
            data: {
                hProperties: {
                    prop: 1
                },
                htmlAttributes: {
                    id: '222'
                }
            },
            hProps: {
                prop: 1
            }
        });
    });
});
