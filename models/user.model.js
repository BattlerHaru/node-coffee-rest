const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        required: [true, "El nombre es obligatorio."],
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria."],
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, "El rol es obligatorio."],
        default: "USER_ROLE",
        enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

userSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = model("user", userSchema);