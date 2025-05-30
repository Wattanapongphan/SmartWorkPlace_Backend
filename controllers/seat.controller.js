const seatSchema = require('../models/seat.model');

const getseatings = async (req, res) => {
    try {
        const result = await seatSchema.aggregate([
            // Join Zone
      {
        $lookup: {
          from: 'zones',
          localField: 'zone_id',
          foreignField: '_id',
          as: 'zone'
        }
      },
      { $unwind: '$zone' },

      // Join Floor
      {
        $lookup: {
          from: 'floors',
          localField: 'zone.floor_id',
          foreignField: '_id',
          as: 'floor'
        }
      },
      { $unwind: '$floor' },

      // Join Employee
      {
        $lookup: {
          from: 'employees',
          localField: 'employee_id',
          foreignField: '_id',
          as: 'employee'
        }
      },
      { $unwind: { path: '$employee', preserveNullAndEmptyArrays: true } },

      // Join Attendance
      {
        $lookup: {
          from: 'attendances',
          localField: 'employee._id',
          foreignField: 'employee_id',
          as: 'attendance'
        }
      },

      // Group by floor, zone, row
      {
        $group: {
          _id: {
            floor_id: '$floor._id',
            zone_id: '$zone._id',
            row: '$row'
          },
          floor: { $first: '$floor.name' },
          zone: { $first: '$zone.name' },
          row: { $first: '$row' },
          seats: {
            $push: {
              tableNumber: '$tableNumber',
              status: '$status',
              employee: {
                employeeId: '$employee.employeeId',
                firstname: '$employee.firstname',
                lastname: '$employee.lastname',
                department: '$employee.department',
                position: '$employee.position',
                phone: '$employee.phone',
                attendance: '$attendance'
              }
            }
          }
        }
      },

      // Group by zone
      {
        $group: {
          _id: {
            floor_id: '$_id.floor_id',
            zone_id: '$_id.zone_id'
          },
          floor: { $first: '$floor' },
          zone: { $first: '$zone' },
          rows: {
            $push: {
              name: '$row',
              seats: '$seats'
            }
          }
        }
      },

      // Group by floor
      {
        $group: {
          _id: '$_id.floor_id',
          floor: { $first: '$floor' },
          zones: {
            $push: {
              name: '$zone',
              rows: '$rows'
            }
          }
        }
      },

      // Output formatting
      {
        $project: {
          _id: 0,
          floor: 1,
          zones: 1
        }
      }
    ]);

    res.json(result);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching seats', error });
    }
}

module.exports = {
    getseatings
};