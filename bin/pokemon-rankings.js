'use strict'

const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')
const ora = require('ora')

const { read } = require('./../lib/cfg')
const getRankings = require('./../lib/get-rankings')

module.exports = async () => {
  const spinner = ora('Fetching rankings...')
  const { user } = read()
  spinner.start()
  let rankings
  try {
    rankings = await getRankings()
  } catch (err) {
    spinner.stop()
    return shoutError(`Try again later.`)
  }

  spinner.stop()

  /* eslint-disable array-callback-return */
  rankings.trainers.map((trainer, index) => {
    const { name, pokedex, _id } = trainer
    const id = _id.substring(0, 4)

    if (name === user.name) {
      console.log(
        `${chalk.bold.green('⇢')} ${index +
          1}. ${name} — ${pokedex} Pokémons ${chalk.gray('(#' + id + ')')}`
      )
    } else {
      console.log(
        `⇢ ${index + 1}. ${name} — ${pokedex} Pokémons ${chalk.gray(
          '(#' + id + ')'
        )}`
      )
    }
  })

  process.stdout.write('\n')

  shoutMessage(
    `${chalk.gray(
      'To participate on Poke Ranking, you have to set up your user name.\n> Run `$ pokemon professor` to choose your name.'
    )}`
  )
}
