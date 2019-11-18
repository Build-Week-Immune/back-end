exports.seed = function(knex) {
  return knex("provider").insert([
    { name: "Gregory House MD"},
    { name: "Doogie Howser MD"},
    { name: "Stephen Strange MD"}
  ]);
};
