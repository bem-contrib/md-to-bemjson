'use strict';

const parseBlock = require('../build-node').parse;

function heading(transform, node) {
    const level = node.depth;
    const block = parseBlock(node.type);

    block.mods = { level };

    const props = { level };

    return transform(node, block, props, node.value);
}

module.exports = heading;
