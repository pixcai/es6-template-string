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
