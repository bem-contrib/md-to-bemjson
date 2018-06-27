'use strict';

const assert = require('assert');

/**
 * Traverse MDAST tree
 *
 * @param {*} transform - transform function
 * @param {Object} node - MDAST node
 * @param {Object} [parent] - MDAST parent node
 * @returns {*}
 */
function traverse(transform, node, parent) {
    const type = node && node.type;
    assert(type, `Expected node, got '${node}'`);

    const baseHandler = transform.handlers[type] || transform.handlers.default;
    const userHandler = transform.userHandlers[type] || transform.userHandlers.default;
    const handler = userHandler ? userHandler.bind({ __base: baseHandler }) : baseHandler;

    return handler(transform, node, parent);
}

function traverseChildren(transform, parent, key) {
    key || (key = 'children');

    const nodes = parent[key];
    if (!Array.isArray(nodes) || !nodes.length) {
        return [];
    }

    const length = nodes.length;

    let values = [];
    let index = -1;
    let result;

    while (++index < length) {
        result = traverse(transform, nodes[index], parent);

        if (result) {
            values = values.concat(result);
        }
    }

    return values.length === 1 ? values[0] : values;
}

traverse.children = traverseChildren;

module.exports = traverse;
