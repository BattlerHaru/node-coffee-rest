const {response, request} = require("express");
const bcryptjs = require("bcryptjs");

const {jwtGenerate} = require("../helpers/jwt.generate");
const {googleVerify} = require("../helpers/google.verify");

const UserModel = require("../models/user.model");

const authLogin = async (req = request, res = response) => {
  const {email, password} = req.body;

  try {
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(400).json({
        msg: "El correo electrónico o la contraseña no son correctos.",
      });
    }

    if (!user.status) {
      return res.status(400).json({
        msg: "El correo electrónico o la contraseña no son correctos.",
      });
    }

    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        msg: "El correo electrónico o la contraseña no son correctos.",
      });
    }

    const token = await jwtGenerate(user.id);

    res.status(200).json({
      msg: "Inicio de sesión exitoso.",
      token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const {id_token} = req.body;

  try {
    const {email, name, picture} = await googleVerify(id_token);

    let user = await UserModel.findOne({email});

    if (!user) {
      const data = {
        email,
        google: true,
        img: picture,
        name,
        password: "",
      };
      user = new UserModel(data);
      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: "Usuario bloqueado, hable con el administrador",
        error,
      });
    }

    const token = await jwtGenerate(user.id);

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "El token no se pudo verificar.",
      error,
    });
  }
};

module.exports = {
  authLogin,
  googleSignIn,
};
