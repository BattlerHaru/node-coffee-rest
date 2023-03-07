const {Router} = require("express");
const {check} = require("express-validator");

const {fieldsValidate} = require("../middlewares/fields.validate");

const router = Router();

// get all categories - public
router.get("/", (req, res) => {
  res.json("get all categories");
});

// get category by id - public
router.get("/:id", (req, res) => {
  res.json("get category by id");
});

// create category - private with token
router.post("/", (req, res) => {
  res.json("post - category created");
});

// edit category - private with token
router.put("/:id", (req, res) => {
  res.json("put - category edited");
});

// delete category - private with token
router.delete("/:id", (req, res) => {
  res.json("delete - category off");
});

module.exports = router;
