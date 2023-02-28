const express = require("express");
const AdRouter = express.Router();
const { AdModel } = require("../models/Ad.model");
const catOptions = ["clothing", "electronics", "furnitures", "others"];

AdRouter.get("/get", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 2;
    const search = req.query.search || "";
    let sort = req.query.sort || "postedAt";
    let cat = req.query.cat || "All";
    cat === "All" ? (cat = [...catOptions]) : (cat = req.query.cat.split(","));
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }
    const ads = await AdModel.find({
      name: { $regex: search, $options: "i" },
    })
      .where("category")
      .in([...cat])
      .sort(sortBy)
      .skip(page * limit)
      .limit(limit);

    const total = await AdModel.countDocuments({
      category: { $in: [...cat] },
      name: { $regex: search, $options: "i" },
    });
    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      cat: catOptions,
      ads,
    };
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

AdRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const newPost = new AdModel(payload);
    await newPost.save();
    res.send({ msg: "Posted Add Successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Somethig went wrong in posting add" });
  }
});

AdRouter.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await AdModel.findByIdAndDelete({ _id: id });
    res.send({ msg: "Advertisement Deleted successfully" });
  } catch (err) {
    console.log(err);
    res.send({ msg: "Failed to Delete Advertisement" });
  }
});

module.exports = { AdRouter };
