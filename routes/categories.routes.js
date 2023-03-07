const {Router} = require("express");
const {check} = require("express-validator");

const {
  createCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/categories.controller");
const {isCategoryIdValid} = require("../helpers/db.validators");

const {fieldsValidate, jwtValidate, isRoleValid} = require("../middlewares");

const router = Router();

// get all categories - public
router.get("/", getAllCategories);

// get category by id - public
router.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo valido").isMongoId(),
    check("id").custom(isCategoryIdValid),
    fieldsValidate,
  ],
  getCategoryById
);

// create category - private with token
router.post(
  "/",
  [
    jwtValidate,
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    fieldsValidate,
  ],
  createCategory
);

// edit category - private with token
router.put("/:id", (req, res) => {
  res.json("put - category edited");
});

// delete category - private with token
router.delete("/:id", (req, res) => {
  res.json("delete - category off");
});

module.exports = router;
