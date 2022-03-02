const db = require('../../data/db-config')

function find() {
    return db('classes as class')
}

function findById(id) {
    return db('classes')
    .where('class_id', id)
    .first()
}


async function add(session) {
    await db('classes')
    .insert(session)

    return db('classes')
    .orderBy('class_id', 'desc')
    .first()
}

async function modify(id, modifiedClass) {
    await db('classes')
    .where('class_id', id)
    .update(modifiedClass)

    return findById(id)
    
}

async function remove(id){
    const deletedClass = await findById(id)

    const deleteClass = await db('classes')
    .where('class_id', id)
    .first()
    .del()
    
    return deletedClass
}

module.exports = {
    find,
    findById,
    modify,
    add,
    remove
}