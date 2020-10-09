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

function parse(variable) {
  if (variable[0] === '\\') {
    return function() {
      return variable.slice(1);
    };
  }
  return function() {
    var contextKey = 'context';

    return Function(
      contextKey,
      `
        if (!(${JSON.stringify(contextKey)} in ${contextKey})) {
          ${contextKey}[${JSON.stringify(contextKey)}] = undefined;
        }

        with(${contextKey}) { return \`${variable}\`; }`).call({}, this);
  };
}

module.exports = template.render = template;
