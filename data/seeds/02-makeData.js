const roles = [
    {role_name: 'user'},
    {role_name: 'trainer'},
    {role_name: 'admin'}
]

const classes = [
    {class_type: 'Public_Training', class_price: 45, class_location: 'Tropical Park', class_intensity: 'Intermediate', class_max_size: 15, class_time: '12pm'},
    {class_type: 'Private_Training', class_price: 65, class_location: 'Presidential Gym', class_intensity: 'Advanced', class_max_size: 8, class_time: '2pm'},
    {class_type: 'Public_Training', class_price: 15, class_location: 'Amelia Earhart Park', class_intensity: 'begginner',  class_max_size: 15, class_time: '1pm'}
]

const users = [
    {username: 'bob', password: 'bob123', user_email: 'bob@aol.com', role_id: 1},
    {username: 'pat', password: 'pat123', user_email: 'pat@aol.com', role_id: 1},
    {username: 'mary', password: 'mary123', user_email: 'mary@aol.com', role_id: 1},

    {username: 'james', password: 'james123', user_email: 'james@aol.com', role_id: 2},
    {username: 'katrina', password: 'katrina123', user_email: 'katrina@aol.com', role_id: 2},
    {username: 'alex', password: 'alex123', user_email: 'alex@aol.com', role_id: 2},

    {username: 'SuperUser', password: 'admin123', user_email: 'superuser@company.com', role_id: 3},

]

const orders = [
    {order_content: 'Public_Training', order_quantity: 1, order_price_total: 24.95, user_id: 1},
    {order_content: 'Private_Training', order_quantity: 1, order_price_total: 34.95, user_id: 3},
    {order_content: 'Public_Training', order_quantity: 1, order_price_total: 15, user_id: 2},
]

const class_organizer = [
    {user_id: 2, class_id: 1},
    {user_id: 3, class_id: 1},
    {user_id: 1, class_id: 1},

    {user_id: 2, class_id: 2},
    {user_id: 3, class_id: 2},

    {user_id: 1, class_id: 3},
    {user_id: 2, class_id: 3},
    {user_id: 3, class_id: 3},
]


exports.seed = async function(knex){
    await knex('roles').insert(roles)
    await knex('classes').insert(classes)
    await knex('users').insert(users)
    await knex('orders').insert(orders)
    await knex('class_organizer').insert(class_organizer)
}