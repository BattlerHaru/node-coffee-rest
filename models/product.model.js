const {Schema, model} = require("mongoose");

const productSchema = Schema({
  name: {
    type: String,
    required: [true, "El nombre del producto es obligatorio."],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    // "categorie" is for "categories" but for mongo adds "s" to last letter
    ref: "categorie",
    required: true,
  },
});

productSchema.methods.toJSON = function () {
  const {__v, status, ...data} = this.toObject();
  return data;
};

module.exports = model("product", productSchema);
