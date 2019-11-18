exports.seed = function(knex) {
  return knex("immunization").insert([
    { name: "HepB - Hepatitis B", provider_id: 1 },
    {
      name: "DTaP - Diphtheria, tetanus, and acellular pertussis",
      provider_id: 1
    },
    { name: "Hib - Haemophilus influenzae type b", provider_id: 1 },
    { name: "IPV - Inactivated poliovirus", provider_id: 2 },
    { name: "PCV - Pneumococcal conjugate", provider_id: 2 },
    { name: "RV - Rotavirus", provider_id: 2 },
    { name: "Influenza", provider_id: 3 },
    { name: "MenB - Meningococcal B", provider_id: 3 },
    {
      name: "Tdap - Tetanus, diphtheria, and pertussis booster",
      provider_id: 3
    }
  ]);
};
