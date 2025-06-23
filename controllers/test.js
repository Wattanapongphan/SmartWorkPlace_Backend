const bcrypt = require('bcrypt');

async function test() {
  const password = '1234';
  const saltRounds = 10;

  // สร้าง hash ใหม่
  const hash = await bcrypt.hash(password, saltRounds);
  console.log('New hash:', hash);

  // เทียบ password กับ hash ใหม่
  const isMatch = await bcrypt.compare(password, hash);
  console.log('Compare with new hash:', isMatch);
}

test();