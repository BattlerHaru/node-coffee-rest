const { Router } = require("express");
const { check } = require("express-validator");

const { userValidate } = require("../middlewares/user.validate");
const {
    isRoleValid,
    isEmailValid,
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
        check("email").custom(isEmailValid),
        check(
            "password",
            `La contraseña es obligatoria y más de ${minPass} caracteres.`
        ).isLength({ min: minPass }),
        check("role").custom(isRoleValid),

        userValidate,
    ],
    usersPost
);
router.put(
    "/:id", [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(isUserIdValid),
        check("role").custom(isRoleValid),
        userValidate,
    ],
    usersPut
);
router.delete(
    "/:id", [
        check("id", "No es un ID válido").isMongoId(),
        check("id").custom(isUserIdValid),
        userValidate,
    ],
    usersDelete
);
router.patch("/", usersPatch);

module.exports = router;