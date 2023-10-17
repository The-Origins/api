const mongoose = require("mongoose")

const connection = mongoose.createConnection(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  connection.once("open", () => {
    console.log("Database connected");
  });

module.exports = connection