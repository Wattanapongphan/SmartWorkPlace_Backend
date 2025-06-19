require('dotenv').config();
const mongoose = require('mongoose');
const buildingSchema = require('../models/building.model');
const floorSchema = require('../models/floor.model');
const zoneSchema = require('../models/zone.model');
const seatSchema = require('../models/seat.model');
const imgSchema = require('../models/image.model');
const attendanceSchema = require('../models/attendance.model');
const emplocationSchema = require('../models/employeeLocation.model');
const employeeSchema = require('../models/employee.model');

async function seed() {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    // Clear old data
    await buildingSchema.deleteMany();
    await floorSchema.deleteMany();
    await zoneSchema.deleteMany();
    await seatSchema.deleteMany();
    await imgSchema.deleteMany();
    await attendanceSchema.deleteMany();
    await emplocationSchema.deleteMany();
    await employeeSchema.deleteMany();

    // mock building data
    await buildingSchema.create([
        { _id: 'bkk-tst', name: 'Thai Summit Tower' ,location: 'bkk'},
        { _id: 'bkk-oai', name: 'OAI Tower' , location: 'bkk'},
        { _id: 'bkk-cps', name: 'Compound Space' , location: 'bkk'},
        { _id: 'cnx-stp', name: 'CMU Step' , location: 'cnx'},
        { _id: 'kkc-mdl', name: 'KhonKean' , location: 'kkc'},
        { _id: 'ska-hy', name: 'HatYai' , location: 'ska'},
        { _id: 'sri-srb', name: 'SaraBuri' , location: 'sri'}
    ]);

    // mock floor data
    //{_id: '' , name: '' , floorNumber: '' , building_id: ''}
    await floorSchema.create([
        {_id: 'bkk-tst-10', name: '10' , floorNumber: '10' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-12', name: '12' , floorNumber: '12' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-13', name: '13' , floorNumber: '13' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-14', name: '14' , floorNumber: '14' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-15', name: '15' , floorNumber: '15' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-16', name: '16' , floorNumber: '16' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-22', name: '22' , floorNumber: '22' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-24', name: '24' , floorNumber: '24' , building_id: 'bbk-tst'},
        {_id: 'bkk-oai-1', name: '1' , floorNumber: '1' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-2', name: '2' , floorNumber: '2' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-3', name: '3' , floorNumber: '3' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-4', name: '4' , floorNumber: '4' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-5', name: '5' , floorNumber: '5' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-6', name: '6' , floorNumber: '6' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-7', name: '7' , floorNumber: '7' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-8', name: '8' , floorNumber: '8' , building_id: 'bkk-oai'},
        {_id: 'bkk-cps-3' , name: '3' , floorNumber: '3' , building_id: 'bkk-cps'},
        {_id: 'bkk-cps-4' , name: '4' , floorNumber: '4' , building_id: 'bkk-cps'},
        {_id: 'cnx-stp-3' , name: '3' , floorNumber: '3' , building_id: 'cnx-stp'},
        {_id: 'cnx-stp-4' , name: '4' , floorNumber: '4' , building_id: 'cnx-stp'},
        {_id: 'kkc-mdl-1' , name: '1' , floorNumber: '1' , building_id: 'kkc-mdl'},
        {_id: 'kkc-mdl-2' , name: '2' , floorNumber: '2' , building_id: 'kkc-mdl'},
        {_id: 'kkc-mdl-3' , name: '3' , floorNumber: '3' , building_id: 'kkc-mdl'},
        {_id: 'ska-hy-5' , name: '5' , floorNumber: '5' , building_id: 'ska-hy'},
        {_id: 'ska-hy-7' , name: '7' , floorNumber: '7' , building_id: 'ska-hy'},
        {_id: 'ska-hy-8' , name: '8' , floorNumber: '8' , building_id: 'ska-hy'},
        {_id: 'sri-srb-1' , name: '1' , floorNumber: '1' , building_id: 'sri-srb'}
    ])

    // mock zone data
    //{_id: '' , name: '' ,row: [''], tableRow: [''], floor_id: ''}
    await zoneSchema.create([
        {_id: 'cnx-stp-3-A0' , name: 'Zone A0' , row: ['1', '2', '3'], tableRow: ['14', '28', '38'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-A1' , name: 'Zone A1' , row: ['1', '2', '3', '4'], tableRow: ['20', '36', '52', '68'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-A2' , name: 'Zone A2' , row: ['1', '2', '3'], tableRow: ['16', '32', '48'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-A3' , name: 'Zone A3' , row: ['1', '2', '3', '4'], tableRow: ['16', '32', '48', '58'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-A4' , name: 'Zone A4' , row: ['1', '2', '3'], tableRow: ['12', '26', '44'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-4-A0' , name: 'Zone A5' , row: ['1', '2'], tableRow: ['16', '28'], floor_id: 'cnx-stp-4'},
    ])

    // mock seat data
    //{tableNumber: '' , status: 'occupied' , zone_id: '', employee_id: ''}
    await seatSchema.create([
        {_id: '1', tableNumber: '1', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP1'},
        {_id: '2', tableNumber: '2', status: 'available', zone_id: 'cnx-stp-3-A0', employee_id: null},
        {_id: '3', tableNumber: '3', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP3'},
        {_id: '4', tableNumber: '4', status: 'available', zone_id: 'cnx-stp-3-A0', employee_id: null},
        {_id: '5', tableNumber: '5', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP5'},
        {_id: '6', tableNumber: '6', status: 'available', zone_id: 'cnx-stp-3-A0', employee_id: null},
        {_id: '7', tableNumber: '7', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP7'},
        {_id: '8', tableNumber: '8', status: 'available', zone_id: 'cnx-stp-3-A0', employee_id: null},
        {_id: '9', tableNumber: '9', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP9'},
        {_id: '10', tableNumber: '10', status: 'available', zone_id: 'cnx-stp-3-A0', employee_id: null},
        {_id: '11', tableNumber: '11', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP11'},
        {_id: '12', tableNumber: '12', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP12'},
        {_id: '13', tableNumber: '13', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP13'},
        {_id: '14', tableNumber: '14', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP14'},
        {_id: '15', tableNumber: '15', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP15'},
        {_id: '16', tableNumber: '16', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP16'},
        {_id: '17', tableNumber: '17', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP17'},
        {_id: '18', tableNumber: '18', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP18'},
        {_id: '19', tableNumber: '19', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP19'},
        {_id: '20', tableNumber: '20', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP20'},
        {_id: '21', tableNumber: '21', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP21'},
        {_id: '22', tableNumber: '22', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP22'},
        {_id: '23', tableNumber: '23', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP23'},
        {_id: '24', tableNumber: '24', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP24'},
        {_id: '25', tableNumber: '25', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP25'},
        {_id: '26', tableNumber: '26', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP26'},
        {_id: '27', tableNumber: '27', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP27'},
        {_id: '28', tableNumber: '28', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP28'},
        {_id: '29', tableNumber: '29', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP29'},
        {_id: '30', tableNumber: '30', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP30'},
        {_id: '31', tableNumber: '31', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP31'},
        {_id: '32', tableNumber: '32', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP32'},
        {_id: '33', tableNumber: '33', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP33'},
        {_id: '34', tableNumber: '34', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP34'},
        {_id: '35', tableNumber: '35', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP35'},
        {_id: '36', tableNumber: '36', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP36'},
        {_id: '37', tableNumber: '37', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP37'},
        {_id: '38', tableNumber: '38', status: 'occupied', zone_id: 'cnx-stp-3-A0', employee_id: 'EMP38'},
        {_id: '39', tableNumber: '1', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP39'},
        {_id: '40', tableNumber: '2', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP40'},
        {_id: '41', tableNumber: '3', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP41'},
        {_id: '42', tableNumber: '4', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP42'},
        {_id: '43', tableNumber: '5', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP43'},
        {_id: '44', tableNumber: '6', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP44'},
        {_id: '45', tableNumber: '7', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP45'},
        {_id: '46', tableNumber: '8', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP46'},
        {_id: '47', tableNumber: '9', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP47'},
        {_id: '48', tableNumber: '10', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP48'},
        {_id: '49', tableNumber: '11', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP49'},
        {_id: '50', tableNumber: '12', status: 'occupied', zone_id: 'cnx-stp-3-A1', employee_id: 'EMP50'},
    ]);

await emplocationSchema.create([
  // Zone A0
  { employee: "EMP1", zone: "cnx-stp-3-A0" },
  { employee: "EMP2", zone: "cnx-stp-3-A0" },
  { employee: "EMP3", zone: "cnx-stp-3-A0" },
  { employee: "EMP4", zone: "cnx-stp-3-A0" },
  { employee: "EMP5", zone: "cnx-stp-3-A0" },

  // Zone A1
  { employee: "EMP6", zone: "cnx-stp-3-A1" },
  { employee: "EMP7", zone: "cnx-stp-3-A1" },
  { employee: "EMP8", zone: "cnx-stp-3-A1" },
  { employee: "EMP9", zone: "cnx-stp-3-A1" },

  // Zone A2
  { employee: "EMP10", zone: "cnx-stp-3-A2" },
  { employee: "EMP11", zone: "cnx-stp-3-A2" },
  { employee: "EMP12", zone: "cnx-stp-3-A2" },
  { employee: "EMP13", zone: "cnx-stp-3-A2" },
  { employee: "EMP14", zone: "cnx-stp-3-A2" },

  // Zone A3
  { employee: "EMP15", zone: "cnx-stp-3-A3" },
  { employee: "EMP16", zone: "cnx-stp-3-A3" },
  { employee: "EMP17", zone: "cnx-stp-3-A3" },
  { employee: "EMP18", zone: "cnx-stp-3-A3" },

  // Zone A4
  { employee: "EMP19", zone: "cnx-stp-3-A4" },
  { employee: "EMP20", zone: "cnx-stp-3-A4" },
  { employee: "EMP21", zone: "cnx-stp-3-A4" },
  { employee: "EMP22", zone: "cnx-stp-3-A4" },
  { employee: "EMP23", zone: "cnx-stp-3-A4" }
]);

    


    let num = 51;
    // mock seat zone: cnx-stp-3-B
    for (let i = 13; i <= 68; i++) {
        await seatSchema.create({
            _id: `${num}`,
            tableNumber: i.toString(),
            status: 'available',
            zone_id: 'cnx-stp-3-B',
            employee_id: null
        });
        num++;
    }

    // mock image data
    const imageArray = [
        'https://changphapgroup.com/image_new_web/portrait/pic/TC_Mart/TC_800_1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2EKlJkLInjknZZjQCjlHGEF5lhZT1qtE_w&s',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvxNWIYPDQgjEsP6-uKV6-nGLcVCH6skqFug&s',
        'https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/MqazASlTAyuDhQEXQVfQ'
      ];
    
      const images = [];
    
      for (let i = 1; i <= 50; i++) {
        images.push({
          _id: `img-${i}`,
          url: imageArray[(i - 1) % imageArray.length],
          employee_id: `EMP${i}`
        });
      }
    
      await imgSchema.deleteMany({});
      await imgSchema.insertMany(images);


    const attendanceArray = [];

    const dates = [6, 7, 8, 9]; // วันที่ที่ต้องการ
    const currentMonth = new Date().getMonth(); // เดือนปัจจุบัน
    const currentYear = new Date().getFullYear(); // ปีปัจจุบัน

    for (let day of dates) {
        for (let i = 1; i <= 50; i++) {
            const baseDate = new Date(currentYear, currentMonth, day);
            
            if (day === 7 || day === 8) {
                attendanceArray.push({
                    employee_id: `EMP${i}`,
                    date: baseDate,
                    checkInTime: null,
                    checkOutTime: null,
                    status: 'absent'
                });
            }else {
                const checkInTime = new Date(baseDate);
                checkInTime.setHours(8, 30, 0, 0); // 08:30

                const checkOutTime = new Date(baseDate);
                checkOutTime.setHours(17, 30, 0, 0); // 17:30

                if (i === 49 || i === 50) {
                    attendanceArray.push({
                        employee_id: `EMP${i}`,
                        date: baseDate,
                        checkInTime: checkInTime,
                        checkOutTime: null,
                        status: 'absent'
                    });
                } else {
                    attendanceArray.push({
                        employee_id: `EMP${i}`,
                        date: baseDate,
                        checkInTime: checkInTime,
                        checkOutTime: checkOutTime,
                        status: 'present'
                    });
                }

            }
            
        }
    }

    await attendanceSchema.deleteMany({});
    await attendanceSchema.insertMany(attendanceArray);

    const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Sales'];
    const positions = ['Developer', 'Manager', 'Analyst', 'Designer', 'Support'];
    const employees = [];

  for (let i = 0; i <= 50; i++) {
    const empId = `EMP${i}`;
    employees.push({
      _id: empId,
      firstname: `User${i}`,
      lastname: `Lastname${i}`,
      department: departments[i % departments.length],
      position: positions[i % positions.length],
      phone: `08123456${String(i).padStart(2, '0')}`,
    });
  }

    await employeeSchema.deleteMany({});
    await employeeSchema.insertMany(employees);
}



seed()
    .then(() => {
        console.log('Database seeded successfully');
        mongoose.connection.close();
    })
    .catch(err => {
        console.error('Error seeding database:', err);
        mongoose.connection.close();
    });