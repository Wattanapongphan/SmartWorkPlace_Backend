const seatSchema = require('../models/seat.model');
const employeeSchema = require('../models/employee.model');
const zoneSchema = require('../models/zone.model');

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
    const { zoneName } = req.params;

    // from ZoneA to Zone A
    const formattedZone = zoneName.replace(/([a-z])([A-Z])/g, '$1 $2');

    // find zone._id use zonedata._id
    const zonedata = await zoneSchema.findOne({ name: formattedZone });

    const seats = await seatSchema.find({ zone_id: zonedata._id }, 'emp_id tableNumber status -_id');

    const seatsChangeStatus = seats.map(seat => ({
      employee_id: seat.employee_id,
      tableNumber: seat.tableNumber,
      status: seat.status === 'occupied' ? 'active' : 'inactive'
    }));

    const totalable = seatsChangeStatus.length;
    const tableActive = seatsChangeStatus.filter(seat => seat.status === 'inactive').length;

  
    return res.status(200).json({
      data: seatsChangeStatus,
      tableActive: tableActive,
      totalTable: totalable
    })

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching table data', error });
  }
}

exports.deletetable = async (req, res) => {
  try {
    const { zoneName , tableNumber } = req.params;

    // from ZoneA to Zone A
    const formattedZone = zoneName.replace(/([a-z])([A-Z])/g, '$1 $2');

    // find zone._id use zonedata._id
    const zonedata = await zoneSchema.findOne({ name: formattedZone });


    const updatedSeat = await seatSchema.findOneAndUpdate(
      { zone_id: zonedata._id ,tableNumber },
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
    const { zoneName, emp_id, tableNumber } = req.params;

    // from ZoneA to Zone A
    const formattedZone = zoneName.replace(/([a-z])([A-Z])/g, '$1 $2');

    // find zone._id use zonedata._id
    const zonedata = await zoneSchema.findOne({ name: formattedZone });

    const data_emp = await employeeSchema.findById(emp_id);
    if (!data_emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    const data_emp_seat = await seatSchema.find({ emp_id });
    if (data_emp_seat.length > 0) {
      return res.status(400).json({ message: 'Employee already has a seat' });
    }

    const updatedSeat = await seatSchema.findOneAndUpdate(
      { zone_id: zonedata._id ,tableNumber },
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
