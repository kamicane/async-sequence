'use strict'

function isThenable (object) {
  return typeof object === 'object' &&
  'then' in object &&
  'catch' in object &&
   typeof object.then === 'function' &&
   typeof object.catch === 'function'
}

function isGenerator (object) {
  return typeof object === 'object' &&
    'next' in object &&
    'throw' in object
}

function isGeneratorFunction (fn) {
  return typeof fn === 'function' &&
    fn.constructor.name === 'GeneratorFunction' &&
    isGenerator(fn.prototype)
}

exports.isGeneratorFunction = isGeneratorFunction
exports.isGenerator = isGenerator
exports.isThenable = isThenable
