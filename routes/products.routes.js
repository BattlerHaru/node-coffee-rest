const {Router} = require("express");
const {check} = require("express-validator");

const {
  fieldsValidate,
  isRoleValid,
  jwtValidate,
  isAdminRole,
} = require("../middlewares");

const {
  isCategoryIdValid,
  isProductIdValid,
} = require("../helpers/db.validators");

const {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
} = require("../controllers/products.controller");

const router = Router();

// get all products - public
router.get("/", getAllProducts);

// get product by id - public
router.get(
  "/:id",
  [
    check("id", "No es un ID de Mongo valido").isMongoId(),
    check("id").custom(isProductIdValid),
    fieldsValidate,
  ],
  getProductById
);

// create product - private with token
router.post(
  "/",
  [
    jwtValidate,
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    fieldsValidate,
  ],
  createProduct
);

// edit product - private with token
router.put(
  "/:id",
  [
    jwtValidate,
    // console.log("paso token"),
    check("id", "No es un ID de Mongo valido").isMongoId(),
    // console.log("paso id product"),
    check("categoryId").custom(isCategoryIdValid),
    // console.log("paso id category"),
    check("id").custom(isProductIdValid),
    // console.log("paso isProduct"),
    isRoleValid("ADMIN_ROLE", "SALES_ROLE"),
    check("id").custom(isProductIdValid),

    // console.log("paso isRole"),
    fieldsValidate,
  ],
  editProduct
);

// delete product - private with token and Admin role
router.delete(
  "/:id",
  [
    jwtValidate,
    check("id", "No es un ID de Mongo valido").isMongoId(),
    check("id").custom(isProductIdValid),
    isAdminRole,
    fieldsValidate,
  ],
  deleteProduct
);

module.exports = router;
