'use strict'

const { homedir } = require('os')
const fs = require('fs')
const path = require('path')
const fetch = require('node-fetch')

const file = path.resolve(homedir(), '.pokemon.json')

function save(data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2))
}

async function getUser(token, userId) {
  const res = await fetch(`https://pokedex-api.now.sh/${userId}`, {
    headers: {
      Authorization: token
    }
  })
  const body = await res.json()
  return body.status
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
  read
}
