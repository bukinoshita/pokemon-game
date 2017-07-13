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
    const pokemon = await getRandomPokemon()

    spinner.stop()
    shoutMessage(`A wild ${chalk.green.bold(pokemon.name)} appeared!`)

    let final = false

    do {
      const user = await getUser(read().token)

      if (pokemonEscape(pokemon.fleeRate)) {
        final = true
        return shoutMessage(`The Pokemon fled! Don't believe it.`)
      }

      process.stdout.write('\n')

      const userAction = await userActions()

      if (userAction.answer === 'run') {
        if (escape(50, pokemon.speed)) {
          final = true
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
          pokemonId: pokemon._id,
          capture: true
        })
        final = true
        return shoutSuccess(caught)
      }

      await updateUser(read().token, {
        type: pokeballChosen.answer,
        capture: true
      })

      shoutMessage(caught)
    } while (!final)
  } catch (err) {
    spinner.stop()
    shoutError(err)
  }
}
