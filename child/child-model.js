const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findScreenings,
  add,
  // update,
  remove,
};

function find() {
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
    );
}

function findById(id) {
  const promises = [
    db("children")
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
        "children.provider_id",
        "immunization.name",
        "children.immunization_id"
      )
      .where("children.id", id)
      .first(),
    findScreenings(id)
  ];

  return Promise.all(promises).then(results => {
    const [child, screenings] = results;

    return { ...child, screenings };
  });
}

function findScreenings(id) {
  return db('screenings')
    .join('children', 'children.id', 'screenings.child_id')
    .select(
      'screenings.id',
      'screenings.date',
      'screenings.height',
      'screenings.weight',
      'children.name',
    )
    .where({ child_id: id });
}

function add(child) {
  return db('children')
    .insert(child, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

// function update() {}

function remove(id) {
  return db('children')
    .where({ id })
    .del();
}
