'use strict';

const parseBlock = require('../build-node').parse;

function html(transform, node) {
    const block = parseBlock(node.type);

    return transform(node, block, null, node.value);
}

module.exports = html;
