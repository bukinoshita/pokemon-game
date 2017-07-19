'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')
const ora = require('ora')

const { read, getUser } = require('./../lib/cfg')

module.exports = async () => {
  const spinner = ora('Fetching your bag...')
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

  shoutMessage('Your bag:')

  process.stdout.write('\n')

  user.bag.map(pokeball => {
    return console.log(
      `${chalk.gray('⇢')} ${pokeball.name} ${chalk.gray(
        '(' + pokeball.quantity + 'x)'
      )}`
    )
  })

  process.stdout.write('\n')

  console.log(`  Balance: $${chalk.bold(user.balance)}`)
}
