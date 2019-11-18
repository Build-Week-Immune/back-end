exports.seed = function(knex) {
  return knex("immunization").insert([
    { ImmunizationName: "HepB - Hepatitis B", provider_id: 1 },
    {
      ImmunizationName: "DTaP - Diphtheria, tetanus, and acellular pertussis",
      provider_id: 1
    },
    { ImmunizationName: "Hib - Haemophilus influenzae type b", provider_id: 1 },
    { ImmunizationName: "IPV - Inactivated poliovirus", provider_id: 2 },
    { ImmunizationName: "PCV - Pneumococcal conjugate", provider_id: 2 },
    { ImmunizationName: "RV - Rotavirus", provider_id: 2 },
    { ImmunizationName: "Influenza", provider_id: 3 },
    { ImmunizationName: "MenB - Meningococcal B", provider_id: 3 },
    {
      ImmunizationName: "Tdap - Tetanus, diphtheria, and pertussis booster",
      provider_id: 3
    }
  ]);
};
