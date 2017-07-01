#!/usr/bin/env node
'use strict'

const ora = require('ora')
const catchPokemon = require('catch-pokemon')
const pokemonEscape = require('pokemon-escape')
const { escape } = require('pokemon-player-escape')
const shoutMessage = require('shout-message')
const shoutSuccess = require('shout-success')
const shoutError = require('shout-error')
const chalk = require('chalk')

const getRandomPokemon = require('./../lib/get-random-pokemon')
const userActions = require('./../lib/user-actions')
const throwPokeball = require('./../lib/throw-pokeball')

module.exports = async () => {
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
    if (pokemonEscape(pokemon.fleeRate)) {
      // 2.1 If pokemon runs -> throw message
      return shoutMessage(`The Pokemon fled! Don't believe it.`)
    }

    // 3.0 If not, show user actions (bag/run)
    const userAction = await userActions()

    if (userAction.answer === 'run') {
      // 4.0 (3.0 run) Run probability of escaping from wild pokemon
      if (escape(50, pokemon.speed)) {
        return shoutMessage('You escaped')
      }

      shoutMessage(`You didn't escape\n`)
    }

    // 4.0 (3.0 bag) Choose pokeball
    const pokeballChosen = await throwPokeball(user.bag)
    const caught = await catchPokemon(pokemon.name, pokeballChosen.answer, {
      hp: pokemon.hp,
      catchRate: pokemon.catchRate
    })

    // 5.0 Run probability to catch pokemon
    if (caught === `All right! ${pokemon.name} was caught!`) {
      return shoutSuccess(caught)
    }

    shoutMessage(caught)
  } catch (err) {
    spinner.stop()
    shoutError(err)
  }
}
