const bcryptjs = require("bcryptjs");

// const RoleModel = require("../models/role.model");
// const UserModel = require("../models/user.model");

const {RoleModel, UserModel, CategoryModel} = require("../models/index.models");

const isRoleExists = async (role = "") => {
  const roleExists = await RoleModel.findOne({role});
  if (!roleExists) {
    throw new Error(`El rol: ${role}, no está registrado en la base de datos.`);
  }
};

const isEmailExists = async (email = "") => {
  const userEmail = await UserModel.findOne({email});
  if (userEmail) {
    throw new Error(`El Correo electrónico: ${email}, ya está registrado.`);
  }
  console.log(email, userEmail);
};

const isUserIdValid = async (id = "") => {
  const userId = await UserModel.findById(id);
  if (!userId) {
    throw new Error(`El ID: ${id}, no existe.`);
  }
};

const hashPass = (password = "") => {
  const salt = bcryptjs.genSaltSync(); //10
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

const isCategoryIdValid = async (id = "") => {
  const categoryId = await CategoryModel.findById(id);
  if (!categoryId) {
    throw new Error(`El ID: ${id}, no existe.`);
  }
};

module.exports = {
  isRoleExists,
  isEmailExists,
  isUserIdValid,
  hashPass,
  isCategoryIdValid,
};
