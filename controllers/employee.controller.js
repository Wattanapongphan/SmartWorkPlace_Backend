const employeeSchema = require('../models/employee.model');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeSchema.aggregate([
      {
        $addFields: {
          numericId: {
            $toInt: { $substr: ['$_id', 3, -1] } // ตัด "EMP" ออกแล้วแปลงเป็นเลข
          }
        }
      },
      {
        $sort: { numericId: 1 } // เรียงตามเลขท้ายจริง ๆ
      },
      {
        $project: {
          _id: 1,
          firstname: 1,
          lastname: 1,
          department: 1,
          position: 1,
          phone: 1
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
