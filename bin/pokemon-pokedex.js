'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')
const ora = require('ora')

const { read, getUser } = require('./../lib/cfg')

module.exports = async () => {
  const spinner = ora('Fetching your pokedex...')
  const token = read().token
  spinner.start()

  if (!token) {
    spinner.stop()
    return shoutError(
      `You must be logged in. Run ${chalk.bold('`$ pokemon login`.')}`
    )
  }

  const user = await getUser(token)

  spinner.stop()

  user.pokemons.map(pokemon => {
    return shoutMessage(
      `${chalk.bold.keyword(pokemon.color)('·')} ${pokemon.name}`
    )
  })
}
