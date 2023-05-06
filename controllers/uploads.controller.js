const {response, request} = require("express");
const path = require("path");
const loadFile = async (req = request, res = response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).json({
        msg: `No hay archivos que subir.`,
        error: error,
      });

      return;
    }

    if (!req.files.fileU) {
      res.status(400).json({
        msg: `No hay archivos que subir.`,
        error: error,
      });

      return;
    }

    const {fileU} = req.files;

    const alias = fileU.name.split(".");
    const fileExt = alias[alias.length - 1];

    const validExt = ["png", "jpg", "jpeg", "gif"];
    if (!validExt.includes(fileExt)) {
      return res.status(400).json({
        msg: `La extension: ${fileExt} no es permitida.
        Por favor utilice archivos de formato: ${validExt}`,
        error: error,
      });
    }

    // const uploadPath = path.join(__dirname, "../uploads/", fileU.name);

    // fileU.mv(uploadPath, function (err) {
    //   if (err) {
    //     return res.status(500).json({
    //       msg: `Ha ocurrido un error al subir el archivo, contacte con el administrador.`,
    //       error: error,
    //     });
    //   }

    //   res.status(200).json({
    //     msg: "Archivo subido a: " + uploadPath,
    //   });
    // });
  } catch (error) {}
};

module.exports = {
  loadFile,
};
