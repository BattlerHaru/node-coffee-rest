const {response, request} = require("express");
const {ObjectId} = require("mongoose").Types;

const {
  CategoryModel,
  ProductModel,
  UserModel,
} = require("../models/index.models");

const allowedCollections = ["categories", "products", "roles", "users"];

const userSearch = async (res = response, term = "", limit, start) => {
  const isMongoID = ObjectId.isValid(term);
  try {
    if (isMongoID) {
      const user = await UserModel.findById(term);
      return res.status(200).json({
        msg: `Usuario: ${term}.`,
        results: user ? [user] : [],
      });
    }

    const regex = new RegExp(term, "i");

    const [total, users] = await Promise.all([
      UserModel.countDocuments({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}],
      }),
      UserModel.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}],
      })
        .skip(Number(start))
        .limit(Number(limit)),
    ]);

    return res.status(200).json({
      msg: `Total de usuarios encontrados ${total}, para: ${term}.`,
      results: users ? [users] : [],
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error en la búsqueda del usuario: ${term}`,
      error: error,
    });
  }
};

const productSearch = async (res = response, term = "", limit, start) => {
  const isMongoID = ObjectId.isValid(term);
  try {
    if (isMongoID) {
      const product = await ProductModel.findById(term).populate(
        "category",
        "name"
      );
      return res.status(200).json({
        msg: `Producto: ${term}.`,
        results: product ? [product] : [],
      });
    }

    const regex = new RegExp(term, "i");

    const [total, products] = await Promise.all([
      ProductModel.countDocuments({
        name: regex,
        $and: [{status: true}],
      }),
      ProductModel.find({
        name: regex,
        $and: [{status: true}],
      })
        .skip(Number(start))
        .limit(Number(limit))
        .populate("category", "name"),
    ]);

    return res.status(200).json({
      msg: `Total de productos encontrados ${total}, para: ${term}.`,
      results: products ? [products] : [],
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error en la búsqueda del producto: ${term}`,
      error: error,
    });
  }
};

const categorySearch = async (res = response, term = "", limit, start) => {
  try {
    const isMongoID = ObjectId.isValid(term);

    if (isMongoID) {
      const category = await CategoryModel.findById(term);
      return res.status(200).json({
        msg: `Categoría: ${term}.`,
        results: category ? [category] : [],
      });
    }

    const regex = new RegExp(term, "i");

    const [total, categories] = await Promise.all([
      CategoryModel.countDocuments({
        name: regex,
        $and: [{status: true}],
      }),
      CategoryModel.find({
        name: regex,
        status: true,
      })
        .skip(Number(start))
        .limit(Number(limit)),
    ]);

    return res.status(200).json({
      msg: `Total de categorías encontradas ${total}, para: ${term}.`,
      results: categories ? [categories] : [],
    });
  } catch (error) {
    return res.status(500).json({
      msg: `Error en la búsqueda de la categoría: ${term}`,
      error: error,
    });
  }
};

const search = async (req = request, res = response) => {
  const {collection, term} = req.params;
  const {limit = 10, start = 0} = req.query;

  if (!allowedCollections.includes(collection)) {
    return res.status(500).json({
      msg: "Colección invalida, verifique la colección a buscar.",
    });
  }

  switch (collection) {
    case "categories":
      categorySearch(res, term, limit, start);
      break;
    case "products":
      productSearch(res, term, limit, start);
      break;
    case "users":
      userSearch(res, term, limit, start);
      break;
    default:
      return res.status(200).json({
        msg: `Búsqueda por defecto vacía.`,
      });
  }
};

module.exports = {
  search,
};
