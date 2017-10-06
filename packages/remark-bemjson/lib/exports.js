'use strict';

const assert = require('assert');

/**
 * Enum for export types
 *
 * @readonly
 * @enum {String}
 */
const ExportType = {
    /** Exports as commonJS module */
    COMMON_JS: 'commonJS',
    /** Exports as ES6 module */
    MODULES: 'modules',
    /** Export UMD */
    UMD: 'umd',
    /** Export as YModules */
    Y_MODULES: 'YModules',
    /** No don't add any wrap */
    NO_EXPORT: 'no export'
};

/**
 * Create export for one of provided modules
 *
 * @param {Object} exportOptions - export type and name
 * @param {ExportType} exportOptions.type - export type
 * @param {String} [exportOptions.name] - export name, required for browser modules
 * @param {String} content - bemjson content
 * @returns {String}
 */
function createExport(exportOptions, content) {
    if (!content) return content;

    const type = exportOptions.type;
    const name = exportOptions.name;
    const exportFunction = exportFabric(type);

    return exportFunction(name, content);
}

function exportFabric(type) {
    switch (type) {
        case ExportType.COMMON_JS: {
            return commonJSExport;
        }
        case ExportType.MODULES: {
            return modulesExport;
        }
        case ExportType.UMD: {
            return umdExport;
        }
        case ExportType.Y_MODULES: {
            return yModulesExport;
        }
        case ExportType.NO_EXPORT: {
            return (name, content) => content;
        }
    }

    throw new Error('Not supported exportType "' + type + '"');
}

function commonJSExport(name, content) {
    return `module.exports = ${content};\n`;
}

function modulesExport(name, content) {
    const exportVariable = name ? `const ${name} = ` : '';
    return `export default ${exportVariable}${content};\n`;
}

function umdExport(name, content) {
    assert(name, 'exportName must be set up with UMD export.');

    return require('umd')(name, content);
}

function yModulesExport(name, content) {
    assert(name, 'exportName must be set up with YModules export.');

    return [
        `modules.define(${name}, [], function(provide) {`,
        `    provide(${content})`,
        '});'
    ].join('\n');
}

module.exports = createExport;
module.exports.ExportType = ExportType;
