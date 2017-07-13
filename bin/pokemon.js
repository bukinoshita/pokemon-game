#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')

const catchPokemon = require('./pokemon-catch')
const login = require('./pokemon-login')
const whoami = require('./pokemon-whoami')
const professor = require('./pokemon-professor')
const bag = require('./pokemon-bag')
const rankings = require('./pokemon-rankings')
const pokedex = require('./pokemon-pokedex')

const cli = meow(
  `
  Usage:
    $ pokemon catch           Search a wild Pokémon to capture
    $ pokemon login           Login to Pokémon Game
    $ pokemon professor       Talk to Professor Oak
    $ pokemon pokedex         Show your pokemons
    $ pokemon bag             Show your bag
    $ pokemon whoami          Show your information
    $ pokemon shop            Buy items to put in your bag
    $ pokemon rankings        See Rankings of best trainers
    $ pokemon battle          Let's battle

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

    case 'professor':
      return professor()

    case 'bag':
      return bag()

    case 'pokedex':
      return pokedex()

    case 'whoami':
      return whoami()

    case 'rankings':
      return rankings()

    default:
      return cli.showHelp()
  }
}

run()
