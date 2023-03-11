const {Router} = require("express");
const {check} = require("express-validator");

const {
  fieldsValidate,
  isRoleValid,
  jwtValidate,
  isAdminRole,
} = require("../middlewares");

const {isCategoryIdValid} = require("../helpers/db.validators");

const {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
} = require("../controllers/categories.controller");

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
router.put(
  "/:id",
  [
    jwtValidate,
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("id", "No es un ID de Mongo valido").isMongoId(),
    check("id").custom(isCategoryIdValid),
    isRoleValid("ADMIN_ROLE", "SALES_ROLE"),
    fieldsValidate,
  ],
  editCategory
);

// delete category - private with token and Admin role
router.delete(
  "/:id",
  [
    jwtValidate,
    isAdminRole,
    check("id", "No es un ID de Mongo valido").isMongoId(),
    check("id").custom(isCategoryIdValid),
    fieldsValidate,
  ],
  deleteCategory
);

module.exports = router;
