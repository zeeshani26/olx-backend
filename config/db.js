const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connection = mongoose.connect(
  "mongodb+srv://zeeshani26:12345@cluster0.mfqk545.mongodb.net/?retryWrites=true&w=majority"
);

module.exports = { connection };
