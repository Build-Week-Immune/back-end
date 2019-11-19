const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findChildren,
  add,
  update,
  remove,
};

function find() {
  return db("immunization")
    // .join("provider", "provider.id", "immunization.provider_id")
    // .select(
    //   "immunization.id as immunization_id",
    //   "immunization.immunizationName",
    //   "provider.name"
    // );
}

function findById(id) {
  return db("immunization")
    .join("provider", "provider.id", "immunization.provider_id")
    .select(
      "immunization.id",
      "immunization.immunizationName",
      "provider.providerName",
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
      "provider.providerName",
      "immunization.immunizationName"
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
// async function add(trip) {
//   const [id] = await db("immunization").insert(trip);

//   return findById(id);
// }

// function update() {}
function update(id, changes) {
  return db("immunization")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db("immunization")
    .where({ id })
    .del();
}
