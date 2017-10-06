'use strict';

const defaultsDeep = require('lodash.defaultsdeep');
const toBemjson = require('mdast-util-to-bemjson');

const createExport = require('./exports');
const defaults = require('./defaults');

/**
 * remark bemjson compiler plugin
 *
 * @param {Object} options - plugin options
 * @param {ExportType} [options.exportType=commonJS] - export type.
 * @param {string} [options.exportName] - if export to browser requires name.
 * @param {Function} [options.augment] - transform callback.
 */
function plugin(options) {
    options = defaultsDeep({}, options, defaults);

    this.Compiler = compiler;

    function compiler(node, file) {
        const root = node && node.type && node.type === 'root';
        const bemjson = toBemjson(node, { augment: options.augment });

        const bjsonString = options.export ? JSON.stringify(bemjson, null, 4) : '';

        if (file.extname) {
            file.extname = '.js';
        }

        if (file.stem) {
            file.stem = file.stem + '.bemjson';
        }

        file.data = bemjson;

        return root ? createExport({ type: options.exportType, name: options.exportName }, bjsonString) : bjsonString;
    }
}

module.exports = plugin;
module.exports.ExportType = require('./exports').ExportType;
