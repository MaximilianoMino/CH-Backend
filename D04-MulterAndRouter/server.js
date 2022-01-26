const express = require("express");
const productsRouter = require("./src/routes/index.route");
const app = express();
const cors = require("cors");
const { PORT } = require("./src/config/globals");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static("src/public"));
app.use("/api/products", productsRouter);
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
