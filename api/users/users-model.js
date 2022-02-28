const db = require('../../data/db-config')

function find() {
    return db('users as u')
    .join('roles as r','u.role_id', 'r.role_id')
    .select('u.user_id','u.username', 'u.user_email', 'r.role_name')

}

module.exports = {
    find,
}