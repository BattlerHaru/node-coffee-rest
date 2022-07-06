const fieldsValidate = require("../middlewares/fields.validate");
const jwtValidate = require("../middlewares/jwt.validate");
const isRoleValid = require("../middlewares/roles.validate");

module.exports = {
    ...fieldsValidate,
    ...jwtValidate,
    ...isRoleValid,
};