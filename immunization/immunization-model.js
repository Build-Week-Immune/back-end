const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findChildren,
  add,
  // update,
  remove,
};

function find() {
  return db("immunization")
    .join("provider", "provider.id", "immunization.provider_id")
    .select(
      "immunization.id as immunization_id",
      "immunization.name",
      "provider.name"
    );
}

function findById(id) {
  return db("immunization")
    .join("provider", "provider.id", "immunization.provider_id")
    .select(
      "immunization.id",
      "immunization.name",
      "provider.name",
      "immunization.provider_id"
    )
    .where("immunization.id", id)
    .first();
}

function findChildren(id) {
  return db("children")
    .join("provider", "provider.id", "children.provider_id")
    .join("immunization", "immunization.id", "children.immunization_id")
    .select(
      "children.id",
      "children.name",
      "children.parent_name",
      "children.contact",
      "children.gender",
      "children.DOB",
      "provider.name",
      "immunization.name"
    )
    .where({ immunization_id: id });
}

function add(name) {
  return db("immunization")
    .insert(name, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

// function update() {}

function remove(id) {
  return db("immunization")
    .where({ id })
    .del();
}
