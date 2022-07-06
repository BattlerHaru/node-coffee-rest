const { Router } = require("express");
const { check } = require("express-validator");

const { fieldsValidate, jwtValidate, isRoleValid } = require("../middlewares");

const {
    isRoleExists,
    isEmailExists,
    isUserIdValid,
} = require("../helpers/db.validators");
const minPass = 3;

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
} = require("../controllers/users.controller");

const router = Router();

router.get("/", usersGet);
router.post(
    "/", [
        check("name", "El nombre es obligatorio.").not().isEmpty(),
        check("email", "El correo electrónico no es válido.").isEmail(),
        check("email").custom(isEmailExists),
        check(
            "password",
            `La contraseña es obligatoria y más de ${minPass} caracteres.`
        ).isLength({ min: minPass }),
        check("role").custom(isRoleExists),

        fieldsValidate,
    ],
    usersPost
);
router.put(
    "/:id", [
        check("id", "No es un ID válido.").isMongoId(),
        check("id").custom(isUserIdValid),
        check("role").custom(isRoleExists),
        fieldsValidate,
    ],
    usersPut
);
router.delete(
    "/:id", [
        jwtValidate,
        isRoleValid("ADMIN_ROLE", "SALES_ROLE"),
        check("id", "No es un ID válido.").isMongoId(),
        check("id").custom(isUserIdValid),
        fieldsValidate,
    ],
    usersDelete
);
router.patch("/", usersPatch);

module.exports = router;