const express = require("express");
const productsController = require("../controllers/index.controller");
const productRouter = express.Router();

productRouter.post("/", productsController.saveProducts);
productRouter.get("/", productsController.getAllProducts);

module.exports = productRouter;
