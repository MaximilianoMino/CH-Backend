const express = require("express");
const productsRouter = require("./src/routes/index.route");
const cors = require("cors");
const pug = require("pug");
const { PORT } = require("./src/config/globals");

const app = express();

//HANDLEBARS
app.set("view engine", "pug");
app.set("views", "./src/views");
app.use(express.static("src/public"));

//SETTINGS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api/products", productsRouter);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
