const mongoose = require('mongoose');
const seat2Schema = require('../models/seat2.model');
require('dotenv').config();

async function seedImg() {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

  const seat2 = [{
          "emp_id":"EMP1",
          "tableNumber":"1",
          "status":"active",
        },
        {
          "emp_id":"EMP2",
          "tableNumber":"2",
          "status":"active",
        },
        {
          "emp_id":"EMP3",
          "tableNumber":"3",
          "status":"active",
        },
        {
          "emp_id":"EMP4",
          "tableNumber":"4",
          "status":"active",
        },
        {
          "emp_id":"EMP5",
          "tableNumber":"5",
          "status":"active",
        },
        {
          "emp_id":null,
          "tableNumber":"6",
          "status":"inactive",
        },
        {
          "emp_id":null,
          "tableNumber":"7",
          "status":"inactive",
        },
        {
          "emp_id":"EMP8",
          "tableNumber":"8",
          "status":"active",
        },
        {
          "emp_id": null,
          "tableNumber":"9",
          "status":"inactive",
        },
        {
          "emp_id":"EMP10",
          "tableNumber":"10",
          "status":"active",
        }];

  for (let i = 0; i < 28; i++) {
    seat2.push({
      emp_id: null,
      tableNumber: (i + 11).toString(),
      status: 'inactive'
    });
  }

  await seat2Schema.deleteMany({});
  await seat2Schema.insertMany(seat2);
  console.log('seats2 seeded successfully');
  process.exit(0);
}

seedImg().catch(console.error);
