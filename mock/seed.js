require('dotenv').config();
const mongoose = require('mongoose');
const buildingSchema = require('../models/building.model');
const floorSchema = require('../models/floor.model');
const zoneSchema = require('../models/zone.model');
const seatSchema = require('../models/seat.model');
const imgSchema = require('../models/image.model');
const attendanceSchema = require('../models/attendance.model');

async function seed() {
    await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

    // Clear old data
    await buildingSchema.deleteMany();
    await floorSchema.deleteMany();
    await zoneSchema.deleteMany();
    await seatSchema.deleteMany();
    await imgSchema.deleteMany();
    await attendanceSchema.deleteMany();

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
        {_id: 'bkk-tst-10', name: 'ชั้น 10' , floorNumber: '10' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-12', name: 'ชั้น 12' , floorNumber: '12' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-13', name: 'ชั้น 13' , floorNumber: '13' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-14', name: 'ชั้น 14' , floorNumber: '14' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-15', name: 'ชั้น 15' , floorNumber: '15' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-16', name: 'ชั้น 16' , floorNumber: '16' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-22', name: 'ชั้น 22' , floorNumber: '22' , building_id: 'bbk-tst'},
        {_id: 'bkk-tst-24', name: 'ชั้น 24' , floorNumber: '24' , building_id: 'bbk-tst'},
        {_id: 'bkk-oai-1', name: 'ชั้น 1' , floorNumber: '1' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-2', name: 'ชั้น 2' , floorNumber: '2' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-3', name: 'ชั้น 3' , floorNumber: '3' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-4', name: 'ชั้น 4' , floorNumber: '4' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-5', name: 'ชั้น 5' , floorNumber: '5' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-6', name: 'ชั้น 6' , floorNumber: '6' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-7', name: 'ชั้น 7' , floorNumber: '7' , building_id: 'bkk-oai'},
        {_id: 'bkk-oai-8', name: 'ชั้น 8' , floorNumber: '8' , building_id: 'bkk-oai'},
        {_id: 'bkk-cps-3' , name: 'ชั้น 3' , floorNumber: '3' , building_id: 'bkk-cps'},
        {_id: 'bkk-cps-4' , name: 'ชั้น 4' , floorNumber: '4' , building_id: 'bkk-cps'},
        {_id: 'cnx-stp-3' , name: 'ชั้น 3' , floorNumber: '3' , building_id: 'cnx-stp'},
        {_id: 'cnx-stp-4' , name: 'ชั้น 4' , floorNumber: '4' , building_id: 'cnx-stp'},
        {_id: 'kkc-mdl-1' , name: 'ชั้น 1' , floorNumber: '1' , building_id: 'kkc-mdl'},
        {_id: 'kkc-mdl-2' , name: 'ชั้น 2' , floorNumber: '2' , building_id: 'kkc-mdl'},
        {_id: 'kkc-mdl-3' , name: 'ชั้น 3' , floorNumber: '3' , building_id: 'kkc-mdl'},
        {_id: 'ska-hy-5' , name: 'ชั้น 5' , floorNumber: '5' , building_id: 'ska-hy'},
        {_id: 'ska-hy-7' , name: 'ชั้น 7' , floorNumber: '7' , building_id: 'ska-hy'},
        {_id: 'ska-hy-8' , name: 'ชั้น 8' , floorNumber: '8' , building_id: 'ska-hy'},
        {_id: 'sri-srb-1' , name: 'ชั้น 1' , floorNumber: '1' , building_id: 'sri-srb'}
    ])

    // mock zone data
    //{_id: '' , name: '' ,row: [''], tableRow: [''], floor_id: ''}
    await zoneSchema.create([
        {_id: 'cnx-stp-3-A' , name: 'Zone A' , row: ['1', '2', '3'], tableRow: ['14', '28', '38'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-B' , name: 'Zone B' , row: ['1', '2', '3', '4'], tableRow: ['20', '36', '52', '68'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-C' , name: 'Zone C' , row: ['1', '2', '3'], tableRow: ['16', '32', '48'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-D' , name: 'Zone D' , row: ['1', '2', '3', '4'], tableRow: ['16', '32', '48', '58'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-3-E' , name: 'Zone E' , row: ['1', '2', '3'], tableRow: ['12', '26', '44'], floor_id: 'cnx-stp-3'},
        {_id: 'cnx-stp-4-F' , name: 'Zone F' , row: ['1', '2'], tableRow: ['16', '28'], floor_id: 'cnx-stp-4'},
    ])

    // mock seat data
    //{tableNumber: '' , status: 'occupied' , zone_id: '', employee_id: ''}
    await seatSchema.create([
        {_id: '1', tableNumber: '1', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP1'},
        {_id: '2', tableNumber: '2', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP2'},
        {_id: '3', tableNumber: '3', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP3'},
        {_id: '4', tableNumber: '4', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP4'},
        {_id: '5', tableNumber: '5', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP5'},
        {_id: '6', tableNumber: '6', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP6'},
        {_id: '7', tableNumber: '7', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP7'},
        {_id: '8', tableNumber: '8', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP8'},
        {_id: '9', tableNumber: '9', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP9'},
        {_id: '10', tableNumber: '10', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP10'},
        {_id: '11', tableNumber: '11', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP11'},
        {_id: '12', tableNumber: '12', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP12'},
        {_id: '13', tableNumber: '13', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP13'},
        {_id: '14', tableNumber: '14', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP14'},
        {_id: '15', tableNumber: '15', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP15'},
        {_id: '16', tableNumber: '16', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP16'},
        {_id: '17', tableNumber: '17', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP17'},
        {_id: '18', tableNumber: '18', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP18'},
        {_id: '19', tableNumber: '19', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP19'},
        {_id: '20', tableNumber: '20', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP20'},
        {_id: '21', tableNumber: '21', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP21'},
        {_id: '22', tableNumber: '22', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP22'},
        {_id: '23', tableNumber: '23', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP23'},
        {_id: '24', tableNumber: '24', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP24'},
        {_id: '25', tableNumber: '25', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP25'},
        {_id: '26', tableNumber: '26', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP26'},
        {_id: '27', tableNumber: '27', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP27'},
        {_id: '28', tableNumber: '28', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP28'},
        {_id: '29', tableNumber: '29', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP29'},
        {_id: '30', tableNumber: '30', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP30'},
        {_id: '31', tableNumber: '31', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP31'},
        {_id: '32', tableNumber: '32', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP32'},
        {_id: '33', tableNumber: '33', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP33'},
        {_id: '34', tableNumber: '34', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP34'},
        {_id: '35', tableNumber: '35', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP35'},
        {_id: '36', tableNumber: '36', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP36'},
        {_id: '37', tableNumber: '37', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP37'},
        {_id: '38', tableNumber: '38', status: 'occupied', zone_id: 'cnx-stp-3-A', employee_id: 'EMP38'},
        {_id: '39', tableNumber: '1', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP39'},
        {_id: '40', tableNumber: '2', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP40'},
        {_id: '41', tableNumber: '3', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP41'},
        {_id: '42', tableNumber: '4', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP42'},
        {_id: '43', tableNumber: '5', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP43'},
        {_id: '44', tableNumber: '6', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP44'},
        {_id: '45', tableNumber: '7', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP45'},
        {_id: '46', tableNumber: '8', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP46'},
        {_id: '47', tableNumber: '9', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP47'},
        {_id: '48', tableNumber: '10', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP48'},
        {_id: '49', tableNumber: '11', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP49'},
        {_id: '50', tableNumber: '12', status: 'occupied', zone_id: 'cnx-stp-3-B', employee_id: 'EMP50'},
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