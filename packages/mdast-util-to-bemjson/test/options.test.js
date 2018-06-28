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

        it('should rewrite bundled handlers with passed ones via `handlers` option', () => {
            const bjson = toBemjson({ type: 'text', value: 'testcode' }, { handlers: {
                text(transform, node) {
                    return transform(node, { block: node.value });
                }
            } });

            expect(bjson).to.have.property('block', 'testcode');
        });

        it('should rewrite bundled handlers with passed default `handler`', () => {
            const bjson = toBemjson({ type: 'text' }, { handlers: {
                default(transform, node) {
                    return transform(node, { block: 'default' });
                }
            } });

            expect(bjson).to.have.property('block', 'default');
        });

        it('should prefer non-default `handler` over default one', () => {
            const bjson = toBemjson({ type: 'text' }, { handlers: {
                default(transform, node) {
                    return transform(node, { block: 'default' });
                },
                text(transform, node) {
                    return transform(node, { block: 'text' });
                }
            } });

            expect(bjson).to.have.property('block', 'text');
        });

        it('should provide `__base` method to context with bundled handler', () => {
            const bjson = toBemjson({ type: 'something' }, { handlers: {
                default(transform, node) {
                    return this.__base(transform, node);
                }
            } });

            expect(bjson).to.have.property('block', 'something');
        });
    });
});
