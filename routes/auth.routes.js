const { Router } = require("express");
const { check } = require("express-validator");

const { authLogin } = require("../controllers/auth.controller");
const { fieldsValidate } = require("../middlewares/fields.validate");

const router = Router();

router.post(
    "/login", [
        check("email", "El correo electrónico es obligatorio.").isEmail(),
        check("password", "La contraseña es obligatoria.").not().isEmpty(),

        fieldsValidate,
    ],
    authLogin
);

module.exports = router;