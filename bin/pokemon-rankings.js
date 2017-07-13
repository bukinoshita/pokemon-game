'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')

const { read } = require('./../lib/cfg')
const getRankings = require('./../lib/get-rankings')

module.exports = async () => {
  const { user } = read()
  let rankings
  try {
    rankings = await getRankings()
  } catch (err) {
    return shoutError(`Try again later.`)
  }

  /* eslint-disable array-callback-return */
  rankings.trainers.map((trainer, index) => {
    if (trainer.name === user.name) {
      shoutMessage(
        `${chalk.bold(trainer.name)}, you have ${chalk.bold(
          trainer.pokemons.length
        )} pokemons.`
      )
      process.stdout.write('\n')
    }

    if (trainer.name === user.name) {
      console.log(
        `${chalk.bold.green('⇢')} ${index + 1}. ${trainer.name} ${trainer
          .pokemons.length}`
      )
    } else {
      console.log(`⇢ ${index + 1}. ${trainer.name} ${trainer.pokemons.length}`)
    }
  })

  process.stdout.write('\n')

  shoutMessage(
    `${chalk.gray(
      'To participate on Poke Ranking, you have to set up your user name.\n> Run `$ pokemon professor` to choose your name.'
    )}`
  )
}
