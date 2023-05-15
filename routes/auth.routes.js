const {Router} = require("express");
const {check} = require("express-validator");

const {
  authLogin,
  googleSignIn,
  jwtRenew,
} = require("../controllers/auth.controller");

const {jwtValidate, fieldsValidate} = require("../middlewares");

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

router.get("/", jwtValidate, jwtRenew);

module.exports = router;
