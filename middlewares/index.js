const fieldsValidate = require("../middlewares/fields.validate");
const isRoleValid = require("../middlewares/roles.validate");
const jwtValidate = require("../middlewares/jwt.validate");

module.exports = {
  ...fieldsValidate,
  ...isRoleValid,
  ...jwtValidate,
};
