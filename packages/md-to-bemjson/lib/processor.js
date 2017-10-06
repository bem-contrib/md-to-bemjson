'use strict';

const defaultsDeep = require('lodash.defaultsdeep');

const unified = require('unified');
const parse = require('remark-parse');
const stringify = require('remark-stringify');

const github = require('remark-github');
const inlineLinks = require('remark-inline-links');
const bemjson = require('remark-bemjson');

const augmentFactory = require('./augment');
const defaults = require('./defaults');

/**
 * @typedef {Object} MDConverter~PluginOptions
 * @property {Object|Boolean} [github] - github integrations options @see {@link https://github.com/wooorm/remark-github}
 * @property {MDConverter~StringifyOptions.exportType} [exportType] - export type when stringify
 * @property {MDConverter~StringifyOptions.exportName} [exportName] - export name when stringify
 * @property {function|MDConverter~AugmentOptions} [augment] - export name when stringify
 * @property {Array<{plugin:Function, options:Object}>} [plugins] - list of remark compatible plugins
 */

/**
 * @typedef {Object} MDConverter~AugmentOptions
 * @property {string} [prefix] - add prefix to all blocks
 * @property {string} [scope] - name of new root block. All blocks become elements
 * @property {Object} [map] - hash of key:blockName, value:newBlockName
 * @property {Object} [html] - options for converting html to bemjson
 */

/**
 *
 * @param {MDConverter~PluginOptions} options - converter options
 * @returns {this}
 */
function createProcessor(options) {
    options || (options = {});
    /** @type MDConverter~PluginOptions */
    const settings = defaultsDeep({}, options, defaults);
    const remark = unified()
        .use(parse, { commonmark: true })
        .use(stringify)
        .freeze();

    const processor = remark().use(inlineLinks);

    if (settings.augment && typeof settings.augment !== 'function') {
        settings.augment = augmentFactory(settings.augment);
    }

    if (settings.github) {
        processor.use(github, settings.github);
    }

    if (settings.plugins) {
        settings.plugins.forEach(item => {
            processor.use(item.plugin, item.options);
        });
    }

    return processor.use(bemjson, settings).freeze();
}

module.exports.create = createProcessor;
