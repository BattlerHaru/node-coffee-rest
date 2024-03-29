const dbValidators = require("./db.validators");
const googleVerify = require("./google.verify");
const jwtGenerate = require("./jwt.generate");
const uploadFile = require("./upload.file");

module.exports = {
  ...dbValidators,
  ...googleVerify,
  ...jwtGenerate,
  ...uploadFile,
};
