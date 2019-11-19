const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  findScreenings,
  add,
  update,
  remove,
};

function find() {
  return db("children")
}
function findById(id) {
  return db("children")
    .where({ id })
    .first();
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

// async function add(child) {
//   const [id] = await db("children").insert(child);

//   return findById(id);
// }

// function update() {}

function update(id, changes) {
  return db("children")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db('children')
    .where({ id })
    .del();
}
