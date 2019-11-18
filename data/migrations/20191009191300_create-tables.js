exports.up = function(knex) {
  return knex.schema
    .createTable('provider', tbl => {
      tbl.increments();
      tbl
        .string('name', 128)
        .notNullable()
        .unique();
        provider.timestamps(true, true);  
    })
    .createTable('immunization', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl
        .integer("provider_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("provider")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        immunization.timestamps(true, true);
    })
    .createTable('children', tbl => {
      tbl.increments();
      tbl.string('name', 128).notNullable();
      tbl.string('parent_name', 128).notNullable();
      tbl.string('contact', 128).notNullable();
      tbl.string('gender', 128).notNullable();
      tbl.date('DOB').notNullable();
      tbl
        .integer("immunization_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("immunization")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      tbl
        .integer("provider_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("provider")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
        children.timestamps(true, true);  

    })
    .createTable('screenings', tbl => {
      tbl.increments();
      tbl.date('date').notNullable();
      tbl.float('height').notNullable();
      tbl.float('weight').notNullable();
      tbl
        .integer('child_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('children')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("screenings")
    .dropTableIfExists("children")
    .dropTableIfExists("immunization")
    .dropTableIfExists("provider");
};
