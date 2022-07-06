const { response, request } = require("express");

const UserModel = require("../models/user.model");
const { hashPass } = require("../helpers/db.validators");

const usersGet = async(req = request, res = response) => {
    const query = { status: true };

    const { limit = 5, start = 0 } = req.query;

    const [total, users] = await Promise.all([
        UserModel.countDocuments(query),
        UserModel.find(query).skip(Number(start)).limit(Number(limit)),
    ]);

    res.json({
        msg: "Lista de usuarios.",
        total: `Total de usuarios: ${total}.`,
        users,
    });
};

const usersPost = async(req = request, res = response) => {
    const { name, email, password, role, status } = req.body;
    const user = new UserModel({ name, email, password, role, status });

    user.email = email.toLowerCase();
    user.password = hashPass(password);

    await user.save();

    res.json({
        msg: `Usuario: ${name}, registrado con éxito.`,
        user,
    });
};

const usersPut = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...userData } = req.body;

    if (password) {
        userData.password = hashPass(password);
    }

    const user = await UserModel.findByIdAndUpdate(id, userData);

    res.json({
        msg: "Usuario actualizado con éxito.",
        user,
    });
};

const usersDelete = async(req = request, res = response) => {
    const { id } = req.params;

    // Delete
    // const user = await UserModel.findByIdAndDelete(id);

    // Update status
    const user = await UserModel.findByIdAndUpdate(id, { status: false });

    res.json({
        msg: `Usuario: ${user.name}, dado de baja con éxito.`,
    });
};

const usersPatch = (req = request, res = response) => {
    res.json({
        msg: "example patch API - users controller patch.",
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
};