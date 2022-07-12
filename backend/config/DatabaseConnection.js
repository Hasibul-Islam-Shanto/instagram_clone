const mongoose = require("mongoose");

const DatabaseConncetion = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected Succesfully.");
  } catch (error) {
    console.log(`Database is not connected. : ${error}`);
  }
};

module.exports = DatabaseConncetion;
