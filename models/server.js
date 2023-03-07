const express = require("express");
const cors = require("cors");

const {dbConnection} = require("../database/config");

class Server {
  constructor() {
    // express
    this.app = express();
    this.port = process.env.PORT;

    // Paths
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      users: "/api/users",
    };

    // DB Connect
    this.connectDB();

    // Middleware
    this.middleware();

    // Rutas
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middleware() {
    // CORS
    this.app.use(cors());

    // read and parse body
    this.app.use(express.json());

    // public directory (example)
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categories, require("../routes/categories.routes"));
    this.app.use(this.paths.users, require("../routes/users.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`listening at http://localhost:${this.port}.`);
    });
  }
}

module.exports = Server;
