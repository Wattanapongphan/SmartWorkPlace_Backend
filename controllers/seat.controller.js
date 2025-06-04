const seatSchema = require('../models/seat.model');

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
  $sort: { floor: 1 }  // เรียงจากน้อยไปมาก เช่น 1, 2, 3, ...
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

