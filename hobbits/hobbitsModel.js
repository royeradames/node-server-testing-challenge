const db = require('../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  findById,
}

async function insert(hobbit) {
  return db('hobbits')
    .insert({ name: hobbit })
}

async function update(id, changes) {
  return null
}

function remove(id) {
  db('hobbits')
    .where({ id })
    .del()
    return findById(id)  
}

function getAll() {
  return db('hobbits')
}

function findById(id) {
  return db('hobbits')
    .where({ id })
}
