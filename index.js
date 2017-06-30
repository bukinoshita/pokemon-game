#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')
const shoutError = require('shout-error')
const shoutMessage = require('shout-message')
const chalk = require('chalk')

const getRandomPokemon = require('./lib/get-random-pokemon')
const fleeRate = require('./lib/flee-rate')
const userActions = require('./lib/user-actions')
const throwPokeball = require('./lib/throw-pokeball')

const cli = meow(
  `
  Usage:
    $ pokemon

  Example:
    $ pokemon

  Options:
    -h, --help                Show help options
    -v, --version             Show version
`,
  {
    alias: {
      h: 'help',
      v: 'version'
    }
  }
)

updateNotifier({ pkg: cli.pkg }).notify()

const run = async () => {
  const cmd = cli.input[0]

  if (cmd === 'catch') {
    const spinner = ora('Finding pokemon...')
    spinner.start()
    try {
      // User fake api
      const user = {
        name: 'Bu Kinoshita',
        bag: [
          { name: 'Poké ball', slug: 'pokeball', quantity: 10 },
          { name: 'Ultra ball', slug: 'ultraball', quantity: 5 },
          { name: 'Great ball', slug: 'greatball', quantity: 7 },
          { name: 'Master ball', slug: 'masterball', quantity: 1 }
        ]
      }
      // 1.0 Get a random pokemon
      const pokemon = await getRandomPokemon()
      spinner.stop()
      shoutMessage(`A wild ${chalk.green.bold(pokemon.name)} appeared!\n`)

      // 2.0 Run probability of pokemon running
      if (fleeRate(pokemon.fleeRate)) {
        // 2.1 If pokemon runs -> throw message
        return shoutMessage(`The Pokemon fled! Don't believe it.`)
      }

      // 3.0 If not, show user actions (bag/run)
      const userAction = await userActions()

      if (userAction.answer === 'run') {
        // 4.0 (3.0 run) Run probability of escaping from wild pokemon
        return shoutMessage('You escaped')
      }

      // 4.0 (3.0 bag) Choose pokeball
      const pokeballChosen = await throwPokeball(user.bag)
      console.log(pokeballChosen)

      // 5.0 Run probability to catch pokemon
    } catch (err) {
      spinner.stop()
      shoutError(err)
    }
  }

  if (cmd === 'shop') {
    // 1.0 Fetch user info (needs to be logged in)
    // 1.1 Welcome user to shop and show balance
    // 2.0 List of pokeballs and items
    // 3.0 Buy / Sell (item or pokeball)
  }

  if (cmd === 'battle') {
    // Soon
  }

  if (cmd === 'login') {
    // Login user and persist (not sure yet)
  }

  if (cmd === 'signup') {
    // Signup user, send email to verify, login user and persist (not sure yet)
  }

  if (cmd === 'whoami') {
    // Show user stats (balance, name, pokemons, how many pokemons etc)
  }

  if (cmd === 'rankings') {
    // Show rankings (who captured more pokemons)
  }
}

run()
