const {Router} = require("express");
const {check} = require("express-validator");

const {fieldsValidate} = require("../middlewares/fields.validate");

const {
  loadFile,
  updateImage,
  showImages,
  updateImageCloudinary,
} = require("../controllers/uploads.controller");
const {isCollectionValid} = require("../helpers");
const {fileUpdateValidate} = require("../middlewares");

const router = Router();

router.post("/", fileUpdateValidate, loadFile);

router.put(
  "/:collection/:id",
  [
    fileUpdateValidate,
    check("collection").custom((c) =>
      isCollectionValid(c, ["users", "products"])
    ),
    check("id", "No es un ID de Mongo valido").isMongoId(),
    fieldsValidate,
  ],
  // updateImage
  updateImageCloudinary
);

router.get(
  "/:collection/:id",
  [
    check("collection").custom((c) =>
      isCollectionValid(c, ["users", "products"])
    ),
    check("id", "No es un ID de Mongo valido").isMongoId(),
    fieldsValidate,
  ],
  showImages
);

module.exports = router;
