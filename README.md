# es6-template-string
Easy and small template engine for the browser and nodejs

[![npm](https://img.shields.io/npm/v/es6-template-string.svg?style=flat-square)](https://www.npmjs.com/package/es6-template-string)
[![npm](https://img.shields.io/npm/dt/es6-template-string.svg?style=flat-square)](https://www.npmjs.com/package/es6-template-string)
[![npm](https://img.shields.io/npm/l/es6-template-string.svg?style=flat-square)](https://www.npmjs.com/package/es6-template-string)

# Install
```shell
npm install --save es6-template-string
```

# API
### render(str[, locals[, context]])
Render template `str` with variable `locals` in `context`

Example:
```js
var template = require('es6-template-string');

template.render('Node Version: ${ process.version }');
// It equals to
template('Node Version: ${ process.version }');
```

### compile(str)
Compile `str` and return a function that accept two parameters: `locals` and `context`

Example:
```js
var template = require('es6-template-string');

var getNodeVersion = template.compile('Node Version: ${ process.version }');
getNodeVersion([locals[, context]]);
```

# Usage
```js
var template = require('es6-template-string');

// This is hello, world
template('This is ${vars}', {vars: 'hello, world'});

// This is 3
template('This is ${m + n}', {m: 1, n: 2});
// or
template('This is ${m + n}', null, {m: 1, n: 2});
// or
var m = 1, n = 2;
template('This is ${m + n}');

// This is 5
template('This is ${m + n}', {n: 4}, {m: 1, n: 2});

var plus = template.compile('This is ${m + n}');
// This is 5
plus({m: 1, n: 4});
```

# License
MIT