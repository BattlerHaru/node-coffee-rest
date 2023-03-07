const {Schema, model} = require("mongoose");

const categorySchema = Schema({
  name: {
    type: String,
    required: [true, "La categoría es obligatoria."],
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

module.exports = model("categorie", categorySchema);
