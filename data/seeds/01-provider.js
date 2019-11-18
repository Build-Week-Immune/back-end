exports.seed = function(knex) {
  return knex("provider").insert([
    { ProviderName: "Gregory House MD" },
    { ProviderName: "Doogie Howser MD" },
    { ProviderName: "Stephen Strange MD" }
  ]);
};
