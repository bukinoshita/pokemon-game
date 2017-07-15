'use strict'

const shoutMessage = require('shout-message')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')
const chalk = require('chalk')
const inquirer = require('inquirer')
const getPokeball = require('get-pokeball')

const { read, getUser, updateUser } = require('./../lib/cfg')

module.exports = async () => {
  const token = read().token
  let user
  try {
    user = await getUser(token)
  } catch (err) {
    return shoutError(`We couldn't fetch your user information.`)
  }

  shoutMessage('Welcome to Poké Shop!')
  shoutMessage(`Your balance $${chalk.bold(user.balance)}`)

  process.stdout.write('\n')

  const pokeball = await getPokeball('pokeball')
  const greatball = await getPokeball('greatball')
  const ultraball = await getPokeball('ultraball')
  const chooseItem = inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: 'Do you want to buy a pokeball?',
      choices: [
        {
          name: `Poké ball ${chalk.gray('($' + pokeball.price.buy + ')')}`,
          value: 'pokeball'
        },
        {
          name: `Great ball ${chalk.gray('($' + greatball.price.buy + ')')}`,
          value: 'greatball'
        },
        {
          name: `Ultra ball ${chalk.gray('($' + ultraball.price.buy + ')')}`,
          value: 'ultraball'
        },
        new inquirer.Separator(),
        {
          name: chalk.gray('Exit Poké shop'),
          value: false
        }
      ]
    }
  ])

  const pokeballChosen = await chooseItem

  if (pokeballChosen.answer) {
    try {
      const pk = await getPokeball(pokeballChosen.answer)

      if (user.balance - pk.price.buy >= 0) {
        await updateUser(token, {
          buy: true,
          type: pokeballChosen.answer
        })

        return shoutSuccess(`You just bought a ${pokeballChosen.answer}!`)
      }

      return shoutError(`You don't have enough money.`)
    } catch (err) {
      return shoutError(err)
    }
  }

  shoutMessage('Thanks for coming!')
}
