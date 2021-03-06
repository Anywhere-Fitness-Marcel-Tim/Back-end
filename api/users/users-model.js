const db = require('../../data/db-config')

function find() {
    return db('users as u')
    .join('roles as r','u.role_id', 'r.role_id')
    .select('u.user_id','u.username', 'u.user_email', 'r.role_name')
}

function findBy(filter){
    return db('users')
    .join('roles', 'users.role_id', 'roles.role_id')
    .select('user_id', 'username', 'roles.role_name', 'password', 'users.role_id')
    .where(filter)
}

function findById(id) {
    return db('users as u')
    .join('roles as r','u.role_id', 'r.role_id')
    .select('u.user_id','u.username', 'u.user_email', 'r.role_name')
    .where('u.user_id', id)
    .first()
}


async function add(user) {
    await db('users')
    .insert(user)

    return db('users as u')
    .join('roles as r','u.role_id', 'r.role_id')
    .select('u.user_id','u.username', 'u.user_email', 'r.role_name')
    .orderBy('u.user_id', 'desc')
    .first()
}

async function modify(id, modifiedUser) {
    await db('users')
    .where('user_id', id)
    .update(modifiedUser)

    return findById(id)
}

async function remove(id){
    const deletedUser = await findById(id)

    const deleteUser = await db('users')
    .where('user_id', id)
    .first()
    .del()
    
    return deletedUser
}

module.exports = {
    find,
    findById,
    findBy,
    modify,
    add,
    remove
}