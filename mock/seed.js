require('dotenv').config();
const mongoose = require('mongoose');
const floorSchema = require('../models/floor.model');
const zoneSchema = require('../models/zone.model');
const seatSchema = require('../models/seat.model');
const employeeSchema = require('../models/employee.model');
const attendanceSchema = require('../models/attendance.model');


async function seed() {

  await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)

  // เคลียร์ของเก่า
  await floorSchema.deleteMany();
  await zoneSchema.deleteMany();
  await seatSchema.deleteMany();
  await employeeSchema.deleteMany();
  await attendanceSchema.deleteMany();

  // 1. Floor + Zone
  await floorSchema.create({ _id: '1', name: 'Flo3' });
  await floorSchema.create({ _id: '2', name: 'Flo4' });
  await zoneSchema.create({ _id: '1', name: 'ZonA', floor_id: '1' });
  await zoneSchema.create({ _id: '2', name: 'ZonB', floor_id: '1' });
  await zoneSchema.create({ _id: '3', name: 'ZonA', floor_id: '2' });

  // 2. Employee + Attendance
  const employees = [];
  const attendance = [];

  for (let i = 1; i <= 50; i++) {
    const empId = `EMP${i}`;
    const emp = await employeeSchema.create({
      _id: empId,
      firstname: `User${i}`,
      lastname: `Lastname${i}`,
      department: 'IT',
      position: 'Developer',
      phone: `08123456${i.toString().padStart(2, '0')}`
    });

    employees.push(emp);

    attendance.push(await attendanceSchema.create({
      _id: `Att${i}`,
      employee_id: empId,
      checkIn: new Date('2024-05-29T08:30:00Z'),
      checkOut: new Date('2024-05-29T17:30:00Z'),
      status: 'present'
    }));
  }

  // 3. Seats
  for (let i = 0; i < 20; i++) {
    await seatSchema.create({
      _id: `S${i + 1}`,
      row: '1',
      tableNumber: `${i + 1}`,
      status: 'occupied',
      zone_id: '1',
      employee_id: employees[i]._id
    });
  }

  for (let i = 0; i < 30; i++) {
    await seatSchema.create({
      _id: `S${i + 21}`,
      row: '1',
      tableNumber: `${i + 1}`,
      status: 'available',
      zone_id: '2',
      employee_id: null
    });
  }


  console.log('✅ Seeding completed.');
  process.exit(0);
}

seed().catch(console.error);