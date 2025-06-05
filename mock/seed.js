require("dotenv").config();
const mongoose = require("mongoose");
const floorSchema = require("../models/floor.model");
const zoneSchema = require("../models/zone.model");
const seatSchema = require("../models/seat.model");
const employeeSchema = require("../models/employee.model");
const attendanceSchema = require("../models/attendance.model");
const buildingSchema = require("../models/building.model");

async function seed() {
  await mongoose.connect(
    `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  );

  // เคลียร์ของเก่า
  await floorSchema.deleteMany();
  await zoneSchema.deleteMany();
  await seatSchema.deleteMany();
  await employeeSchema.deleteMany();
  await attendanceSchema.deleteMany();
  await buildingSchema.deleteMany();

  // 🏢 Buildings
  const buildings = [
    { _id: "cnx", name: "ตึกเชียงใหม่" },
    { _id: "bkk", name: "ตึกกรุงเทพ" },
    { _id: "kkc", name: "ตึกขอนแก่น" },
    { _id: "hdy", name: "ตึกหาดใหญ่" },
  ];
  await buildingSchema.insertMany(buildings);

  // 🧱 Floors & Zones
  const floors = [];
  const zones = [];
  let floorId = 1;
  let zoneId = 1;

  for (const building of buildings) {
    for (let f = 1; f <= 2; f++) {
      const floor = {
        _id: `${floorId}`,
        name: `Floor ${f}`,
        building_id: building._id,
      };
      floors.push(floor);

      // Zone A & B
      ["A", "B"].forEach((letter) => {
        zones.push({
          _id: `${zoneId}`,
          name: `Zone ${letter}`,
          floor_id: floor._id,
        });
        zoneId++;
      });

      floorId++;
    }
  }

  await floorSchema.insertMany(floors);
  await zoneSchema.insertMany(zones);

  // 👩‍💻 Employees & Attendance
  const employees = [];
  const attendance = [];

  for (let i = 1; i <= 50; i++) {
    const empId = `EMP${i}`;
    const emp = await employeeSchema.create({
      _id: empId,
      firstname: `User${i}`,
      lastname: `Lastname${i}`,
      department: "IT",
      position: "Developer",
      phone: `08123456${i.toString().padStart(2, "0")}`,
    });
    employees.push(emp);

    attendance.push(
      await attendanceSchema.create({
        _id: `ATT${i}`,
        employee_id: empId,
        checkIn: new Date("2024-05-29T08:30:00Z"),
        checkOut: new Date("2024-05-29T17:30:00Z"),
        status: "present",
      })
    );
  }

  // 💺 Seats
  let seatId = 1;
  for (const zone of zones) {
    for (let i = 1; i <= 5; i++) {
      await seatSchema.create({
        _id: `S${seatId}`,
        row: "1",
        tableNumber: `${i}`,
        status: i % 2 === 0 ? "available" : "occupied",
        zone_id: zone._id,
        employee_id: i % 2 === 0 ? null : employees[(seatId - 1) % 50]._id,
      });
      seatId++;
    }
  }

  console.log("✅ Seeding completed.");
  process.exit(0);
}

seed().catch(console.error);
