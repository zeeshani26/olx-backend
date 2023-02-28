const mongoose = require("mongoose");
const AdSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  image: String,
  location: String,
  postedAt: String,
  price: String,
});

const AdModel = mongoose.model("ad", AdSchema);

module.exports = { AdModel };
