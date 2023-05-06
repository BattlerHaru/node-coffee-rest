const {Router} = require("express");
const {check} = require("express-validator");

const {fieldsValidate} = require("../middlewares/fields.validate");

const {loadFile} = require("../controllers/uploads.controller");

const router = Router();

router.post("/", loadFile);

module.exports = router;
