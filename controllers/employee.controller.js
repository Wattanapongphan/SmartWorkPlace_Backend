const employeeSchema = require('../models/employee.model');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await employeeSchema.aggregate([
      {
        $lookup: {
          from: 'images',           //  ชื่อ collection จริง (ตาม MongoDB ไม่ใช่ชื่อ model)
          localField: '_id',     
          foreignField: 'employee_id', // เชื่อมกับ image.employee_id
          as: 'image'
        }
      },
      {
        $unwind: {
          path: '$image',
          preserveNullAndEmptyArrays: true //  ถ้าไม่มีรูป จะให้เป็น null แทนการลบ record
        }
      },
      {
        $project: {
          firstname: 1,
          lastname: 1,
          department: 1,
          position: 1,
          phone: 1,
          imageName: '$image.name' // เอาแค่ชื่อไฟล์ภาพ
        }
      },
      {
        $sort: { firstname: 1 }
      }
    ]);

    return res.status(200).json({
      message: true,
      data: employees
    });
  } catch (error) {
    console.error('Error fetching employees with image:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
