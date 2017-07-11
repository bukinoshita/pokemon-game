'use strict'

const fetch = require('node-fetch')

module.exports = async () => {
  const res = await fetch(`http://localhost:3001/pokemons`)
  const body = await res.json()

  return body
}
