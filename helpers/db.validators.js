const bcryptjs = require("bcryptjs");

const {
  CategoryModel,
  RoleModel,
  UserModel,
  ProductModel,
} = require("../models/index.models");

const isRoleExists = async (role = "") => {
  const roleExists = await RoleModel.findOne({role});
  if (!roleExists) {
    throw new Error(`El rol: ${role}, no está registrado en la base de datos.`);
  }
};

const isEmailExists = async (email = "") => {
  const emailExists = await UserModel.findOne({email});
  if (emailExists) {
    throw new Error(
      `El Correo electrónico: ${email}, ya se encuentra registrado.`
    );
  }
};

const isUserIdValid = async (id = "") => {
  const userId = await UserModel.findById(id);
  if (!userId) {
    throw new Error(`El ID: ${id} de ese usuario, no existe.`);
  }
};

const hashPass = (password = "") => {
  const salt = bcryptjs.genSaltSync(); //10 default
  const hash = bcryptjs.hashSync(password, salt);

  return hash;
};

const isCategoryIdValid = async (id = "") => {
  const categoryId = await CategoryModel.findById(id);
  if (!categoryId) {
    throw new Error(`El ID: ${id} de esa categoría, no existe.`);
  }
};

const isProductIdValid = async (id = "") => {
  const productId = await ProductModel.findById(id);
  if (!productId) {
    throw new Error(`El ID: ${id} de ese producto, no existe.`);
  }
};

module.exports = {
  hashPass,
  isCategoryIdValid,
  isEmailExists,
  isProductIdValid,
  isRoleExists,
  isUserIdValid,
};
