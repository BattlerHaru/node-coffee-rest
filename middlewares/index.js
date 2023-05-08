const fieldsValidate = require("../middlewares/fields.validate");
const isRoleValid = require("../middlewares/roles.validate");
const jwtValidate = require("../middlewares/jwt.validate");

const fileValidate = require("../middlewares/file.validate");

module.exports = {
  ...fieldsValidate,
  ...isRoleValid,
  ...jwtValidate,
  ...fileValidate,
};
