const jwt = require("jsonwebtoken");
const {response, request} = require("express");

const UserModel = require("../models/user.model");

const jwtValidate = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No existe el token en la petición.",
    });
  }

  try {
    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await UserModel.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido.",
      });
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "Token no válido.",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: "Token no válido.",
    });
  }
};

module.exports = {
  jwtValidate,
};
