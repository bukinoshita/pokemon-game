'use strict'

const inquirer = require('inquirer')
const chalk = require('chalk')

module.exports = () => {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'answer',
      default: `bag`,
      message: 'Do you want to capture this Pokemon or run?',
      choices: [
        { name: `Bag ${chalk.gray('(choose pokeball)')}`, value: 'bag' },
        { name: 'Run', value: 'run' }
      ]
    }
  ])
}
