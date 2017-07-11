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

  /* eslint-disable no-unused-expressions */
  user.name ? shoutMessage(user.name) : null
  shoutMessage(`${user.email} ${user.emailConfirmed ? chalk.green('✔') : 'x'}`)
  shoutMessage(`Balance: $${user.balance}`)
  shoutMessage(`You have ${user.pokemons.length} pokemons`)
}
