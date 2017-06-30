'use strict'

const defineProbability = require('define-probability')

module.exports = fleeRate => {
  const rate = fleeRate / 100
  const probs = [{ value: true, prob: rate }, { value: false, prob: 1 - rate }]

  return defineProbability(probs)
}
