'use strict';

const describe = require('mocha').describe;
const it = require('mocha').it;

const sinon = require('sinon');

const ExportType = require('remark-bemjson').ExportType;

const Converter = require('../index');

describe('Options', () => {
    it('should add github support with `github=true`', () => {
        const bjson = Converter.convertSync('@birhoff', { github: true });
        const link = bjson.content.content;

        expect(link).to.have.property('block', 'link');
        expect(link).to.have.property('content');
        expect(link).to.have.property('href', 'https://github.com/birhoff');
    });

    it('should not add github support with `github=false`', () => {
        const bjson = Converter.convertSync('@birhoff', { github: false });
        const content = bjson.content.content;

        expect(content).to.be.a('string');
    });

    it('should not add github support with no `github` option', () => {
        const bjson = Converter.convertSync('@birhoff');
        const content = bjson.content.content;

        expect(content).to.be.a('string');
    });

    it('should extract `exportType` option from constructor params', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES }));
        const bjsonString = md2bemjson.stringifySync('hello');

        expect(bjsonString).to.startsWith('export default ');
    });

    it('should extract `exportName` option from constructor params', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES, exportName: 'bemjson' }));
        const bjsonString = md2bemjson.stringifySync('hello');

        expect(bjsonString).to.startsWith('export default const bemjson = ');
    });

    it('should override `exportType` constructor option with `.stringifySync(text, { exportType })`', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.NO_EXPORT }));
        const bjsonString = md2bemjson.stringifySync('hello', { exportType: ExportType.MODULES });

        expect(bjsonString).to.startsWith('export default ');
    });

    it('should override `exportName` constructor option with `.stringifySync(text, { exportName })`', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES, exportName: 'noName' }));
        const bjsonString = md2bemjson.stringifySync('hello', { exportName: 'hasName' });

        expect(bjsonString).to.startsWith('export default const hasName = ');
    });

    it('should override `exportType` constructor option with `.stringify(text, { exportType })`', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.NO_EXPORT }));
        const bjsonPromise = md2bemjson.stringify('hello', { exportType: ExportType.MODULES });

        expect(bjsonPromise.then).to.be.a('function');
        bjsonPromise.then(result => {
            expect(result).to.startsWith('export default ');
        });

        return bjsonPromise;
    });

    it('should override `exportName` constructor option with `.stringify(text, { exportName })`', () => {
        const md2bemjson = (new Converter({ exportType: ExportType.MODULES, exportName: 'noName' }));
        const bjsonPromise = md2bemjson.stringify('hello', { exportName: 'hasName' });

        expect(bjsonPromise.then).to.be.a('function');
        bjsonPromise.then(result => {
            expect(result).to.startsWith('export default const hasName = ');
        });

        return bjsonPromise;
    });

    describe('augment', () => {

        it('should accept augment as params', () => {
            const bjson = Converter.convertSync('# hello', { augment: {} });
            const heading = bjson.content;

            expect(heading).to.have.property('block', 'heading');
        });

        it('should accept augment as function', () => {
            const testAugment = bemNode => {
                bemNode.block = 'test-block';
                return bemNode;
            };
            const bjson = Converter.convertSync('# hello', { augment: testAugment });
            const heading = bjson.content;

            expect(heading).to.have.property('block', 'test-block');
        });

        describe('prefix', () => {
            it('should add prefix', () => {
                const bjson = Converter.convertSync('# hello', { augment: { prefix: 'my-' } });
                const heading = bjson.content;

                expect(heading).to.have.property('block', 'my-heading');
            });

            it('should not add prefix', () => {
                const bjson = Converter.convertSync('# hello', { augment: {} });
                const heading = bjson.content;

                expect(heading).to.have.property('block', 'heading');
            });

            it('should throw assert', () => {
                expect(() =>
                    Converter.convertSync('# hello', { augment: { prefix: {} } })
                ).to.throw('options.prefix must be string');
            });

            it('should replace prefix on `md-root`', () => {
                const bjson = Converter.convertSync('# hello', { augment: { prefix: 'my-' } });

                expect(bjson).to.have.property('block', 'my-root');
            });
        });

        describe('scope', () => {
            it('should replace root with scope', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'my-root' } });

                expect(bjson).to.have.property('block', 'my-root');
            });

            it('should replace block with elem', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'my-root' } });
                const heading = bjson.content;

                expect(heading).to.have.property('elem', 'heading');
                expect(heading).to.not.have.property('block');
            });

            it('should replace mods with elemMods', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'my-root' } });
                const heading = bjson.content;

                expect(heading).to.have.property('elemMods');
                expect(heading).to.not.have.property('mods');
            });

            it('should throw assert', () => {
                expect(() =>
                    Converter.convertSync('# hello', { augment: { scope: {} } })
                ).to.throw('options.scope must be string');
            });
        });

        describe('map', () => {
            it('should replace md-root with custom-root', () => {
                const bjson = Converter.convertSync('# hello', { augment: { map: { 'md-root': 'custom-root' } } });

                expect(bjson).to.have.property('block', 'custom-root');
            });

            it('should replace heading and don\'t replace root', () => {
                const bjson = Converter.convertSync('# hello', { augment: { map: { heading: 'custom-heading' } } });
                const heading = bjson.content;

                expect(bjson).to.have.property('block', 'md-root');
                expect(heading).to.have.property('block', 'custom-heading');
            });

            it('should throw assert', () => {
                expect(() =>
                    Converter.convertSync('# hello', { augment: { map: { 'md-root': {} } } })
                ).to.throw('options.map: new name of ');
            });
        });

        describe('html', () => {
            it('should replace html with bemjson', () => {
                const bjson = Converter.convertSync('<div class="my-block"/>', { augment: { html: {} } });
                const html = bjson.content;
                const customBlock = html.content;

                expect(html).to.have.property('block', 'html');
                expect(customBlock).to.have.property('block', 'my-block');
            });
        });

        describe('combinations', () => {
            it('should replace prefixed blocks with elems', () => {
                const bjson = Converter.convertSync('# hello', { augment: { scope: 'scope', prefix: 'prefix-' } });
                const heading = bjson.content;

                expect(bjson).to.have.property('block', 'scope');
                expect(heading).to.have.property('elem', 'prefix-heading');
                expect(heading).to.not.have.property('block');
            });

            it('should apply map->prefix->scope', () => {
                const bjson = Converter.convertSync('# hello', {
                    augment: {
                        scope: 'scope',
                        prefix: 'prefix-',
                        map: { heading: 'custom-heading', 'md-root': 'custom-root' }
                    }
                });
                const heading = bjson.content;

                expect(bjson).to.have.property('block', 'scope');
                expect(heading).to.have.property('elem', 'prefix-custom-heading');
                expect(heading).to.not.have.property('block');
            });
        });

        describe('plugins', () => {
            it('should add plugin to remark flow', () => {
                const spy = sinon.spy();

                Converter.convertSync('# hello', {
                    plugins: [
                        { plugin: spy, options: { a: 1 } }
                    ]
                });

                expect(spy.calledWith({ a: 1 }), 'Plugins doesn\'t included').to.be.ok;
            });
        });
    });
});
