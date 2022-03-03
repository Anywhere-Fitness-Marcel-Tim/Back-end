const pg = require('pg')

const sharedConfig = {
    client: 'sqlite3',
    useNullAsDefault: true,
    migrations: {
        directory: './data/migrations',
    },
    seeds:{
        directory: './data/seeds',
    },
    pool: {
        afterCreate: (conn, done) => {
            conn.run('PRAGMA foreign_keys = ON', done)
        },
    },
}

if(process.env.DATABASE_URL){
    pg.defaults.ssl = { rejectUnauthorized: false}
}

module.exports = {
    development: {
        ...sharedConfig,
        connection: {filename: './data/anywhereFitness.db3'}
    },
    testing: {
        ...sharedConfig,
        connection: {filename: './data/test.db3'}
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './data/migrations',
        },
        seeds:{ directory: './data/seeds' },
        pool: { min: 2, max: 10},
    },
}