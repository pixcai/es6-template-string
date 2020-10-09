function template(str, locals) {
  return template.compile(str).call(this, locals);
}

template.compile = function(str) {
  var es6TemplateRegex = /(\\)?\$\{([^\{\}\\]+)\}/g;

  if (typeof str !== 'string') {
    throw new Error('The first argument must be a template string');
  }

  return function(locals) {
    return str.replace(es6TemplateRegex, function(matched) {
      return parse(matched).call(locals || {});
    });
  };
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

function parse(variable) {
  if (variable[0] === '\\') {
    return function() {
      return variable.slice(1);
    };
  }
  return function() {
    var contextKey = 'context';
    
    var context = new Proxy(
      this,
      {
        has(target, key) {
          if (key === contextKey) {
            return true;
          } else {
            return key in target;
          }
        },
        get(target, key) {
          if (
            key === contextKey &&
            !(contextKey in target)) {
              return new Function(`return ${contextKey};`).call({});
          } else {
            return target[key];
          }
        }
      })

    return Function(contextKey, `with(${contextKey}) { return \`${variable}\`; }`).call({}, context);
  };
}

module.exports = template.render = template;
