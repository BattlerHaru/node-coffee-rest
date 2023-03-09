const {Router} = require("express");
const {check} = require("express-validator");

const {fieldsValidate, isRoleValid, jwtValidate} = require("../middlewares");

const {
  isEmailExists,
  isRoleExists,
  isUserIdValid,
} = require("../helpers/db.validators");
const minPass = 3;

const {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  usersPatch,
} = require("../controllers/users.controller");

const router = Router();

// Get All Users
router.get("/", getUsers);

// Create User
router.post(
  "/",
  [
    check("name", "El nombre es obligatorio.").not().isEmpty(),
    check("email", "El correo electrónico no es válido.").isEmail(),
    check("email").custom(isEmailExists),
    check(
      "password",
      `La contraseña es obligatoria y más de ${minPass} caracteres.`
    ).isLength({min: minPass}),
    check("role").custom(isRoleExists),

    fieldsValidate,
  ],
  createUser
);

// Edit User
router.put(
  "/:id",
  [
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(isUserIdValid),
    check("role").custom(isRoleExists),
    fieldsValidate,
  ],
  editUser
);

// Delete User
router.delete(
  "/:id",
  [
    jwtValidate,
    isRoleValid("ADMIN_ROLE", "SALES_ROLE"),
    check("id", "No es un ID válido.").isMongoId(),
    check("id").custom(isUserIdValid),
    fieldsValidate,
  ],
  deleteUser
);

// Example for patch
router.patch("/", usersPatch);

module.exports = router;
