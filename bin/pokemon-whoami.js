'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')
const ora = require('ora')

const { read, getUser } = require('./../lib/cfg')

module.exports = async () => {
  const spinner = ora('Fetching your information...')
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

  /* eslint-disable no-unused-expressions */
  user.name ? shoutMessage(user.name) : null
  shoutMessage(`${user.email} ${user.emailConfirmed ? chalk.green('✔') : 'x'}`)
  shoutMessage(`Balance: $${user.balance}`)
  shoutMessage(`You have ${user.pokedex} Pokémon`)
}
