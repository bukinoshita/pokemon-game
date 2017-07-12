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
