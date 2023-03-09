const {Router} = require("express");
const {check} = require("express-validator");

const {fieldsValidate} = require("../middlewares/fields.validate");

const {authLogin, googleSignIn} = require("../controllers/auth.controller");

const router = Router();

router.post(
  "/login",
  [
    check("email", "El correo electrónico es obligatorio.").isEmail(),
    check("password", "La contraseña es obligatoria.").not().isEmpty(),

    fieldsValidate,
  ],
  authLogin
);

router.post(
  "/google",
  [
    check("id_token", "token de google es necesario.").not().isEmpty(),
    fieldsValidate,
  ],
  googleSignIn
);

module.exports = router;
