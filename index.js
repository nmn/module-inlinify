'use strict'
var transformTools = require('browserify-transform-tools')
var options = {excludeExtensions: ['.json']}

var path = require('path')
var toRegEx = require('glob-to-regexp')

function onlyFunction(obj){
  return function(key){
    return (typeof obj[key] === 'function')
  }
}

module.exports =
transformTools.makeStringTransform('module-inlinify', options, function (content, transformOptions, done) {
  var file = transformOptions.file

  // content contents of the file
  // file path to file

  if(!transformOptions.config || !transformOptions.config.include) {
    return done(new Error('Could not find inlinify configuration.'))
  }

  var regex = toRegEx(transformOptions.config.include)

  var relativePath = path.relative(__dirname, file)

  if(regex.test(file)){

    var output = require(relativePath)
    if(typeof output === 'number' || typeof output === 'string') {
      return done(null, 'module.exports = ' + JSON.stringify(output))
    } else if( typeof output === 'object'
      && Object.getPrototypeOf(output) === Object.prototype
      && Object.keys(output).filter(onlyFunction(output)).length === 0 ){
      return done(null, 'module.exports = ' + JSON.stringify(output))
    }

  }

  done(null, content)
})