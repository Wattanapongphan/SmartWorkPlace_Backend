const mongoose = require('mongoose');
const imageSchema = require('../models/image.model');
require('dotenv').config();

async function seedImg() {
  await mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

  const imageArray = [
    'https://changphapgroup.com/image_new_web/portrait/pic/TC_Mart/TC_800_1.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2EKlJkLInjknZZjQCjlHGEF5lhZT1qtE_w&s',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvxNWIYPDQgjEsP6-uKV6-nGLcVCH6skqFug&s',
    'https://ap-southeast-2-seek-apac.graphassets.com/AEzBCRO50TYyqbV6XzRDQz/MqazASlTAyuDhQEXQVfQ'
  ];

  const images = [];

  for (let i = 1; i <= 50; i++) {
    images.push({
      _id: `img-${i}`,
      url: imageArray[(i - 1) % imageArray.length],
      employee_id: `EMP${i}`
    });
  }

  await imageSchema.deleteMany({});
  await imageSchema.insertMany(images);
  console.log('Images seeded successfully');
  process.exit(0);
}

seedImg().catch(console.error);
