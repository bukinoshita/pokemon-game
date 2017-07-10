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
const { getUser, read, updateUser } = require('./../lib/cfg')

module.exports = async () => {
  const spinner = ora('Finding pokemon...')
  spinner.start()

  try {
    const user = await getUser(read().token)
    const pokemon = await getRandomPokemon()

    spinner.stop()
    shoutMessage(`A wild ${chalk.green.bold(pokemon.name)} appeared!\n`)

    if (pokemonEscape(pokemon.fleeRate)) {
      return shoutMessage(`The Pokemon fled! Don't believe it.`)
    }

    const userAction = await userActions()

    if (userAction.answer === 'run') {
      if (escape(50, pokemon.speed)) {
        return shoutMessage('You escaped')
      }

      shoutMessage(`You didn't escape\n`)
    }

    const pokeballChosen = await throwPokeball(user.bag)
    const caught = await catchPokemon(pokemon.name, pokeballChosen.answer, {
      hp: pokemon.hp,
      catchRate: pokemon.catchRate
    })

    if (caught === `All right! ${pokemon.name} was caught!`) {
      await updateUser(read().token, {
        type: pokeballChosen.answer,
        pokemonId: pokemon._id
      })
      return shoutSuccess(caught)
    }

    await updateUser(read().token, {
      type: pokeballChosen.answer
    })
    shoutMessage(caught)
  } catch (err) {
    spinner.stop()
    shoutError(err)
  }
}
