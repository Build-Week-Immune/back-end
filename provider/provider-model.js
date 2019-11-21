const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findimmunization,
  add,
  update,
  remove
};

function find() {
  return db("provider");
}

function findById(id) {
  return db("provider")
    .where({ id })
    .first();
}

function findimmunization(id) {
  return db("immunization")
    .join("provider", "provider.id", "immunization.provider_id")
    .select(
      "immunization.id",
      "immunization.immunizationName",
      "provider.providerName"
    )
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
function update(id, changes) {
  return db("provider")
    .where("id", id)
    .update(changes)
    // .then(count => (count > 0 ? this.get(id) : null));
}
function remove(id) {
  return db("provider")
    .where({ id })
    .del();
}
