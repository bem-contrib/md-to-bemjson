
# mdast-util-to-bemjson
Transforms MDAST tree to bemjson regarding to [rules](/doc/rules.md).

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[npm]:            https://www.npmjs.org/package/mdast-util-to-bemjson
[npm-img]:        https://img.shields.io/npm/v/mdast-util-to-bemjson.svg

[travis]:         https://travis-ci.org/birhoff/mdast-util-to-bemjson
[test-img]:       https://img.shields.io/travis/birhoff/mdast-util-to-bemjson.svg?label=tests

[coveralls]:      https://coveralls.io/r/birhoff/mdast-util-to-bemjson
[coverage-img]:   https://img.shields.io/coveralls/birhoff/mdast-util-to-bemjson.svg

[david]:          https://david-dm.org/birhoff/mdast-util-to-bemjson
[dependency-img]: http://img.shields.io/david/birhoff/mdast-util-to-bemjson.svg

[greenkeeper]:    https://greenkeeper.io/
[greenkeeper-img]:https://badges.greenkeeper.io/birhoff/mdast-util-to-bemjson.svg

## Requirements

* [Node.js 8+](https://nodejs.org/en/)

## Install

```sh
$ npm install mdast-util-to-bemjson
```

## Usage

```js
const unified = require('unified');
const markdown = require('remark-parse');
const toBemjson = require('mdast-util-to-bemjson');

const mdast = unified().use(markdown).parse('# Hello im _heading_');
const bjson = toBemjson(mdast);

console.log(JSON.stringify(bjson, null, 4));
```
Yields:
```json
{
    "block": "md-root",
    "content": {
        "block": "heading",
        "mods": {
            "level": 1
        },
        "level": 1,
        "content": [
            "Hello im ",
            {
                "block": "emphasis",
                "content": "heading"
            }
        ]
    }
}
```

## API

### `toBemjson(mdastTree[, options])`

#### `options`
* *Function* **augment** — callback called on every node.

### `augment(bemNode):bemNode`. *Important*: Must return bemNode.

#### `bemNode` - representation of bem entity (block, elem, mod, props)



License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
