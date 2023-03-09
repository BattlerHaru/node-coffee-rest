const {response, request} = require("express");

const {hashPass} = require("../helpers/db.validators");

const UserModel = require("../models/user.model");

const getUsers = async (req = request, res = response) => {
  const query = {status: true};

  const {limit = 5, start = 0} = req.query;

  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).skip(Number(start)).limit(Number(limit)),
  ]);

  res.status(200).json({
    msg: "Lista de usuarios.",
    total: `Total de usuarios: ${total}.`,
    users,
  });
};

const createUser = async (req = request, res = response) => {
  const {email, name, password, role, status} = req.body;

  const user = new UserModel({name, email, password, role, status});

  user.email = email.toLowerCase();
  user.password = hashPass(password);

  await user.save();

  res.status(201).json({
    msg: `Usuario: ${name}, registrado con éxito.`,
    user,
  });
};

const editUser = async (req = request, res = response) => {
  const {id} = req.params;
  const {_id, password, google, email, ...userData} = req.body;

  if (password) {
    userData.password = hashPass(password);
  }

  const user = await UserModel.findByIdAndUpdate(id, userData);

  res.status(200).json({
    msg: "Usuario actualizado con éxito.",
    user,
  });
};

const deleteUser = async (req = request, res = response) => {
  const {id} = req.params;

  // Delete is not recommend
  // const user = await UserModel.findByIdAndDelete(id);

  // Update status
  const user = await UserModel.findByIdAndUpdate(id, {status: false});

  res.status(200).json({
    msg: `Usuario: ${user.name}, dado de baja con éxito.`,
  });
};

const usersPatch = (req = request, res = response) => {
  res.json({
    msg: "example patch API - users controller patch.",
  });
};

module.exports = {
  createUser,
  deleteUser,
  editUser,
  getUsers,
  usersPatch,
};
