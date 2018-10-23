'use strict';

const parseBlock = require('../build-node').parse;

function list(transform, node) {
    const block = parseBlock(node.type);

    const props = { ordered: node.ordered, spread: node.spread };
    if (typeof node.start === 'number' && node.start !== 1) {
        props.start = node.start;
    }

    if (node.ordered) {
        block.mods = { ordered: node.ordered };
    }

    return transform(node, block, props, node.value);
}

module.exports = list;
