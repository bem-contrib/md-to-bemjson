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
    const handler = transform.handlers[type] || transform.handlers.default;

    assert(type, `Expected node, got '${node}'`);

    return handler(transform, node, parent);
}

function traverseChildren(transform, parent) {
    const nodes = parent.children || [];
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
