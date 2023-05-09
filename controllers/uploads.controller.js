const {response, request} = require("express");
const path = require("path");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

const {uploadFile} = require("../helpers");

const {ProductModel, UserModel} = require("../models/index.models");

const loadFile = async (req = request, res = response) => {
  try {
    if (!req.files.fileU) {
      return res.status(400).json({
        msg: `No hay archivos que subir 2.`,
      });
    }

    const path = await uploadFile(req.files, undefined, "imgs");

    res.json({
      name: path,
    });
  } catch (error) {
    return res.status(400).json({
      msg: `Ha ocurrido un error al subir el archivo, inténtelo mas tarde o contacte con el administrador`,
      error: error,
    });
  }
};

const updateImage = async (req = request, res = response) => {
  const {id, collection} = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}.`,
        });
      }
      break;

    case "products":
      model = await ProductModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}.`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `Colección: ${collection}, no definida`,
      });
  }

  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);

    if (fs.existsSync(pathImage)) {
      fs.unlinkSync(pathImage);
    }
  }

  const fileName = await uploadFile(req.files, undefined, collection);
  model.img = fileName;

  await model.save();

  return res.status(200).json({
    msg: `${id} actualizado`,
    model,
  });
};

const showImages = async (req = request, res = response) => {
  const {id, collection} = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}.`,
        });
      }
      break;

    case "products":
      model = await ProductModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}.`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `Colección: ${collection}, no definida`,
      });
  }

  if (model.img) {
    const pathImage = path.join(__dirname, "../uploads", collection, model.img);

    if (fs.existsSync(pathImage)) {
      return res.sendFile(pathImage);
    }
  }

  const pathNoImageFound = path.join(__dirname, "../assets/no-image.jpg");

  return res.sendFile(pathNoImageFound);
};

const updateImageCloudinary = async (req = request, res = response) => {
  const {id, collection} = req.params;

  let model;

  switch (collection) {
    case "users":
      model = await UserModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un usuario con el id: ${id}.`,
        });
      }
      break;

    case "products":
      model = await ProductModel.findById(id);
      if (!model) {
        return res.status(400).json({
          msg: `No existe un producto con el id: ${id}.`,
        });
      }
      break;

    default:
      return res.status(500).json({
        msg: `Colección: ${collection}, no definida`,
      });
  }

  if (model.img) {
    const nameArr = model.img.split("/");
    const imageModel = nameArr[nameArr.length - 1];
    const [public_id] = imageModel.split(".");

    cloudinary.uploader.destroy(public_id);
  }

  const {tempFilePath} = req.files.fileU;

  const {secure_url} = await cloudinary.uploader.upload(tempFilePath);

  model.img = secure_url;
  await model.save();

  return res.status(200).json({
    msg: `${id} actualizado`,
    img: `${secure_url}`,
  });
};

module.exports = {
  loadFile,
  updateImage,
  showImages,
  updateImageCloudinary,
};
