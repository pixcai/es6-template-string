var assert = require('assert');
var template = require('.');

console.log('Checking whether rendering inexistent variables raises an error');
assert.throws(() => template('${a}'));

console.log('Checking whether global variables can be use');
assert.doesNotThrow(() => template('${process.version}'));

console.log('Checking whether escape character can be use');
assert.strictEqual(template('\\${a}'), '${a}');

console.log('Checking whether ordinary objects can be used as context');
assert.strictEqual(template('${a}', { a: 1 }), '1');

function sum(a, b) {
  return a + b;
}

console.log('Checking whether function can be used as variable');
assert.strictEqual(template('${f(1, 2)}', { f: sum }), '3');

console.log('Checking whether variables can be used as function arguments');
assert.strictEqual(template('${f(a, b)}', { f: sum, a: 1, b: 2 }), '3');

console.log('Checking whether function raises an error when arguments inexistent');
assert.throws(() => template('${f(a, b)}', { f: sum }));

console.log('Checking whether patterns can contain complex operations');
assert.strictEqual(template('${f(a, b) + c}', { f: sum, a: 1, b: 2, c: 3 }), '6');

console.log('Checking whether the `render` method works as expected');
assert.strictEqual(template.render('${a}', { a: 1 }), '1');

var compiled = template.compile('${a}');

console.log('Checking whether patterns can be compiled for later use');
assert.strictEqual(compiled({ a: 1 }), '1');
