'use strict'

const uniqueRandomArray = require('unique-random-array')

const getPokemons = require('./get-pokemons')

module.exports = async () => {
  const pokemons = await getPokemons()
  return uniqueRandomArray(pokemons)()
}
