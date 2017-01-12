// inspired by co.js (https://github.com/tj/co)
// can yield any value, not just promises
'use strict'

const util = require('./util')

function create (gen) {
  return new Promise((resolve, reject) => {
    const genNext = function (value) {
      next(gen.next(value))
    }

    const genThrow = function (error) {
      next(gen.throw(error))
    }

    const next = function (result) {
      let value = result.value
      if (result.done) resolve(value)
      else if (util.isThenable(value)) value.then(genNext, genThrow).catch(reject)
      else genNext(value)
    }

    genNext()
  })
}

module.exports = function sequence (gen) {
  if (!util.isGeneratorFunction(gen)) throw new Error('sequence expects a generator function')
  return function () {
    return create(gen.apply(this, arguments))
  }
}
