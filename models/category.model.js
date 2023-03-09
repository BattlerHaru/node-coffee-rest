const {Schema, model} = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "La categoría es obligatoria."],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

categorySchema.methods.toJSON = function () {
  const {__v, status, ...data} = this.toObject();
  return data;
};

// "categorie" is for "categories" but for mongo adds "s" to last letter
module.exports = model("categorie", categorySchema);
