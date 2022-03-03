const db = require("../../data/db-config");

function findByName(roleName) {
    return db("roles").where({ role_name: roleName }).first();
}

module.exports = {
    findByName,
};
