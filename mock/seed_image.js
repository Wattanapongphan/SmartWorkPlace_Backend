const imageSchema = require("../models/image.model");
const employeeSchema = require("../models/employee.model");

require("dotenv").config();
const mongoose = require("mongoose");
async function seed() {
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );

  const employees = await employeeSchema.find()
  await imageSchema.deleteMany();

  for (let i = 0;i<employees.length;i++){
    await imageSchema.create({
      _id: `IMG${i+1}`,
      name:`https://randomuser.me/api/portraits/men/${i % 100}.jpg`,
      employee_id: employees[i]._id
    })
  }
  


  console.log("✅ Seeding completed.");
  process.exit(0);
}

seed().catch(console.error);