const {response, request} = require("express");

const {CategoryModel} = require("../models/index.models");

const getAllCategories = async (req = request, res = response) => {
  const query = {status: true};

  const {limit = 10, start = 0} = req.query;

  try {
    const [total, categories] = await Promise.all([
      CategoryModel.countDocuments(query),
      CategoryModel.find(query)
        .populate("user", "name")
        .skip(Number(start))
        .limit(Number(limit)),
    ]);

    res.status(200).json({
      msg: "Lista de categorías.",
      total: `Total de categorías: ${total}.`,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const getCategoryById = async (req = request, res = response) => {
  const {id} = req.params;

  try {
    const categoryData = await CategoryModel.findById(id).populate(
      "user",
      "name"
    );

    res.status(200).json({
      msg: "Categoría encontrada",
      categoryData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const createCategory = async (req = request, res = response) => {
  const newCategory = req.body.name.toUpperCase();

  try {
    const categoryDB = await CategoryModel.findOne({name: newCategory});

    if (categoryDB) {
      return res.status(404).json({
        msg: `La categoría: ${newCategory}, ya existe`,
      });
    }

    const data = {
      name: newCategory,
      user: req.user._id,
    };

    const category = new CategoryModel(data);

    await category.save();

    return res.status(201).json({
      msg: "Categoría creada con éxito.",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const editCategory = async (req = request, res = response) => {
  const {id} = req.params;
  const {status, user, ...data} = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  try {
    const category = await CategoryModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json({
      msg: "Categoría actualizada con éxito.",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const deleteCategory = async (req = request, res = response) => {
  const {id} = req.params;

  try {
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      {status: false},
      {new: true}
    );

    return res.status(200).json({
      msg: "Categoría dada de baja con éxito.",
      category,
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
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  getCategoryById,
};
