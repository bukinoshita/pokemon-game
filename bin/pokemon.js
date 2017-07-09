#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')

const catchPokemon = require('./pokemon-catch')
const login = require('./pokemon-login')
const whoami = require('./pokemon-whoami')

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

  switch (cmd) {
    case 'catch':
      return catchPokemon()

    case 'shop':
      // 1.0 Fetch user info (needs to be logged in)
      // 1.1 Welcome user to shop and show balance
      // 2.0 List of pokeballs and items
      // 3.0 Buy / Sell (item or pokeball)
      break

    case 'battle':
      // Soon
      break

    case 'login':
      return login()

    case 'whoami':
      return whoami()

    case 'rankings':
      // Show rankings (who captured more pokemons)
      break

    default:
      return cli.showHelp()
  }
}

run()
