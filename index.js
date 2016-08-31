function template(str, locals, context) {
  return template.compile(str).call(this, locals, context);
}

template.compile = function(str) {
  var es6TemplateRegex = /(\\)?\$\{([^\{\}\\]+)\}/g;

  if (typeof str !== 'string') {
    throw new Error('The first argument must be a template string');
  }

  return function(locals, context) {
    var __context = {};

    if (context && typeof context === 'object') {
      for (var key in context) {
        if (context.hasOwnProperty(key)) {
          __context[key] = context[key];
        }
      }
    }
    if (locals && typeof locals === 'object') {
      for (var key in locals) {
        if (locals.hasOwnProperty(key)) {
          __context[key] = locals[key];
        }
      }
    }

    return str.replace(es6TemplateRegex, function(matched) {
      return parse(matched).call(__context);
    });
  };
}

function parse(variable) {
  var __variable = variable.match(/\{(.*)\}/);

  if (variable[0] === '\\') {
    return function() {
      return variable.slice(1);
    };
  }

  return function() {
    var declare = '';

    for (var key in this) {
      if (this.hasOwnProperty(key)) {
        declare += 'var ' + key + '=' + JSON.stringify(this[key]) + ';';
      }
    }

    return Function(declare + 'return ' + __variable[1])();
  };
}

module.exports = template.render = template;
