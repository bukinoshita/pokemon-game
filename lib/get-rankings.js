'use strict'

const fetch = require('node-fetch')

module.exports = async () => {
  const res = await fetch(`https://pokedex-api.now.sh/rankings`)
  const body = await res.json()

  return body
}
