'use strict';

function ignore() {}

module.exports = {
    text: require('./text'),
    code: require('./code'),
    html: require('./html'),
    heading: require('./heading'),
    list: require('./list'),
    table: require('./table'),
    link: require('./link'),
    image: require('./image'),
    'default': require('./default'),

    // Ignored nodes
    footnote: ignore,
    linkReference: ignore,
    imageReference: ignore,
    footnoteReference: ignore,
    definition: ignore,
    footnoteDefinition: ignore
};
