const mongoose = require("mongoose");
const employeeModel = require("../model/employee");

async function seedEmployees() {
  // เชื่อมต่อฐานข้อมูล (ปรับ URL ให้ตรงกับของคุณ)
  await mongoose.connect("mongodb://localhost/Smart-workplace");

  try {
    // เช็คว่ามีพนักงานคนใดบ้าง (เช็ค employeeId ตัวอย่าง)
    const existingEmployee = await employeeModel.findOne({
      employeeId: "EMP001",
    });

    if (!existingEmployee) {
      const seedData = [
        {
          employeeId: "2025-05-29T11:55:42.099Z",
          firstname: "Carol Schaden-Little",
          lastname: "Hirthe",
          department: "Home",
          profilePicture: "https://picsum.photos/seed/s71xrNq/1631/1425?blur=2",
          id: "1",
        },
        {
          employeeId: "2025-05-29T20:51:48.833Z",
          firstname: "Bobbie Yost",
          lastname: "Barton",
          department: "Home",
          profilePicture:
            "https://picsum.photos/seed/PBs9y3/48/743?grayscale&blur=1",
          id: "2",
        },
        {
          employeeId: "2025-05-29T21:06:56.321Z",
          firstname: "Sonia Smitham",
          lastname: "Streich",
          department: "Shoes",
          profilePicture:
            "https://picsum.photos/seed/WRLrgGWQd0/2721/3020?grayscale&blur=10",
          id: "3",
        },
        {
          employeeId: "2025-05-29T10:35:12.248Z",
          firstname: "Kenny Ernser",
          lastname: "Reichert",
          department: "Automotive",
          profilePicture:
            "https://picsum.photos/seed/knecWjWO/610/2704?grayscale&blur=9",
          id: "4",
        },
        {
          employeeId: "2025-05-29T15:06:08.198Z",
          firstname: "Naomi Kuhic",
          lastname: "Welch",
          department: "Beauty",
          profilePicture:
            "https://picsum.photos/seed/PB7ITzsB0V/418/1986?blur=3",
          id: "5",
        },
        {
          employeeId: "2025-05-29T21:33:40.740Z",
          firstname: "Rosa Grimes",
          lastname: "Beahan",
          department: "Toys",
          profilePicture:
            "https://picsum.photos/seed/oygr5PX3/3271/2388?grayscale&blur=8",
          id: "6",
        },
        {
          employeeId: "2025-05-29T10:28:01.220Z",
          firstname: "Adam Skiles",
          lastname: "Berge",
          department: "Music",
          profilePicture:
            "https://picsum.photos/seed/nSffIklzYz/2509/1745?grayscale&blur=7",
          id: "7",
        },
        {
          employeeId: "2025-05-29T08:44:33.990Z",
          firstname: "Dr. Darryl Murazik",
          lastname: "Gorczany",
          department: "Toys",
          profilePicture:
            "https://picsum.photos/seed/CMs1mDLYUB/992/3947?grayscale&blur=8",
          id: "8",
        },
        {
          employeeId: "2025-05-30T03:21:52.322Z",
          firstname: "Tyrone Yost",
          lastname: "Heidenreich",
          department: "Tools",
          profilePicture:
            "https://picsum.photos/seed/SzHTncYOXj/3303/2034?grayscale&blur=3",
          id: "9",
        },
        {
          employeeId: "2025-05-29T18:33:56.149Z",
          firstname: "Scott Konopelski",
          lastname: "Cassin",
          department: "Baby",
          profilePicture:
            "https://picsum.photos/seed/EfGhqwn/3989/3411?grayscale&blur=1",
          id: "10",
        },
      ];

      // เพิ่มข้อมูล seed เข้า collection
      await employeeModel.insertMany(seedData);
      console.log("Employee seed data inserted successfully.");
    } else {
      console.log("Employee data already exists, skipping seed.");
    }
  } catch (err) {
    console.error("Error seeding employees:", err);
  } finally {
    // ปิดการเชื่อมต่อฐานข้อมูล
    await mongoose.disconnect();
  }
}

// รัน seed
seedEmployees()
  .then(() => {
    console.log("Seeding completed.");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
  });
