import mongoose from "mongoose";
import colors from 'colors';
import dotenv from "dotenv";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import products from "./data/products.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createedUsers = await User.insertMany(users);
    const adminUser = createedUsers[0]._id;
    const sampleProjects = products.map((products) => {
      return { ...products, user: adminUser};
    });

    await Product.insertMany(sampleProjects);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch(error){
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}