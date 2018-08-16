'use strict';

const assert = require('assert');

const _ = require('lodash');

const traverse = require('./traverse');
const handlers = require('./handlers');
const parseBemNode = require('./build-node').parse;
const build = require('./build-node').build;
const definitions = require('mdast-util-definitions');

const DEFAULTS = require('./defaults');

/**
 * @typedef {Object} BjsonConverter~TransformOptions
 * @property {BjsonConverter~augmentCallback} [augment] - Function that augments bemNode with custom logic
 */

/**
 * Create transform function that translate MDAST node to bemjson block
 *
 * @param {Object} tree - MDAST tree
 * @param {BjsonConverter~TransformOptions} [options] - transform options
 * @returns {BjsonConverter~transform} transform function
 */
function transformFactory(tree, options) {
    const settings = _.defaultsDeep({}, options, DEFAULTS);

    /**
     * Transform MDAST node to bemNode
     *
     * @param {Object} node - MDAST node
     * @param {Object} entity - bem entity, partial representation of bemNode
     * @param {Object} [props] - bemNode properties
     * @param {Object|Array|String} [content] - bemNode content
     * @returns {Object} bemNode
     */
    const transform = function(node, entity, props, content) {
        const hasContent = (!entity || entity.content !== null) && content !== null;
        const entityContent = hasContent ?
            ((entity && entity.content) || content || traverse.children(transform, node)) :
            null;
        const block = parseBemNode(entity);
        const bemNode = build(block, props, entityContent);

        // Extend blocks context with external plugins hContext
        if (node.data) {
            node.data.htmlAttributes && (bemNode.attrs = Object.assign({}, bemNode.attrs, node.data.htmlAttributes));
            node.data.hProperties && (bemNode.hProps = node.data.hProperties);
        }

        return transform.augment(bemNode);
    };

    transform.userHandlers = Object.assign({}, settings.handlers);
    transform.handlers = Object.assign({}, handlers);
    transform.options = settings;
    transform.augment = augmentFactory(settings.augment);
    transform.definition = definitions(tree, options);

    /**
     * Create augment function, for apply custom transformations
     *
     * @param {BjsonConverter~augmentCallback} augmentFunction - callback with custom augmentation
     * @returns {BjsonConverter~augment}
     */
    function augmentFactory(augmentFunction) {

        /**
         * Apply custom augmentation and insert back to subtree
         *
         * @function AugmentFunction
         * @param {Object} bemNode - representation of bem entity
         * @returns {Object} bemNode
         */
        function augment(bemNode) {
            const hasChildren = _hasChildren(bemNode.content);
            const bemNodeClone = hasChildren ? _.omit(bemNode, ['content']) : _.cloneDeep(bemNode);
            const augmentedBemNode = augmentFunction(bemNodeClone);

            /* Check that if we has children augmentation doesn't modify content */
            assert(
                !hasChildren || !augmentedBemNode.content,
                'You are not allow to modify subtree of bemNode. To do that please use bem-xjst@'
            );

            if (hasChildren) {
                augmentedBemNode.content = bemNode.content;
            }

            return augmentedBemNode;
        }

        return augment;
    }

    return transform;
}

/**
 * Check is content of bemNode value, or children
 *
 * @param {Object|Array|String|undefined} content - bemNode content
 * @returns {Boolean} is content of bemNode are children
 * @private
 */
function _hasChildren(content) {
    if (!content) return false;
    if (typeof content === 'object') return true;
    if (Array.isArray(content) && content.every(item => typeof item === 'string')) return false;
    return false;
}

module.exports = transformFactory;
