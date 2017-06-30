'use strict'

const got = require('got')

module.exports = () => {
  return got('https://pokedex-api.now.sh/pokemons/')
    .then(pokemon => JSON.parse(pokemon.body))
    .catch(err => err.statusMessage)
}
