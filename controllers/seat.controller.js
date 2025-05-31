const seatSchema = require('../models/seat.model');

const seatings = async (req, res) => {
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

    return res.json(result);

    } catch (error) {
      return res.status(500).json({ message: 'Error fetching seats', error });
    }
}

const filterseatings = async (req, res) => {
  try {
    const { floor, zone, row, tableNumber } = req.query;

    const pipeline = [];

    // Lookup Zone
    pipeline.push({
      $lookup: {
        from: 'zones',
        localField: 'zone_id',
        foreignField: '_id',
        as: 'zone'
      }
    }, { $unwind: '$zone' });

    // Lookup Floor
    pipeline.push({
      $lookup: {
        from: 'floors',
        localField: 'zone.floor_id',
        foreignField: '_id',
        as: 'floor'
      }
    }, { $unwind: '$floor' });

    // Lookup Employee (for the deepest level)
    pipeline.push({
      $lookup: {
        from: 'employees',
        localField: 'employee_id',
        foreignField: '_id',
        as: 'employee'
      }
    }, { $unwind: { path: '$employee', preserveNullAndEmptyArrays: true } });

    // Lookup Attendance (for the deepest level)
    pipeline.push({
      $lookup: {
        from: 'attendances',
        localField: 'employee._id',
        foreignField: 'employee_id',
        as: 'attendance'
      }
    });

    // Apply filters 
    const matchConditions = {};
    if (floor) matchConditions['floor.name'] = floor;
    if (zone) matchConditions['zone.name'] = zone;
    if (row) matchConditions['row'] = row;
    if (tableNumber) matchConditions['tableNumber'] = tableNumber;

    if (Object.keys(matchConditions).length > 0) {
      pipeline.push({ $match: matchConditions });
    }

    // Grouping based on query parameters to create hierarchical output

    if (!floor && !zone && !row && !tableNumber) {
      // No filters at all, full hierarchy floor > zones > rows > tables > employee
      pipeline.push(
        // Group by floor, zone, row, tableNumber to get seat info with employee & attendance
        {
          $group: {
            _id: {
              floorId: '$floor._id',
              floorName: '$floor.name',
              zoneId: '$zone._id',
              zoneName: '$zone.name',
              row: '$row',
              tableNumber: '$tableNumber'
            },
            status: { $first: '$status' },
            employee: { $first: '$employee' },
            attendance: { $first: '$attendance' }
          }
        },
        // Group by floor, zone, row to collect tables
        {
          $group: {
            _id: {
              floorId: '$_id.floorId',
              floorName: '$_id.floorName',
              zoneId: '$_id.zoneId',
              zoneName: '$_id.zoneName',
              row: '$_id.row'
            },
            tables: {
              $push: {
                tableNumber: '$_id.tableNumber',
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
        // Group by floor, zone to collect rows
        {
          $group: {
            _id: {
              floorId: '$_id.floorId',
              floorName: '$_id.floorName',
              zoneId: '$_id.zoneId',
              zoneName: '$_id.zoneName'
            },
            rows: {
              $push: {
                name: '$_id.row',
                tables: '$tables'
              }
            }
          }
        },
        // Group by floor to collect zones
        {
          $group: {
            _id: '$_id.floorId',
            floor: { $first: '$_id.floorName' },
            zones: {
              $push: {
                name: '$_id.zoneName',
                rows: '$rows'
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            floor: 1,
            zones: 1
          }
        }
      );
    } else if (floor && !zone) {
            // ส่วนที่ 1: get zone list (สำหรับ select dropdown)
        const zoneListPipeline = [
          ...pipeline, // มี lookup zone, floor แล้ว
          {
            $group: {
              _id: '$zone._id',
              name: { $first: '$zone.name' },
              floor: { $first: '$floor.name' }
            }
          },
          {
            $match: { floor: floor }
          },
          {
            $project: {
              _id: 0,
              id: '$_id',
              name: 1
            }
          }
        ];

        // ส่วนที่ 2: get zoneDetails
        const zoneDetailsPipeline = [
          ...pipeline, // ใช้ pipeline เดิมต่อ
          {
            $match: { 'floor.name': floor }
          },
          {
            $group: {
              _id: {
                zoneId: '$zone._id',
                zoneName: '$zone.name',
                row: '$row',
                tableNumber: '$tableNumber'
              },
              status: { $first: '$status' },
              employee: { $first: '$employee' }
            }
          },
          {
            $group: {
              _id: {
                zoneId: '$_id.zoneId',
                zoneName: '$_id.zoneName',
                row: '$_id.row'
              },
              tables: {
                $push: {
                  tableNumber: '$_id.tableNumber',
                  status: '$status',
                  employee: {
                    employeeId: '$employee._id',
                    firstname: '$employee.firstname',
                    lastname: '$employee.lastname',
                    department: '$employee.department',
                    position: '$employee.position',
                    phone: '$employee.phone'
                  }
                }
              }
            }
          },
          {
            $group: {
              _id: {
                zoneId: '$_id.zoneId',
                zoneName: '$_id.zoneName'
              },
              rows: {
                $push: {
                  name: '$_id.row',
                  tables: '$tables'
                }
              }
            }
          },
          {
            $project: {
              _id: 0,
              id: '$_id.zoneId',
              name: '$_id.zoneName',
              rows: 1
            }
          }
        ];

        // รัน 2 pipeline
        const zones = await seatSchema.aggregate(zoneListPipeline);
        const data = await seatSchema.aggregate(zoneDetailsPipeline);

        return res.json({
          floor,
          zones,
          data
        });

    } else if (floor && zone && !row && !tableNumber) {
      
      // ส่วนที่ 1: ข้อมูล row สำหรับ select dropdown
      const rowListPipeline = [
        ...pipeline,
        {
          $match: {
            'floor.name': floor,
            'zone.name': zone
          }
        },
        {
          $group: {
            _id: '$row'
          }
        },
        {
          $project: {
            _id: 0,
            name: '$_id'
          }
        }
      ];

      // ส่วนที่ 2: รายละเอียด row และโต๊ะ
      const rowDetailsPipeline = [
        ...pipeline,
        {
          $match: {
            'floor.name': floor,
            'zone.name': zone
          }
        },
        {
          $group: {
            _id: {
              row: '$row',
              tableNumber: '$tableNumber'
            },
            status: { $first: '$status' },
            employee: { $first: '$employee' }
          }
        },
        {
          $group: {
            _id: '$_id.row',
            tables: {
              $push: {
                tableNumber: '$_id.tableNumber',
                status: '$status',
                employee: {
                  employeeId: '$employee._id',
                  firstname: '$employee.firstname',
                  lastname: '$employee.lastname',
                  department: '$employee.department',
                  position: '$employee.position',
                  phone: '$employee.phone'
                }
              }
            }
          }
        },
        {
          $project: {
            _id: 0,
            name: '$_id',
            tables: 1
          }
        }
      ];

      const rows = await seatSchema.aggregate(rowListPipeline);
      const data = await seatSchema.aggregate(rowDetailsPipeline);

      return res.json({
        zone,
        rows: rows.map(r => r.name),
        data
      });
    }
    // } else if (floor && zone && row && !tableNumber) {
    //   // floor + zone + row: group tables
    //   pipeline.push({
    //     $group: {
    //       _id: { zoneId: '$zone._id', row: '$row' },
    //       row: { $first: '$row' },
    //       tables: { $addToSet: '$tableNumber' }
    //     }
    //   }, {
    //     $project: { _id: 0, row: 1, tables: 1 }
    //   });
    // } else if (floor && zone && row && tableNumber) {
    //   // floor + zone + row + tableNumber: output employee info
    //   pipeline.push({
    //     $project: {
    //       _id: 0,
    //       tableNumber: 1,
    //       status: 1,
    //       employee: {
    //         employeeId: '$employee._id',
    //         firstname: '$employee.firstname',
    //         lastname: '$employee.lastname',
    //         department: '$employee.department',
    //         position: '$employee.position',
    //         phone: '$employee.phone',
    //         // attendance: '$attendance'
    //       }
    //     }
    //   });
    // }

    const result = await seatSchema.aggregate(pipeline);

    return res.json(result);

  } catch (error) {
    return res.status(500).json({ message: 'Error fetching data', error });
  }
};


module.exports = {
    seatings,
    filterseatings
};