const { Admin } = require("../models");
require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("../config/config");

const seedAdmin = async () => {
  const password = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const admin1 = {
    email: process.env.ADMIN_EMAIL,
    password: password,
  };
  await Admin.create(admin1);
};

const runSeed = async () => {
  await seedAdmin();
  console.log("admin successfully seeded");
  process.exit(0);
};

runSeed();
