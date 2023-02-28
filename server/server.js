const express = require("express");
const { connection } = require("../config/db");
const { AdRouter } = require("../routes/ad.route");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
//Routes
app.use("/ad", AdRouter);

app.listen(process.env.PORT || 8080, async () => {
  try {
    await connection;
    console.log("Server has been started ay 8080 and is connected to Mongo");
  } catch (err) {
    console.log(err);
  }
});
