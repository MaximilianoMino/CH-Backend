const express = require("express");
const productsController = require("../controllers/index.controller");
const productRouter = express.Router();

productRouter.post("/", productsController.saveProducts);
productRouter.get("/:id", productsController.getProductById);
productRouter.put("/:id", productsController.updateProduct);
productRouter.get("/", productsController.getAllProducts);
productRouter.delete("/:id", productsController.deleteById);

module.exports = productRouter;
