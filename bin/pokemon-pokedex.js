'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')

const { read, getUser } = require('./../lib/cfg')

module.exports = async () => {
  const token = read().token

  if (!token) {
    return shoutError(
      `You must be logged in. Run ${chalk.bold('`$ pokemon login`.')}`
    )
  }

  const user = await getUser(token)

  user.pokemons.map(pokemon => {
    return shoutMessage(
      `${chalk.bold.keyword(pokemon.color)('·')} ${pokemon.name}`
    )
  })
}
