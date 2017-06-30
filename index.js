#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const ora = require('ora')
const shoutError = require('shout-error')

const getRandomPokemon = require('./lib/get-random-pokemon')

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
    // 1.0 Get a random pokemon
    try {
      const pokemon = await getRandomPokemon()
      spinner.stop()
      console.log(`A wild ${pokemon.name} appeared!`)
    } catch (err) {
      spinner.stop()
      shoutError(err)
    }

    // 2.0 Run probability of pokemon running
    // 2.1 If pokemon runs -> throw message
    // 2.2 If not, show bag with pokeballs and items available to use
    // 3.0 Use item to froze, paralyze etc pokemon
    // 3.1 Run probability to affect pokemon
    // 3.2 Choose pokeball
    // 3.3 Run probability to catch pokemon
    // 4.0 Caught || Throw pokeball again || pokemon run
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
