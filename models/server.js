const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {createServer} = require("http");

const {dbConnection} = require("../database/config");
const {socketController} = require("../sockets/socket.controller");

class Server {
  constructor() {
    // express
    this.app = express();

    // Socket.io
    this.server = createServer(this.app);
    this.io = require("socket.io")(this.server);

    // Port
    this.port = process.env.PORT;

    // Paths
    this.paths = {
      auth: "/api/auth",
      categories: "/api/categories",
      products: "/api/products",
      users: "/api/users",
      search: "/api/search",
      uploads: "/api/uploads",
    };

    // DB Connect
    this.connectDB();

    // Middleware
    this.middleware();

    // Rutas
    this.routes();

    // Sockets
    this.sockets();
  }

  // DB Connection
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

    //Fileupload - Load files
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.auth, require("../routes/auth.routes"));
    this.app.use(this.paths.categories, require("../routes/categories.routes"));
    this.app.use(this.paths.users, require("../routes/users.routes"));
    this.app.use(this.paths.products, require("../routes/products.routes"));
    this.app.use(this.paths.search, require("../routes/search.routes"));
    this.app.use(this.paths.uploads, require("../routes/uploads.routes"));
  }

  sockets() {
    this.io.on("connection", socketController);
  }

  // Express
  // listen() {
  //   this.app.listen(this.port, () => {
  //     console.log(`listening at http://localhost:${this.port}`);
  //   });
  // }

  // Sockets
  listen() {
    this.server.listen(this.port, () => {
      console.log(`listening at http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
