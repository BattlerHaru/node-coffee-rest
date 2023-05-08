const {v4: uuidv4} = require("uuid");
const path = require("path");

const validImageExts = ["png", "jpg", "jpeg", "gif"];

const uploadFile = (files, validExt = validImageExts, folder = "") => {
  return new Promise((resolve, reject) => {
    const {fileU} = files;
    const alias = fileU.name.split(".");
    const fileExt = alias[alias.length - 1];

    if (!validExt.includes(fileExt)) {
      return reject(`La extension: ${fileExt} no es permitida.
        Por favor utilice archivos de formato: ${validExt}`);
    }

    const tempName = `${uuidv4()}.${fileExt}`;

    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    fileU.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(tempName);
    });
  });
};

module.exports = {
  uploadFile,
};
