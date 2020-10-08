const { throws, strictEqual } = require('assert');
const template = require('.');

let testKey = 'hello';
let contextKey = 'context';
let testPattern = `\${${testKey}}`;
let testValue = 'This is a test';
let testContext = { [testKey]: testValue };

console.log('Checking whether rendering templates with inexistent variables raises an error…');
throws(() => template(testPattern, {}));

console.log('Checking whether ordinary objects can be used as templates…');
strictEqual(template(testPattern, testContext), testValue);

console.log('Checking whether classes can be used as context…');
strictEqual(template(testPattern, new class { get [testKey]() { return testValue } }), testValue);

console.log('Checking whether proxies can be used as context…');
strictEqual(template(testPattern, new Proxy({}, { has: () => true, get: () => testValue })), testValue);

console.log('Checking whether the context-object is read-protected…');
throws(() => template(`\${${contextKey}}`));

console.log(`Checking whether a context-variable called "${contextKey}" can be created…`);
strictEqual(template('${context}', { [contextKey]: testValue }), testValue);

console.log('Checking whether template-patterns can contain complex operations…');
strictEqual(template(`\${${testKey} + ${JSON.stringify(testValue)}}`, testContext), testValue + testValue);
