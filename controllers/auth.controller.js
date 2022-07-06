const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const UserModel = require("../models/user.model");
const { jwtGenerate } = require("../helpers/jwt.generate");

const authLogin = async(req = request, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
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

        res.json({
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

module.exports = {
    authLogin,
};