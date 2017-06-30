'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = pokeballs => {
  const choices = []
  pokeballs.map(pokeball => {
    return choices.push({
      name: `${pokeball.name} ${chalk.gray('(' + pokeball.quantity + 'x)')}`,
      value: pokeball.slug
    })
  })

  return inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      default: `pokeball`,
      message: 'Which pokeball do you want to use?',
      choices
    }
  ])
}
