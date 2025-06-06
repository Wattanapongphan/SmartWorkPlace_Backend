const seatSchema = require('../models/seat.model');
const employeeSchema = require('../models/employee.model');
const seat2Schema = require('../models/seat2.model');

exports.getseatings = async (req, res) => {
 try {
    const result = await seatSchema.aggregate([
      // Join Zone
      {
        $lookup: {
          from: "zones",
          localField: "zone_id",
          foreignField: "_id",
          as: "zone",
        },
      },
      { $unwind: "$zone" },

      // Join Floor
      {
        $lookup: {
          from: "floors",
          localField: "zone.floor_id",
          foreignField: "_id",
          as: "floor",
        },
      },
      { $unwind: "$floor" },

      // Join Employee
      {
        $lookup: {
          from: "employees",
          localField: "employee_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },

      // Group seats by floor, zone, row
      {
        $group: {
          _id: {
            floor_id: "$floor._id",
            zone_id: "$zone._id",
            row: "$row",
          },
          floor: { $first: "$floor.name" },
          zone: { $first: "$zone.name" },
          row: { $first: "$row" },
          seats: {
            $push: {
              seatNumber: "$seatNumber",
              status: "$status",
              employee: {
                $cond: [
                  { $ifNull: ["$employee", false] },
                  {
                    employeeId: "$employee.employeeId",
                    firstname: "$employee.firstname",
                    lastname: "$employee.lastname",
                  },
                  null,
                ],
              },
            },
          },
        },
      },

      // Group rows by zone
      {
        $group: {
          _id: {
            floor_id: "$_id.floor_id",
            zone_id: "$_id.zone_id",
          },
          floor: { $first: "$floor" },
          zone: { $first: "$zone" },
          rows: {
            $push: {
              name: "$row",
              seats: "$seats",
            },
          },
        },
      },

      // Group zones by floor
      {
        $group: {
          _id: "$_id.floor_id",
          floor: { $first: "$floor" },
          zones: {
            $push: {
              name: "$zone",
              rows: "$rows",
            },
          },
        },
      },
      {
  $sort: { floor: 1  }  // เรียงจากน้อยไปมาก เช่น 1, 2, 3, ...
},

      // Final output: remove _id field
      {
        $project: {
          _id: 0,
          floor: 1,
          zones: 1,
        },
      },
    ]);

    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching seats", error });
  }
};
  
exports.filter = async (req, res) => {
  try {
    const { floor, zone, row} = req.query;
    const match = {};

    if (floor) { match['floor.name'] = floor;}
    if (zone) { match['zone.name'] = zone;}
    if (row) { match.row = row; }

    const result = await seatSchema.aggregate([
      // Join Zone
      {
        $lookup: {
          from: "zones",
          localField: "zone_id",
          foreignField: "_id",
          as: "zone",
        },
      },
      { $unwind: "$zone" },

      // Join Floor
      {
        $lookup: {
          from: "floors",
          localField: "zone.floor_id",
          foreignField: "_id",
          as: "floor",
        },
      },
      { $unwind: "$floor" },

      // Join Employee
      {
        $lookup: {
          from: "employees",
          localField: "employee_id",
          foreignField: "_id",
          as: "employee",
        },
      },
      { $unwind: { path: "$employee", preserveNullAndEmptyArrays: true } },

      // Match filters
      { $match: match },

      // Group seats by floor, zone, row
      {
        $group: {
          _id: {
            floor_id: "$floor._id",
            zone_id: "$zone._id",
            row: "$row",
          },
          floor: { $first: "$floor.name" },
          zone: { $first: "$zone.name" },
          row: { $first: "$row" },
          seats: {
            $push: {
              seatNumber: "$seatNumber",
              status: "$status",
              employee: {
                $cond: [
                  { $ifNull: ["$employee", false] },
                  {
                    employeeId: "$employee.employeeId",
                    firstname: "$employee.firstname",
                    lastname: "$employee.lastname",
                  },
                  null,
                ],
              },
            },
          },
        },
      },

      // Group rows by zone
      {
        $group: {
          _id: {
            floor_id: "$_id.floor_id",
            zone_id: "$_id.zone_id",
          },
          floor: { $first: "$floor" },
          zone: { $first: "$zone" },
          rows: {
            $push: {
              name: "$row",
              seats: "$seats",
            },
          },
        },
      },

      // Group zones by floor
      {
        $group: {
          _id: "$_id.floor_id",
          floor: { $first: "$floor" },
          zones: {
            $push: {
              name: "$zone",
              rows: "$rows",
            },
          },
        },
      },
      {
        $sort: { floor: 1 }  // Sort by floor name
      },
      // Final output: remove _id field
      {
        $project: {
          _id: 0,
          floor: 1,
          zones: 1,
        },
      },
    ]);

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching data', error });
  }
};

exports.gettable = async (req, res) => {
  try {
    // const data = [{
    //   data : [
    //     {
    //       "emp_id":"EMP1",
    //       "tableNumber":"1",
    //       "status":"active",
    //     },
    //     {
    //       "emp_id":"EMP2",
    //       "tableNumber":"2",
    //       "status":"active",
    //     },
    //     {
    //       "emp_id":"EMP3",
    //       "tableNumber":"3",
    //       "status":"active",
    //     },
    //     {
    //       "emp_id":"EMP4",
    //       "tableNumber":"4",
    //       "status":"active",
    //     },
    //     {
    //       "emp_id":"EMP5",
    //       "tableNumber":"5",
    //       "status":"active",
    //     },
    //     {
    //       "emp_id":null,
    //       "tableNumber":"6",
    //       "status":"inactive",
    //     },
    //     {
    //       "emp_id":null,
    //       "tableNumber":"7",
    //       "status":"inactive",
    //     },
    //     {
    //       "emp_id":"EMP8",
    //       "tableNumber":"8",
    //       "status":"active",
    //     },
    //     {
    //       "emp_id": null,
    //       "tableNumber":"9",
    //       "status":"inactive",
    //     },
    //     {
    //       "emp_id":"EMP10",
    //       "tableNumber":"10",
    //       "status":"active",
    //     }

    //   ],

    //   tableActive : '7',
    //   totalTable : 10
    // }
    // ]

    const seats = await seat2Schema.find({}, 'emp_id tableNumber status -_id');

    const totalable = seats.length;
    const tableActive = seats.filter(seat => seat.status === 'active').length;

  
    return res.status(200).json({
      data: seats,
      tableActive: tableActive,
      totalTable: totalable
    })

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching table data', error });
  }
}

exports.posttable = async (req, res) => {
  try {
    let { emp_id, tableNumber, status } = req.body;

    const data_emp = await employeeSchema.findOne({ emp_id });
    if (!data_emp) {

      return res.status(404).json({ message: 'Employee not found' });
    }else{

      const data_seat = await seat2Schema.findOne({ tableNumber });
      const data_emp_seat = await seat2Schema.find({})

      if (data_seat.status === 'inactive') {
        return res.status(400).json({ message: 'Table is already inactive' });
      } 

      for (i = 0; i < data_emp_seat.length; i++) {
        if (data_emp_seat[i].emp_id === emp_id) {
          return res.status(400).json({ message: 'Employee already has a seat' });
        }
      }
    }

    const newSeat = new seat2Schema({
      emp_id,
      tableNumber,
      status
    });

    await newSeat.save();
    return res.status(201).json({ message: 'Table created successfully', data: newSeat });

  } catch (error) {
    return res.status(500).json({ message: 'Error creating table', error });
  }
}

exports.deletetable = async (req, res) => {
  try {
    const { tableNumber } = req.params;

    const updatedSeat = await seat2Schema.findOneAndUpdate(
      { tableNumber },
      {
        emp_id: null,
        status: 'inactive'
      },
      { new: true }
    );

    if (!updatedSeat) {
      return res.status(404).json({ message: 'Table not found or already inactive' });
    }

    return res.status(200).json({ message: 'Successfully removed the employee from this seat', data: updatedSeat });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error deleting table', error });
  }
};


exports.updatetable = async (req, res) => {
  try {
    const { emp_id, tableNumber } = req.params;

    const data_emp = await employeeSchema.findById(emp_id);
    if (!data_emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const data_emp_seat = await seat2Schema.find({ emp_id });
    if (data_emp_seat.length > 0) {
      return res.status(400).json({ message: 'Employee already has a seat' });
    }

    const updatedSeat = await seat2Schema.findOneAndUpdate(
      { tableNumber },
      {
        emp_id,
        status: 'active'
      },
      { new: true }
    );

    if (!updatedSeat) {
      return res.status(404).json({ message: 'Table not found or update failed' });
    }

    return res.status(200).json({ message: 'Table updated successfully', data: updatedSeat });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating table', error });
  }
};
