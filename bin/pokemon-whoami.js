'use strict'

const shoutMessage = require('shout-message')

const { read } = require('./../lib/cfg')

module.exports = () => {
  const user = read().user
  return shoutMessage(user.name || user.email)
}
