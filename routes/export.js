const express = require('express');
const ExcelJS = require('exceljs');
const PDFDocument = require('pdfkit');
const buildingSchema = require('../models/building.model'); // <-- ใช้ Mongoose model จริง

const router = express.Router();

router.get('/excel', async (req, res) => {
  try {
    const buildings = await buildingSchema.find(); // ✅ ดึงข้อมูลจาก MongoDB

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Buildings');

    worksheet.columns = [
      { header: 'ID', key: '_id', width: 20 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Location', key: 'location', width: 20 },
    ];

    worksheet.addRows(buildings.map(item => item.toObject())); // ใส่ข้อมูลจาก DB

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=buildings.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating Excel file');
  }
});

router.get('/pdf', async (req, res) => {
  try {
    const buildings = await buildingSchema.find(); // ✅ ดึงข้อมูลจาก DB

    const doc = new PDFDocument();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=buildings.pdf');

    doc.pipe(res);

    doc.fontSize(20).text('Building Report', { align: 'center' });
    doc.moveDown();

   buildings.forEach((b, index) => {
  doc
    .fontSize(12)
    .fillColor('black')
    .text(`Building ${index + 1}`, { underline: true });

  doc
    .fontSize(11)
    .text(`• ID : ${b._id}`)
    .text(`• Name : ${b.name}`)
    .text(`• Location : ${b.location}`);

  doc.moveDown(1); // เว้นบรรทัด

  // เส้นคั่น (optional)
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .strokeColor('#cccccc')
    .lineWidth(0.5)
    .stroke();

  doc.moveDown(1); // เว้นบรรทัดอีกครั้ง
});

    doc.end();
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating PDF file');
  }
});


module.exports = router;
