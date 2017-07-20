'use strict'

const inquirer = require('inquirer')
const shoutMessage = require('shout-message')
const shoutError = require('shout-error')
const chalk = require('chalk')

const { read, updateUser, merge } = require('./../lib/cfg')

module.exports = async () => {
  const user = read()

  if (!user.token) {
    return shoutError(
      `You must be logged in. Run ${chalk.bold('`$ pokemon login`.')}`
    )
  }

  if (user.professor) {
    return shoutMessage(
      `Hello ${chalk.bold(user.user.name)}! Nice to see you again.`
    )
  }

  shoutMessage(
    `Welcome to the world of Pokémon! My name's ${chalk.bold(
      'Oak'
    )}, people call ${chalk.bold('Pokémon Prof')}.`
  )

  const askName = inquirer.prompt([
    {
      name: 'answer',
      default: `Ash`,
      message: `First, what is your name?`,
      validate: str => {
        if (str.length > 7) {
          return 'Your name should have max of 7 characters.'
        }

        return true
      }
    }
  ])

  const name = await askName
  const update = await updateUser(user.token, { name: name.answer })
  const data = {
    user: {
      name: update.user.name,
      email: update.user.email,
      uid: update.user._id
    },
    professor: true,
    lastUpdate: Date.now()
  }
  await merge(data)

  process.stdout.write('\n')

  shoutMessage(`Right! So your name is ${chalk.bold(name.answer)}.`)
  shoutMessage(
    'When I was young, I was a serious Pokémon trainer. I have only 3 left, but you can have one!'
  )

  process.stdout.write('\n')

  const choosePokemon = inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      message: 'Which Pokémon do you want?',
      choices: [
        {
          name: 'Charmander',
          value: '596520b5ba1cbd27a507186d'
        },
        {
          name: 'Bulbasaur',
          value: '5963c5ac38f6f1e52aa68fe2'
        },
        {
          name: 'Squirtle',
          value: '596520cdba1cbd27a5071870'
        }
      ]
    }
  ])

  const pokemon = await choosePokemon
  await updateUser(user.token, { pokemonId: pokemon.answer })

  shoutMessage(`Awesome ${chalk.bold(name.answer)}! Keep catching all Pokémon!`)
}
