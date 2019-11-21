const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};

function find() {
  return db('screenings');
}

function findById(id) {
  return db('screenings')
    .where('screenings.id', id)
    .first();
}

function add(screening) {
  return db('screenings')
    .insert(screening, 'id')
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

// function update() {}

function update(id, changes) {
  return db("screenings")
    .where("id", id)
    .update(changes);
  // .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db('screenings')
    .where({ id })
    .del();
}
