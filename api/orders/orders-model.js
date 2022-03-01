const db = require('../../data/db-config')

async function find() {
    const orders = await db('orders as or')
    .join('users as us', 'or.user_id', 'us.user_id')
    .select('or.order_id','us.username','us.user_email','or.order_content', 'or.order_quantity', 'or.order_price_total', 'or.order_paid')
    .orderBy('us.username')

    return orders.map(order => {
        if(order.order_paid === 0){
            return {
                ...order,
                order_paid: false
            }
        } else {
            return {
                ...order,
                order_paid: true
            }
        }
    })
}

async function findById(id) {
    const newOrder = await db('orders as or')
    .where('order_id', id)
    .join('users as us', 'or.user_id', 'us.user_id')
    .select('or.order_id','us.username','us.user_email','or.order_content', 'or.order_quantity', 'or.order_price_total', 'or.order_paid')
    .first()

    if(newOrder && newOrder.order_paid === 0){
        return {
            ...newOrder,
            order_paid: false
        }
    } else if(newOrder && newOrder.order_paid === 1){
        return {
            ...newOrder,
            order_paid: true
        }
    }
}


async function modify(id, modifiedOrder) {
    await db('orders')
    .where('order_id', id)
    .update(modifiedOrder)

    return findById(id)
}

async function add(order) {
    const [id] = await db('orders')
    .insert(order)

    return findById(id)
}

async function remove(id){
    const deletedOrder = await findById(id)

    const deleteOrder = await db('orders')
    .where('order_id', id)
    .first()
    .del()
    
    return deletedOrder
}

module.exports = {
    find,
    findById,
    modify,
    add,
    remove,
}