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
          preserveNullAndEmptyArrays: true // ถ้าไม่มีรูปก็ยังคงแสดงข้อมูลพนักงาน
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
          image_url: '$image.url' // แสดง URL ของรูปภาพ
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
