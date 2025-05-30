const employeeModel = require("../model/employee");

exports.getEmployees = async (req, res) => {
  const employee = await employeeModel.find();
  res.status(200).json({
    message: "Get Seats Successfull",
    data: employee,
  });
};
exports.AddEmployees = async (req, res) => {
  try {
    const { employeeId, firstname, lastname, department, profilePicture } = req.body;

    const exists = await employeeModel.findOne({  employeeId, firstname, lastname, department });
    if (exists) {
      return res.status(400).json({
        message: "employee is already",
      });
    }

    const newEmployee = new employeeModel({
      employeeId,
      firstname,
      lastname,
      department,
      profilePicture,
    });

    const saveEmployee = await newEmployee.save();
    res.status(201).json({
      message: "Create Employee is Sucessful",
      data: saveEmployee,
    });
  } catch (error) {
    res.status(401).json({
      message: "Cannot Create Employee !!",
      error: error.message,
    });
  }
};


