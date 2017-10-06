'use strict';

const normalize = require('normalize-uri');

const parseBlock = require('../build-node').parse;

function link(transform, node) {
    const block = parseBlock(node.type);

    const props = { href: normalize(node.url) };
    node.title && (props.title = node.title);

    return transform(node, block, props, node.value);
}

module.exports = link;
