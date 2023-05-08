const {response, request} = require("express");

const fileUpdateValidate = (req = request, res = response, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({
      msg: `No hay archivos que subir 1.`,
    });
  }

  next();
};

module.exports = {
  fileUpdateValidate,
};
