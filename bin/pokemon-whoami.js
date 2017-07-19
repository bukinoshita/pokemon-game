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

  /* eslint-disable no-unused-expressions */
  user.name ? shoutMessage(user.name) : null
  shoutMessage(`${user.email} ${user.emailConfirmed ? chalk.green('✔') : 'x'}`)
  shoutMessage(`Balance: $${user.balance}`)
  shoutMessage(`You have ${user.pokemons.length} pokemons`)
}
