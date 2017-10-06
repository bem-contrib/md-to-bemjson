'use strict';

const traverse = require('./traverse');
const transformFactory = require('./transform');

/**
 * Augments bemNode with custom logic
 *
 * @callback BjsonConverter~augmentCallback
 * @param {Object} bemNode - representation of bem entity
 * @returns {Object} - must return bemNode
 */

/**
 * Transform `tree`, which is an MDAST node, to a Bemjson node.
 *
 * @param {Node} tree - MDAST tree
 * @param {Object} options - transform options
 * @return {Object}
 */
function toBemjson(tree, options) {
    const transform = transformFactory(tree, options);

    return traverse(transform, tree);
}

/**
 * @class BjsonConverter
 * @type {toBemjson}
 */
module.exports = toBemjson;
