'use strict';

const AssertionError = require('assert').AssertionError;

const remark = require('remark');

const bemjson = require('../index');

const UMD_STRING = '(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.bemjson = f()}})(function(){var define,module,exports;\n{\n    "block": "md-root"\n}\n});\n';

function compare(tree, expected, options) {
    const bjsonString = remark().use(bemjson, options).stringify(tree);
    expect(bjsonString).to.startsWith(expected);
}

describe('remark-bemjson()', () => {

    it('should stringify as commonJS without options', () => {
        compare({ type: 'root' }, 'module.exports = ');
    });

    it('should stringify as commonJS with `exportType=commonJS`', () => {
        compare({ type: 'root' }, 'module.exports = ', { exportType: 'commonJS' });
    });

    it('should stringify as modules with `exportType=modules`', () => {
        compare({ type: 'root' }, 'export default ', { exportType: 'modules' });
    });

    it('should stringify as modules with variable with `exportType=modules` and `exportName=bemjson`', () => {
        compare({ type: 'root' }, 'export default const bemjson = ', { exportType: 'modules', exportName: 'bemjson' });
    });

    it('should stringify as UMD with `exportType=umd` and `exportName=bemjson`', () => {
        expect(remark().use(bemjson, {
            exportType: 'umd',
            exportName: 'bemjson'
        }).stringify({ type: 'root' })).to.equal(UMD_STRING);
    });

    it('should stringify as YModules with `exportType=YModules` and `exportName=bemjson`', () => {
        expect(remark().use(bemjson, {
            exportType: 'YModules',
            exportName: 'bemjson'
        }).stringify({ type: 'root' })).to.equal('modules.define(bemjson, [], function(provide) {\n    provide({\n    "block": "md-root"\n})\n});');
    });

    it('should stringify as json with `exportType=no export`', () => {
        expect(remark().use(bemjson, {
            exportType: 'no export'
        }).stringify({ type: 'root' })).to.equal('{\n    "block": "md-root"\n}');
    });

    it('should throw assertion Exception with `exportType=umd` without `exportName`', () => {
        expect(() => remark().use(bemjson, { exportType: 'umd' }).stringify({ type: 'root' })).to.throw(AssertionError);
    });

    it('should throw assertion Exception with `exportType=YModules` without `exportName`', () => {
        expect(
            () => remark().use(bemjson, { exportType: 'YModules' }).stringify({ type: 'root' })
        ).to.throw(AssertionError);
    });

    it('should throw Error with `exportType=unsupported`', () => {
        expect(
            () => remark().use(bemjson, { exportType: 'unsupported' }).stringify({ type: 'root' })
        ).to.throw('Not supported exportType');
    });
});
