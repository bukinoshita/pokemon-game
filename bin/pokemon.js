#!/usr/bin/env node
'use strict'

const meow = require('meow')
const updateNotifier = require('update-notifier')
const shoutMessage = require('shout-message')

const catchPokemon = require('./pokemon-catch')
const login = require('./pokemon-login')
const professor = require('./pokemon-professor')
const pokedex = require('./pokemon-pokedex')
const rankings = require('./pokemon-rankings')
const bag = require('./pokemon-bag')
const mart = require('./pokemon-mart')
const whoami = require('./pokemon-whoami')

const cli = meow(
  `
  Usage:
    $ pokemon catch           Search a wild Pokémon to capture
    $ pokemon login           Login to Pokémon Game
    $ pokemon professor       Talk to Professor Oak
    $ pokemon pokedex         Show your Pokémon
    $ pokemon rankings        See Rankings of best trainers
    $ pokemon bag             Show your bag
    $ pokemon mart            Buy items to put in your bag
    $ pokemon battle          Let's battle
    $ pokemon whoami          Show your information

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

const run = () => {
  const cmd = cli.input[0]

  switch (cmd) {
    case 'catch':
      return catchPokemon()

    case 'login':
      return login()

    case 'professor':
      return professor()

    case 'pokedex':
      return pokedex()

    case 'rankings':
      return rankings()

    case 'bag':
      return bag()

    case 'mart':
      return mart()

    case 'battle':
      return shoutMessage(
        `Coming soon! Check https://github.com/bukinoshita/pokemon-game to see when it's available.`
      )

    case 'whoami':
      return whoami()

    default:
      return cli.showHelp()
  }
}

run()
