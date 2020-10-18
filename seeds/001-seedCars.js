
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('cars').truncate()
    
      // Inserts seed entries
      await knex('cars').insert([
        { VIN: 12345678, make: "toyota", model: "camry", mileage: 21000, transmissionType: "standard", titleStatus: "clean" },
        { VIN: 28374647, make: "honda", model: "accord", mileage: 15000, transmissionType: "manual", titleStatus: "salvage" },
        { VIN: 74648573, make: "range rover", model: "renegado", mileage: 5000, transmissionType: "standard", titleStatus: "clean" },
        { VIN: 85748463, make: "infiniti", model: "veloz", mileage: 60000, transmissionType: "manual", titleStatus: "clean" },
      ]);

};
