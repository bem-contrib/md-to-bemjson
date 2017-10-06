'use strict';

const detab = require('detab');

const parseBlock = require('../build-node').parse;

function code(transform, node) {
    const value = node.value ? detab(node.value + '\n') : '';
    const lang = node.lang;

    const result = {
        block: 'code',
        content: value
    };

    const props = {};
    lang && (props.lang = lang);

    return transform(node, parseBlock(result), props);
}

module.exports = code;
