# md-to-bemjson
Converts [markdown][markdown] to [bemjson][bemjson].

[![NPM Status][npm-img]][npm]
[![Travis Status][test-img]][travis]
[![Coverage Status][coverage-img]][coveralls]
[![Dependency Status][dependency-img]][david]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]

[npm]:            https://www.npmjs.org/package/md-to-bemjson
[npm-img]:        https://img.shields.io/npm/v/md-to-bemjson.svg

[travis]:         https://travis-ci.org/bem-contrib/md-to-bemjson
[test-img]:       https://img.shields.io/travis/bem-contrib/md-to-bemjson.svg?label=tests

[coveralls]:      https://coveralls.io/r/bem-contrib/md-to-bemjson
[coverage-img]:   https://img.shields.io/coveralls/bem-contrib/md-to-bemjson.svg

[david]:          https://david-dm.org/bem-contrib/md-to-bemjson
[dependency-img]: http://img.shields.io/david/bem-contrib/md-to-bemjson.svg

[greenkeeper]:    https://greenkeeper.io/
[greenkeeper-img]:https://badges.greenkeeper.io/bem-contrib/md-to-bemjson.svg

## Requirements

* [Node.js 8+](https://nodejs.org/en/)

## Install

```sh
$ npm install md-to-bemjson
```

## Usage

```js
const toBemjson = require('md-to-bemjson').convertSync;
const bjson = toBemjson('# Hello world');

console.log(JSON.stringify(bjson, null, 4));
```
Yields:
```json
{
    "block": "md-root",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "level": 1,
        "mods": {
            "level": 1
        }
    }
}
```

[Markdown][markdown] converter to [bemjson][bemjson]
----------------------------------------------------

Module use [remark][remark] with several plugins and custom compiler to convert [markdown][markdown] to [bemjson][bemjson].
Plugins divided into two groups: [necessary](#necessary-plugins)(you can't disable this plugins) and [optional](#optional-plugins).

### Necessary plugins:
* [remark-inline-links](https://github.com/wooorm/remark-inline-links) - [bemjson][bemjson] don't support references.

### Optional plugins:
* [remark-github](https://github.com/wooorm/remark-github) - [Github](github.com) integrations (issues, commits, mentions)

### Compiler
* [remark-bemjson][remark-bemjson] - custom [bemjson][bemjson] compiler


API
---

* [constructor(\[options\])](#constructoroptions)
* [convert(markdown)](#convertmarkdown--promise)
* [convertSync(markdown)](#convertsyncmarkdown--bemjson)
* [stringify(markdown)](#stringifymarkdown--promise)
* [stringifySync(markdown)](#stringifysyncmarkdown--string)
* [_static_ convert(markdown\[, options\])](#static-convertmarkdown--options--promise)
* [_static_ convertSync(markdown\[, options\])](#static-convertsyncmarkdown--options--bemjson)
* [_static_ stringify(markdown\[, options\])](#static-stringifymarkdown--options--promise)
* [_static_ stringifySync(markdown\[, options\])](#static-stringifysyncmarkdown--options--string)

### constructor(\[options\])

#### Options
Parameter    | Type                 | Description
-------------|----------------------|------------------------------
`github`     | _Object_, _boolean_            | Enables [github][github] support with [remark][remark] plugin [remark-github](https://github.com/wooorm/remark-github). Default `false`.
`exportType` | _enum<string>_       | [remark-bemjson][remark-bemjson] option. Exports to certain type with `.stringify`. Supported [exports](https://github.com/birhoff/remark-bemjson#string-exporttype---determinate-how-to-export-bemjson-default-commonjs).
`exportName` | _string_             | [remark-bemjson][remark-bemjson] option. Used with `exportType=(modules, umd, YModules)` stringify [bemjson][bemjson] with exported given name.
`augment`    | _Function_, _Object_ | Options for augmentation resulting [bemjson][bemjson] by every node. As function accepts bemNode and must return it.
`plugins`    | _Array<Object>_      | Options for additional [plugins][remark-plugins] to be included. Plugin format: `{ plugin: Function, options: Object }`

#### Options.augment
Parameter    | Type     | Description
-------------|----------|------------------------------
`prefix`     | _string_ | Add prefix to all blocks. __Important:__ for root replace original prefix.
`scope`      | _string_ | Replace root block with scope. And replace all blocks with elems.
`map`        | _Object_ | Replace block names with provided in map. [Available blocks](https://github.com/birhoff/mdast-util-to-bemjson/blob/master/doc/rules.md).
`html`       | _Object_ | Options for converting html to bemjson with [html2bemjson](https://github.com/bem-contrib/html2bemjson).

__Important:__ Augmentation flow is serial. Order: _map_, _prefix_, _scope_.
__Important:__ Other augmentations does not affect html.


### convert(markdown) => Promise<Bemjson>

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text

Asynchronously converts [markdown][markdown] to [bemjson][bemjson].

```js
const Converter = require('md-to-bemjson');
const md2Bemjson = new Converter();

md2Bemjson.convert('# Hello world').then(bjson => console.log(JSON.stringify(bjson, null, 4)))
```
Yields:
```json
{
    "block": "md-root",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "level": 1,
        "mods": {
            "level": 1
        }
    }
}
```

### convertSync(markdown) => Bemjson

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text

Synchronously converts [markdown][markdown] to [bemjson][bemjson].

```js
const Converter = require('md-to-bemjson');
const md2Bemjson = new Converter();

console.log(JSON.stringify(md2Bemjson.convertSync('# Hello world'), null, 4));
```
Yields:
```json
{
    "block": "md-root",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "level": 1,
        "mods": {
            "level": 1
        }
    }
}
```

### stringify(markdown \[, options\]) => Promise<String>

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text
`options` | _Object_  | Options prefixed with [`export*`](#options). __Important:__ Creates new processor. For better performance set options via constructor.

Asynchronously converts and stringify [markdown][markdown] to [bemjson][bemjson] module with exports.

```js
const Converter = require('md-to-bemjson');
const md2Bemjson = new Converter();

md2Bemjson.stringify('# Hello world').then(content => console.log(content))
```
Yields:
```js
module.exports = {
    block: 'md-root',
    content: {
        block: 'heading',
        content: 'Hello world',
        "level": 1,
        mods: {
            'level': 1
        }
    }
};
```

### stringifySync(markdown \[, options\]) => String

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text
`options` | _Object_  | Options prefixed with [`export*`](#options). __Important:__ Creates new processor. For better performance set options via constructor.

Synchronously converts and stringify [markdown][markdown] to [bemjson][bemjson] module with exports.

```js
const Converter = require('md-to-bemjson');
const md2Bemjson = new Converter();

console.log(md2Bemjson.stringifySync('# Hello world'));
 ```
Yields:
```js
module.exports = {
    block: 'md-root',
    content: {
        block: 'heading',
        content: 'Hello world',
        level: 1,
        mods: {
            'level': 1
        }
    }
};
```

### _static_ convert(markdown \[, options\]) => Promise<Bemjson>

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text
`options` | _Object_  | [plugin options](#options)

Asynchronously converts [markdown][markdown] to [bemjson][bemjson].

```js
const toBemjson = require('md-to-bemjson').convert;

toBemjson('# Hello world').then(bjson => console.log(JSON.stringify(bjson, null, 4)))
```
Yields:
 ```json
{
    "block": "md-root",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "level": 1,
        "mods": {
            "level": 1
        }
    }
}
```

### _static_ convertSync(markdown \[, options\]) => Bemjson

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text
`options` | _Object_  | [plugin options](#options)

Synchronously converts [markdown][markdown] to [bemjson][bemjson].

```js
const toBemjson = require('md-to-bemjson').convertSync;

console.log(JSON.stringify(toBemjson('# Hello world'), null, 4));
```
Yields:
```json
{
    "block": "md-root",
    "content": {
        "block": "heading",
        "content": "Hello world",
        "level": 1,
        "mods": {
            "level": 1
        }
    }
}
```

### _static_ stringify(markdown \[, options\]) => Promise<String>

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text
`options` | _Object_  | [plugin options](#options)

Asynchronously converts and stringify [markdown][markdown] to [bemjson][bemjson] module with exports.

```js
const toBemjsonString = require('md-to-bemjson').stringify;

toBemjsonString('# Hello world').then(bjson => console.log(JSON.stringify(bjson, null, 4)));
```
Yields:
```js
module.exports = {
    block: 'md-root',
    content: {
        block: 'heading',
        content: 'Hello world',
        level: 1,
        mods: {
            level: 1
        }
    }
};
```

### _static_ stringifySync(markdown \[, options\]) => String

Parameter | Type      | Description
----------|-----------|------------------------------
`markdown`| _string_  | Markdown text
`options` | _Object_  | [plugin options](#options)

Synchronously converts and stringify [markdown][markdown] to [bemjson][bemjson] module with exports.

```js
const toBemjsonString = require('md-to-bemjson').stringifySync;

console.log(toBemjsonString('# Hello world'));
```
Yields:
```js
module.exports = {
    block: 'md-root',
    content: {
        block: 'heading',
        content: 'Hello world',
        level: 1,
        mods: {
            'level': 1
        }
    }
};
```

License
-------

Code and documentation copyright 2017 YANDEX LLC. Code released under the [Mozilla Public License 2.0](LICENSE.txt).


[bemjson]: https://en.bem.info/platform/bemjson/
[remark-bemjson]: https://github.com/birhoff/remark-bemjson
[markdown]: https://wikipedia.org/wiki/Markdown
[github]: https://github.com/
[remark]: https://github.com/wooorm/remark
[remark-plugins]: https://github.com/wooorm/remark/blob/master/doc/plugins.md
