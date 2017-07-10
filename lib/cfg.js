'use strict'

const { homedir } = require('os')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const file = path.resolve(homedir(), '.pokemon.json')

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

async function getUser(token) {
  const res = await fetch(`https://pokedex-api.now.sh/trainer`, {
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body
}

async function updateUser(token, update) {
  const data = JSON.stringify(update)
  const res = await fetch(`https://pokedex-api.now.sh/trainer`, {
    method: 'PUT',
    headers: {
      Authorization: token,
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

function read() {
  let existing = {}
  try {
    existing = fs.readFileSync(file, 'utf8')
    existing = JSON.parse(existing)
  } catch (err) {}

  return existing
}

module.exports = {
  save,
  getUser,
  updateUser,
  read
}
