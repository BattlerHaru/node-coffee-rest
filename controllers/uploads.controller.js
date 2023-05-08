const {response, request} = require("express");
const {uploadFile} = require("../helpers");

const loadFile = async (req = request, res = response) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        msg: `No hay archivos que subir 1.`,
      });
    }
    if (!req.files.fileU) {
      return res.status(400).json({
        msg: `No hay archivos que subir 2.`,
      });
    }

    const path = await uploadFile(req.files, undefined, "imgs");

    res.json({
      name: path,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al subir el archivo, inténtelo mas tarde o contacte con el administrador`,
      error: error,
    });
  }
};

module.exports = {
  loadFile,
};
