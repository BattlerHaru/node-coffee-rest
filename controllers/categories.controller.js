const {response, request} = require("express");

const {CategoryModel} = require("../models/index.models");

const getAllCategories = async (req = request, res = response) => {
  const query = {status: true};

  const {limit = 10, start = 0} = req.query;

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
};

const getCategoryById = async (req = request, res = response) => {
  const {id} = req.params;

  const categoryData = await CategoryModel.findById(id).populate(
    "user",
    "name"
  );

  res.status(200).json({
    msg: "Categoría encontrada",
    categoryData,
  });
};

const createCategory = async (req = request, res = response) => {
  const newName = req.body.name.toUpperCase();

  const categoryDB = await CategoryModel.findOne({newName});

  if (categoryDB) {
    return res.status(404).json({
      msg: `La categoría: ${newName}, ya existe`,
    });
  }

  const data = {
    name: newName,
    user: req.user._id,
  };

  const category = new Category(data);

  await category.save();

  res.status(201).json({
    msg: "Categoría creada con éxito.",
    category,
  });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
};
