const mongoose = require("mongoose");
const { sample_foods } = require("../data");
const FoodModel = require("../models/foodModel");
const connectDB = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URL);
    await seedFoods();
    console.log("MongoDB Connected!!");
  } catch (error) {
    console.log(error.message);
  }
};
module.exports = { connectDB };

async function seedFoods() {
  const foods = await FoodModel.countDocuments();
  if (foods > 0) {
    return;
  }
  for (const food of sample_foods) {
    food.imageUrl = `/foods/${food.imageUrl}`;
    await FoodModel.create(food);
  }
}
