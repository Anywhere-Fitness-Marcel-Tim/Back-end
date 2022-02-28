const db = require('../../data/db-config')

function find() {
    return db('classes as class')
}

module.exports = {
    find,
}