const jwt = require("jsonwebtoken");

const {UserModel} = require("../models/index.models");

const jwtGenerate = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = {uid};

    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

const jwtCheck = async (token = "") => {
  try {
    if (token.length < 10) {
      return null;
    }

    const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await UserModel.findById(uid);
    if (user) {
      if (user.status) {
        return user;
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

module.exports = {
  jwtGenerate,
  jwtCheck,
};
