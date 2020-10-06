const mongoose = require("mongoose");
const dotenv = require("dotenv");
const products = require("./data/products");
const users = require("./data/users");
const colors = require("colors");
const User = require("./models/UserModel");
const Product = require("./models/ProductModel");
const Order = require("./models/OrderModel");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // Before seeding the db, we clear everything, just in case.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // will be an array
    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    // Dummy data will all be 'created' by the dummy admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log("Data Imported".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // Before seeding the db, we clear everything, just in case.
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Deleted".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

// for terminal commands "data:import / data:destroy" in package.json
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
