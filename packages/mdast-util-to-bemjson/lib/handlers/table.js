'use strict';

const parseBlock = require('../build-node').parse;

function table(transform, node) {
    const block = parseBlock(node.type);
    const children = node.children || [];

    const props = {};
    node.align && (props.align = node.align);

    if (!node.children) return transform(node, block, props);

    block.rows = children.map(row => {
        return (row.children || []).map(cell => transform(cell, null, null).content);
    });

    return transform(node, block, props, null);
}

module.exports = table;
