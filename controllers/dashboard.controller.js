const employeeSchema = require('../models/employee.model');
const seatSchema = require('../models/seat.model');
const attendanceSchema = require('../models/attendance.model');
const moment = require('moment');


exports.getDashboardData = async (req, res) => {
  try {
    const totalEmployees = await employeeSchema.countDocuments();

    const totalSeats = await seatSchema.countDocuments();

    const occupiedSeats = await seatSchema.countDocuments({ status: 'occupied' });

    const availableSeats = await seatSchema.countDocuments({ status: 'available' });

     const dataattendance = await attendanceSchema.find({
            date: {
                $gte: moment().subtract(3, 'day').startOf('day').toDate(),
                $lt: moment().add(1, 'day').startOf('day').toDate()
            },
            status: 'present'
        }).populate('employee_id', 'firstname lastname');

        const dataCountMap = {};

        dataattendance.forEach((att) => {
            const formattedDate = moment(att.date).format('YYYY-MM-DD');
            if (!dataCountMap[formattedDate]) {
                dataCountMap[formattedDate] = [];
            }
            dataCountMap[formattedDate].push(att.employee_id);
        });

        const labels = [];
        const data = [];

        for (let i = 0; i < 4; i++) {
            const date = moment().subtract(i, 'day').format('YYYY-MM-DD');
            labels.push(date);
            data.push(dataCountMap[date] ? dataCountMap[date].length : 0);
        }
    
    return res.status(200).json({
      totalEmployees,
      totalSeats,
      occupiedSeats,
      availableSeats,
      labels,
      data
    });

  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
