'use strict'

const { stringify: stringifyQuery } = require('querystring')
const chalk = require('chalk')
const fetch = require('node-fetch')
const ora = require('ora')
const promptEmail = require('prompt-email')
const shoutMessage = require('shout-message')

const sleep = require('./../lib/sleep')
const { save } = require('./../lib/cfg')

async function emailConfirmation(email) {
  const data = JSON.stringify({ email })
  const res = await fetch(`http://localhost:3001/registration`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  })

  const body = await res.json()
  if (res.status !== 200) {
    throw new Error(
      `Verification error: ${res.status} – ${JSON.stringify(body)}`
    )
  }
  return body
}

async function verify(userId, token) {
  const query = {
    userId
  }

  const res = await fetch(
    `http://localhost:3001/registration/verify?${stringifyQuery(query)}`,
    {
      headers: {
        Authorization: token
      }
    }
  )
  const body = await res.json()
  return body.status
}

async function register() {
  let email

  try {
    email = await promptEmail()
  } catch (err) {
    process.stdout.write('\n')
    throw err
  }

  process.stdout.write('\n')

  const { token, user } = await emailConfirmation(email)

  shoutMessage(`Please follow the link sent to ${chalk.bold(email)} to log in.`)

  process.stdout.write('\n')

  const spinner = ora({
    text: 'Waiting for confirmation...'
  }).start()

  const userId = user._id
  let final

  do {
    await sleep(2500)

    try {
      final = await verify(userId, token)
    } catch (err) {}
  } while (!final)

  spinner.text = 'Confirmed email address!'
  spinner.stopAndPersist('✔')

  process.stdout.write('\n')

  const data = {
    token,
    user: {
      uid: userId,
      email: user.email
    },
    lastUpdate: Date.now()
  }

  save(data)
}

module.exports = register
