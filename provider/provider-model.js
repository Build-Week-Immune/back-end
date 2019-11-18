const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findCommunities,
  add,
  // update,
  remove,
};

function find() {
  return db("provider");
}

function findById(id) {
  return db("provider")
    .where({ id })
    .first();
}

function findCommunities(id) {
  return db("immunization")
    .join("provider", "provider.id", "immunization.provider_id")
    .select("immunization.id", "immunization.name", "provider.name")
    .where({ provider_id: id });
}

function add(name) {
  return db("provider")
    .insert(name, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

// function update() {}

function remove(id) {
  return db("provider")
    .where({ id })
    .del();
}
