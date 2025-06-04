const employeeSchema = require('../models/employee.model');

exports.getEmployees = async (req, res) => {
    try {
        const employees = await employeeSchema.find({}, 'firstname lastname department position phone').sort({ firstname: 1 });
        
        return res.status(200).json({
            success: true,
            data: employees
        });
    } catch (error) {
        console.error('Error fetching employees:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
