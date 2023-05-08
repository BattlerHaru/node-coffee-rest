const mongoose = require("mongoose");
// La advertencia indica que la opción strictQuery en Mongoose se cambiará a false de forma predeterminada en la versión 7 de Mongoose
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {});

    console.log("database online.");
  } catch (error) {
    console.log(error);
    throw new Error("Error to start database.");
  }
};

module.exports = {
  dbConnection,
};
