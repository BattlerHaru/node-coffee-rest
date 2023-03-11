const {response, request} = require("express");

const {ProductModel} = require("../models/index.models");

const getAllProducts = async (req = request, res = response) => {
  const query = {status: true};

  const {limit = 10, start = 0} = req.query;

  try {
    const [total, products] = await Promise.all([
      ProductModel.countDocuments(query),
      ProductModel.find(query)
        .populate("user", "name")
        .populate("category", "name")
        .skip(Number(start))
        .limit(Number(limit)),
    ]);

    res.status(200).json({
      msg: "Lista de productos.",
      total: `Total de productos: ${total}.`,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const getProductById = async (req = request, res = response) => {
  const {id} = req.params;

  try {
    const productData = await ProductModel.findById(id)
      .populate("user", "name")
      .populate("category", "name");

    res.status(200).json({
      msg: "Producto encontrado",
      productData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const createProduct = async (req = request, res = response) => {
  const {
    name,
    status = true,
    price = 0,
    description = "",
    inStock = true,
    categoryId,
  } = req.body;
  console.log("paso 1");

  try {
    const productDB = await ProductModel.findOne({name});
    console.log("paso 2");

    if (productDB) {
      console.log("paso 00");

      return res.status(404).json({
        msg: `El producto: ${name}, ya existe`,
      });
    }

    const data = {
      name: name.toUpperCase(),
      status,
      price,
      description,
      inStock,
      user: req.user._id,
      category: categoryId,
    };
    console.log("paso 3");

    const product = new ProductModel(data);
    console.log("paso 4");

    await product.save();
    console.log("paso 5");

    return res.status(201).json({
      msg: "Producto creado con éxito.",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const editProduct = async (req = request, res = response) => {
  const {id} = req.params;
  const {status, user, ...data} = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.user._id;

  try {
    const product = await ProductModel.findByIdAndUpdate(id, data, {
      new: true,
    });

    return res.status(200).json({
      msg: "Producto actualizado con éxito.",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Ha ocurrido un error, hable con el administrador.",
      error: error,
    });
  }
};

const deleteProduct = async (req = request, res = response) => {
  const {id} = req.params;

  try {
    const product = await ProductModel.findByIdAndUpdate(
      id,
      {status: false},
      {new: true}
    );

    return res.status(200).json({
      msg: "Producto dado de baja con éxito.",
      product,
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
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
};
