const zoneSchema = require('../models/zone.model');
const employeeSchema = require('../models/employee.model');

exports.getselectzone = async (req, res) => {
    try {
        const allZones = await zoneSchema.find({});

        const { floor } = req.query;

        const sortByZoneName = (a, b) => {
            if (a.name < b.name) return -1; // อยู่ด้านหน้า
            if (a.name > b.name) return 1;  // อยู่ด้านหลัง
            return 0; 
        }

        if (!floor || floor === 'all') {
            return res.status(200).json({
                success: true,
                data: allZones.sort(sortByZoneName).map(z => ({ name: z.name, code: z.floor_id[0] })),
            });
        } else {
            const filteredZones = allZones.filter(z => z.floor_id[0] === floor);

            return res.status(200).json({
                success: true,
                data: filteredZones.sort(sortByZoneName).map(z => ({ name: z.name , code: z.floor_id[0]  }))
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error fetching zones", error });
    }
}

exports.getonlineEmployees = async (req, res) => {
    try {
        const { zoneName } = req.params;
        
        // from ZoneA to Zone A
        const formattedZone = zoneName.replace(/([a-z])([A-Z])/g, '$1 $2');
        
        // find zone._id use zonedata._id
        const zonedata = await zoneSchema.findOne({ name: formattedZone });

        const emponline = [
            // Zone A
            { emp_id: 'EMP1', firstname: 'John', lastname: 'Doe', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP2', firstname: 'Jane', lastname: 'Smith', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP3', firstname: 'Alan', lastname: 'Wong', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP4', firstname: 'Linda', lastname: 'Nguyen', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP5', firstname: 'Tom', lastname: 'Lee', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP6', firstname: 'Sara', lastname: 'Kim', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP7', firstname: 'Mike', lastname: 'Choi', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP8', firstname: 'Emma', lastname: 'Chan', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP9', firstname: 'Kevin', lastname: 'Tran', zone_id: 'cnx-stp-3-A' },
            { emp_id: 'EMP10', firstname: 'Olivia', lastname: 'Zhang', zone_id: 'cnx-stp-3-A' },

            // Zone B
            { emp_id: 'EMP11', firstname: 'Alice', lastname: 'Johnson', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP12', firstname: 'Bob', lastname: 'Brown', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP13', firstname: 'David', lastname: 'Clark', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP14', firstname: 'Sophie', lastname: 'Hall', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP15', firstname: 'Chris', lastname: 'Young', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP16', firstname: 'Nancy', lastname: 'King', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP17', firstname: 'Ethan', lastname: 'Scott', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP18', firstname: 'Rachel', lastname: 'Green', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP19', firstname: 'Jason', lastname: 'Adams', zone_id: 'cnx-stp-3-B' },
            { emp_id: 'EMP20', firstname: 'Chloe', lastname: 'Hill', zone_id: 'cnx-stp-3-B' },

            // Zone C
            { emp_id: 'EMP21', firstname: 'Liam', lastname: 'Nelson', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP22', firstname: 'Mia', lastname: 'Moore', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP23', firstname: 'Noah', lastname: 'Bell', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP24', firstname: 'Zoe', lastname: 'Ward', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP25', firstname: 'Leo', lastname: 'Perry', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP26', firstname: 'Isla', lastname: 'Bennett', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP27', firstname: 'Jack', lastname: 'Turner', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP28', firstname: 'Lily', lastname: 'Cox', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP29', firstname: 'Owen', lastname: 'Morgan', zone_id: 'cnx-stp-3-C' },
            { emp_id: 'EMP30', firstname: 'Ella', lastname: 'Reed', zone_id: 'cnx-stp-3-C' },

            // Zone D
            { emp_id: 'EMP31', firstname: 'Max', lastname: 'Bailey', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP32', firstname: 'Ava', lastname: 'Long', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP33', firstname: 'Henry', lastname: 'Cole', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP34', firstname: 'Ella', lastname: 'Fox', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP35', firstname: 'Nathan', lastname: 'West', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP36', firstname: 'Luna', lastname: 'Gray', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP37', firstname: 'Aaron', lastname: 'Shaw', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP38', firstname: 'Samantha', lastname: 'Stone', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP39', firstname: 'Lucas', lastname: 'Knight', zone_id: 'cnx-stp-3-D' },
            { emp_id: 'EMP40', firstname: 'Amelia', lastname: 'Dean', zone_id: 'cnx-stp-3-D' },

            // Zone E
            { emp_id: 'EMP41', firstname: 'Charlie', lastname: 'Davis', zone_id: 'cnx-stp-3-E' },
            { emp_id: 'EMP42', firstname: 'Eve', lastname: 'Wilson', zone_id: 'cnx-stp-3-E' },
            { emp_id: 'EMP43', firstname: 'Frank', lastname: 'Garcia', zone_id: 'cnx-stp-3-E' },
            { emp_id: 'EMP44', firstname: 'Grace', lastname: 'Martinez', zone_id: 'cnx-stp-3-E' },
            { emp_id: 'EMP45', firstname: 'Hank', lastname: 'Lopez', zone_id: 'cnx-stp-3-E' },

            // Zone F
            { emp_id: 'EMP46', firstname: 'Ivy', lastname: 'Gonzalez', zone_id: 'cnx-stp-4-F' },
            { emp_id: 'EMP47', firstname: 'Oscar', lastname: 'Rivera', zone_id: 'cnx-stp-4-F' },
            { emp_id: 'EMP48', firstname: 'Ruby', lastname: 'Torres', zone_id: 'cnx-stp-4-F' },
            { emp_id: 'EMP49', firstname: 'Victor', lastname: 'Ramirez', zone_id: 'cnx-stp-4-F' },
            { emp_id: 'EMP50', firstname: 'Yara', lastname: 'Flores', zone_id: 'cnx-stp-4-F' }
        ];

        const emponlineFiltered = emponline.filter(emp => emp.zone_id === zonedata._id);

        return res.status(200).json({
            success: true,
            data: emponlineFiltered.map(emp => ({
                emp_id: emp.emp_id,
                name: emp.firstname + ' ' + emp.lastname,
            }))
        });
    } catch {
        return res.status(500).json({ message: "Error fetching online employees", error });
    }
}