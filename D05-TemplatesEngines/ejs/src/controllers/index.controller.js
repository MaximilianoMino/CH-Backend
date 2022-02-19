const ProductsService = require("../services/index.service");

const productsService = new ProductsService("src/db/products.txt");

exports.getAllProducts = async (req, res, next) => {
  try {
    const productsRetrieved = await productsService.getAllProducts();

    const { status, error, msg, products } = productsRetrieved;
    console.log(error);
    res.render("pages/index", {
      products,
      error,
      msg,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: `Error: ${error}`,
    });
  }
};

exports.saveProducts = async (req, res, next) => {
  try {
    const productRetrieved = await productsService.saveProducts(req.body);

    res.redirect("http://localhost:8080/");
    return productRetrieved;
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};
