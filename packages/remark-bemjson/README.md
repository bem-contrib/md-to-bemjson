# remark-bemjson
Compile markdown to BEMJSON with [**remark**](https://github.com/wooorm/remark).

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[npm]:            https://www.npmjs.org/package/remark-bemjson
[npm-img]:        https://img.shields.io/npm/v/remark-bemjson.svg

[travis]:         https://travis-ci.org/birhoff/remark-bemjson
[test-img]:       https://img.shields.io/travis/birhoff/remark-bemjson.svg?label=tests

[coveralls]:      https://coveralls.io/r/birhoff/remark-bemjson
[coverage-img]:   https://img.shields.io/coveralls/birhoff/remark-bemjson.svg

[david]:          https://david-dm.org/birhoff/remark-bemjson
[dependency-img]: http://img.shields.io/david/birhoff/remark-bemjson.svg

[greenkeeper]:    https://greenkeeper.io/
[greenkeeper-img]:https://badges.greenkeeper.io/birhoff/remark-bemjson.svg

## Requirements

* [Node.js 4+](https://nodejs.org/en/)

## Install

```sh
$ npm install remark-bemjson
```

## Usage

```js
const remark = require('remark');
const bemjson = require('remark-bemjson');

const file = remark().use(bemjson).processSync('# Hello im _heading_');

console.log(String(file));
```
Yields: 
```json
{
  "block": "documentation",
  "content": {
    "block": "heading",
    "mods": {
      "level": 1
    },
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

### `remark.use(bemjson[, options])`

#### `options`

##### *string* exportType - determinate how to export bemjson. Default: `commonJS`

Value      | Description
-----------|------------
`commonJS` | Exports to [CJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules).
`modules`  | Exports to [ES6 modules](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export). Optional combines with `exportName`. 
`umd`      | Exports to [UMD](https://github.com/umdjs/umd) with [umd package](https://github.com/ForbesLindesay/umd). *Requires* exportName.
`YModules` | Exports to [YModules](https://github.com/ymaps/modules). *Requires* exportName.
`no export`| Don't do any export. Just plain `JSON.stringify`.

##### *string* exportName - export bemjson with given name when use `modules`, `umd` or `YModules`.

##### *boolean* export - if `false` don't generate export. Default: `true` 

##### *Function* augment - callback called on every node. [Signature](https://github.com/birhoff/mdast-util-to-bemjson#augmentbemnodebemnode-important-must-return-bemnode). Option passed to [`mdast-util-to-bemjson`](https://github.com/birhoff/mdast-util-to-bemjson).


License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).
