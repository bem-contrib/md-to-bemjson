'use strict';

const parseBlock = require('../build-node').parse;

const defaultTypesMap = {
    root: 'md-root'
};

function unsupported(transform, node) {
    const block = parseBlock(defaultTypesMap[node.type] || node.type);

    const props = Object.assign({}, node);
    delete props.type;
    delete props.value;
    delete props.children;
    delete props.position;

    return transform(node, block, props, node.value);
}

module.exports = unsupported;
