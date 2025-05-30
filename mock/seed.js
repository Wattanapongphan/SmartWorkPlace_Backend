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
  await zoneSchema.create({ _id: 'ZONA', name: 'A', floor_id: 'FL03' });
  await zoneSchema.create({ _id: 'ZONB', name: 'B', floor_id: 'FL03' });
  await zoneSchema.create({ _id: 'ZONC', name: 'A', floor_id: 'FL04' });
  await floorSchema.create({ _id: 'FL03', name: '3' });
  await floorSchema.create({ _id: 'FL04', name: '4' });

  // 2. Employee + Attendance
  const employees = [];
  const attendance = [];

  for (let i = 1; i <= 10; i++) {
    const empId = `EMP20250${i.toString().padStart(2, '0')}`;
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
      _id: `ATT${i}`,
      employee_id: empId,
      checkIn: new Date('2024-05-29T08:00:00Z'),
      checkOut: new Date('2024-05-29T17:00:00Z'),
      status: 'present'
    }));
  }

  // 3. Seats
  for (let i = 0; i < employees.length; i++) {
    await seatSchema.create({
      _id: `S${i + 1}`,
      row: '1',
      tableNumber: `${i + 1}`,
      status: 'occupied',
      zone_id: 'ZONA',
      employee_id: employees[i]._id
    });
  }

    await employeeSchema.create({
        _id: 'EMP202511',
        firstname: 'sleep',
        lastname: 'indream',
        department: 'IT',
        position: 'Developer',
        phone: '08123456711'
      });

      await attendanceSchema.create({
        _id: 'ATT11',
        employee_id: 'EMP202511',
        checkIn: new Date('2024-05-29T08:00:00Z'),
        checkOut: new Date('2024-05-29T17:00:00Z'),
        status: 'present'
      });


    await seatSchema.create({
      _id: 'S11',
      row: '1',
      tableNumber: '1',
      status: 'occupied',
      zone_id: 'ZONB',
      employee_id: 'EMP202511'
    });
  

  console.log('✅ Seeding completed.');
  process.exit(0);
}

seed().catch(console.error);