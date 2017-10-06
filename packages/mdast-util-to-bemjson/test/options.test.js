'use strict';

const expect = require('chai').expect;

const toBemjson = require('../index');

describe('Test converter options', () => {
    describe('Test options.augment', () => {

        it('should not change flow without option `augment`', () => {
            const bjast = toBemjson({ type: 'root' });

            expect(bjast).to.deep.equal({ block: 'md-root' });
        });

        it('should change bemjson with option `augment`', () => {
            const bjson = toBemjson({ type: 'root' }, { augment: augmentCallback });

            function augmentCallback(bemNode) {
                expect(bemNode).to.have.property('block', 'md-root');
                bemNode.block = 'my-root';
                return bemNode;
            }

            expect(bjson).to.have.property('block', 'my-root');
        });
    });
});
