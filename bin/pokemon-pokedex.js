'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')

const { read, getUser } = require('./../lib/cfg')

module.exports = async () => {
  const token = read().token
  let user
  try {
    user = await getUser(token)
  } catch (err) {
    return shoutError(`We couldn't fetch your user information.`)
  }

  user.pokemons.map(pokemon => {
    return shoutMessage(
      `${chalk.bold.keyword(pokemon.color)('·')} ${pokemon.name}`
    )
  })
}
