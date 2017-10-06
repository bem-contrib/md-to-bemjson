'use strict';

const expect = require('chai').expect;

const Converter = require('../index');

describe('API', () => {
    describe('static', () => {
        it('should `.convert` async', () => {
            const bjsonPromise = Converter.convert('# hello world');

            expect(bjsonPromise.then).to.be.a('function');

            expect(bjsonPromise).to.eventually.has.property('block');
            expect(bjsonPromise).to.eventually.has.property('content');
        });

        it('should `.convertSync` sync', () => {
            const bjson = Converter.convertSync('#hello world');

            expect(bjson.then).not.to.be.a('function');

            expect(bjson).to.has.property('block');
            expect(bjson).to.has.property('content');
        });

        it('should `.stringify` async', () => {
            const bjsonPromise = Converter.stringify('#hello world');

            expect(bjsonPromise.then).to.be.a('function');
            expect(bjsonPromise).to.eventually.be.a('string');

            return expect(bjsonPromise).to.fulfilled;
        });

        it('should `.stringifySync` sync', () => {
            const bjson = Converter.stringifySync('#hello world');

            expect(bjson.then).not.to.be.a('function');
            expect(bjson).to.be.a('string');
        });
    });

    describe('methods', () => {
        it('should `.convert` async', () => {
            const bjsonPromise = (new Converter()).convert('# Hello world');

            expect(bjsonPromise.then).to.be.a('function');

            expect(bjsonPromise).to.eventually.has.property('block');
            expect(bjsonPromise).to.eventually.has.property('content');
        });

        it('should `.convertSync` sync', () => {
            const bjson = (new Converter()).convertSync('#hello world');

            expect(bjson.then).not.to.be.a('function');

            expect(bjson).to.has.property('block');
            expect(bjson).to.has.property('content');
        });

        it('should `.stringify` async', () => {
            const bjsonPromise = (new Converter()).stringify('#hello world');

            expect(bjsonPromise.then).to.be.a('function');
            expect(bjsonPromise).to.eventually.be.a('string');

            return expect(bjsonPromise).to.fulfilled;
        });

        it('should `.stringifySync` sync', () => {
            const bjson = (new Converter()).stringifySync('#hello world');

            expect(bjson.then).not.to.be.a('function');
            expect(bjson).to.be.a('string');
        });
    });
});
