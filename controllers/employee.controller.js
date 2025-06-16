const employeeSchema = require('../models/employee.model');
const emplocationSchema = require('../models/employeeLocation.model');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeSchema.aggregate([
        {
          $addFields: {
            numericId: {
              $toInt: { $substr: ['$_id', 3, -1] }
            }
          }
        },
        {
          $sort: { numericId: 1 }
        },
        {
          $lookup: {
            from: 'images',
            localField: '_id',
            foreignField: 'employee_id',
            as: 'image'
          }
        },
        {
          $unwind: {
            path: '$image',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'seats',
            localField: '_id',
            foreignField: 'employee_id',
            as: 'seat'
          }
        },
        {
          $unwind: {
            path: '$seat',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            firstname: 1,
            lastname: 1,
            department: 1,
            position: 1,
            phone: 1,
            image_url: '$image.url',
            zone_id: '$seat.zone_id'
          }
        }
      ]);

    return res.status(200).json({
      success: true,
      data: employees
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await employeeSchema.aggregate([
      {
        $match: { _id: id } // ใช้ match เพื่อหาเฉพาะพนักงานคนนั้น
      },
      {
        $lookup: {
          from: 'images',
          localField: '_id',
          foreignField: 'employee_id',
          as: 'image'
        }
      },
      {
        $unwind: {
          path: '$image',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
            from: 'seats',
            localField: '_id',
            foreignField: 'employee_id',
            as: 'seat'
          }
        },
        {
          $unwind: {
            path: '$seat',
            preserveNullAndEmptyArrays: true
          }
        },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          department: 1,
          position: 1,
          phone: 1,
          email: 1,
          image_url: '$image.url',
          zone_id: '$seat.zone_id'
        }
      }
    ]);


    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    return res.status(200).json({
      success: true,
      data: employee
    });

  } catch (error) {
    console.error('Error fetching employee:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

// exports.getEmployeeLocation = async (req, res) => {
//   try {
//     const emplocation = await emplocationSchema
//       .find()
//       .populate('employee')
//       .populate({
//         path: 'zone',
//         select:'_id name floor_id',
//       });

      
//     return res.status(200).json({ success: true, data: emplocation });
//   } catch (error) {
//     console.error('Error fetching employee location:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

exports.getEmployeeLocation = async (req, res) => {
  try {
    const emplocation = await emplocationSchema.aggregate([
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employee'
        }
      },
      {
        $unwind: '$employee'
      },
      {
        $lookup: {
          from: 'zones',
          localField: 'zone',
          foreignField: '_id',
          as: 'zone'
        }
      },
      {
        $unwind: '$zone'
      },
      {
        $project: {
          _id: 0,
          employee: {
            emp_id: '$employee._id',
            firstname: '$employee.firstname',
            lastname: '$employee.lastname'
          },
          zone: {
            _id: '$zone._id',
            name: '$zone.name',
            floor_id: '$zone.floor_id'
          }
        }
      }
    ]);

    return res.status(200).json({ success: true, data: emplocation });
  } catch (error) {
    console.error('Error fetching employee location:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getEmployeeLocationByZone = async (req, res) => {
  try {
    const { zoneId } = req.params;

    const emplocation = await emplocationSchema.aggregate([
      {
        $match: { zone: zoneId }
      },
      {
        $lookup: {
          from: 'employees',
          localField: 'employee',
          foreignField: '_id',
          as: 'employee'
        }
      },
      {
        $unwind: '$employee'
      },
      {
        $project: {
          _id: 0,
          employee: {
            emp_id:'$employee._id',
            firstname: '$employee.firstname',
            lastname: '$employee.lastname'
          },
          zone: 1 
        }
      }
    ]);

    return res.status(200).json({ success: true, data: emplocation });
  } catch (error) {
    console.error('Error fetching employee location by zone:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}