
exports.up = function(knex) {
  return knex.schema
    .createTable('roles', roles => {
        roles.increments('role_id')
        roles.string('role_name', 16)
        .notNullable()
        .unique()
    })
    .createTable('classes', classes => {
        classes.increments('class_id')
        classes.string('class_type', 64).notNullable()
        classes.integer('class_price').notNullable()
        classes.string('class_location', 255).notNullable()
        classes.string('class_intensity', 64).notNullable()
        classes.integer('class_max_size').notNullable()
        classes.string('class_time', 64).notNullable()
    })
    .createTable('users', users => {
        users.increments('user_id')
        users.string('username', 128)
        .notNullable()
        .unique()
        users.string('password', 128).notNullable()
        users.string('user_email').unique()
        users.integer('role_id')
        .unsigned()
        .notNullable()
        .references('role_id')
        .inTable('roles')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
    .createTable('class_organizer', table => {
        table.increments('class_organizer_id')
        table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('user_id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        table.integer('class_id')
        .unsigned()
        .notNullable()
        .references('class_id')
        .inTable('classes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('class_organizer')
    .dropTableIfExists('users')
    .dropTableIfExists('classes')
    .dropTableIfExists('roles')
};
