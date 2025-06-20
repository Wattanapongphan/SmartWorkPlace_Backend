const seatSchema = require('../models/seat.model');
const employeeSchema = require('../models/employee.model');
const zoneSchema = require('../models/zone.model');
const exceljs = require('exceljs');

exports.exportJson = async (req, res) => {
    try {
        const { zoneName } = req.params;

        // from ZoneA to Zone A
        const formattedZone = zoneName.replace(/([a-z])([A-Z])/g, '$1 $2');

        // find zone._id use zonedata._id
        const zonedata = await zoneSchema.findOne({ name: formattedZone });

        if (!zonedata) {
            return res.status(404).json({ message: "Zone not found" });
        }

        const sortBytablenumber = (a, b) => {
            const aNum = parseInt(a.tableNumber, 10);
            const bNum = parseInt(b.tableNumber, 10);
            if (aNum < bNum) return -1;
            if (aNum > bNum) return 1;
            return 0; 
        };

        // Fetch all seats in the specified zone
        const seats = await seatSchema.find({ zone_id: zonedata._id }).populate('employee_id');

        // Format the data for export
        const exportData = seats.map(seat => ({
            tableNumber: seat.tableNumber,
            emp_id : seat.employee_id._id,
            emp_name: seat.employee_id.firstname + ' ' + seat.employee_id.lastname,
            emp_department: seat.employee_id.department,
            emp_position: seat.employee_id.position,
        }));

        //sort by tableNumber
        exportData.sort(sortBytablenumber);

        //excel export
        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet(`ข้อมูล Zone ${formattedZone}`);

        worksheet.columns = [
            { header: 'Table Number', key: 'tableNumber', width: 15 },
            { header: 'Employee ID', key: 'emp_id', width: 20 },
            { header: 'Employee Name', key: 'emp_name', width: 30 },
            { header: 'Department', key: 'emp_department', width: 20 },
            { header: 'Position', key: 'emp_position', width: 20 }
        ];

        exportData.forEach(data => {
            worksheet.addRow({
                tableNumber: data.tableNumber,
                emp_id: data.emp_id,
                emp_name: data.emp_name,
                emp_department: data.emp_department,
                emp_position: data.emp_position
            });
        });

        // สร้างไฟล์ในหน่วยความจำ
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=employeebyzone.xlsx`);

        await workbook.xlsx.write(res);
        res.end();
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error exporting data", error });
    }
}