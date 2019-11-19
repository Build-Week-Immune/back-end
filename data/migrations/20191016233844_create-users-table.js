exports.up = function(knex) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl
      .string('username', 128)
      .notNullable()
      .unique();
    tbl.string('password', 128).notNullable();
    tbl.string('role', 128).notNullable();
    tbl
      .integer("provider_id")
      .unsigned()
      .references("id")
      .inTable("provider")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
       tbl.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
