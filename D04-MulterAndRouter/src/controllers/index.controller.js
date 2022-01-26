const ProductsService = require("../services/index.service");

const productsService = new ProductsService("src/db/products.txt");

exports.getAllProducts = async (req, res, next) => {
  try {
    const productsRetrieved = await productsService.getAllProducts();

    const { status, error, msg, products } = productsRetrieved;

    res.status(status).json({
      error,
      msg,
      products,
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

    const { status, error, msg, product } = productRetrieved;
    res.status(status).json({
      error,
      msg,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: error,
    });
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const productRetrieved = await productsService.getProductById(Number(id));

    const { status, error, msg, productById } = productRetrieved;
    res.status(status).json({
      error,
      msg,
      productById,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: `Error: ${error}`,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const productToUpdate = await productsService.updateProduct(
    Number(id),
    req.body
  );
  console.log(productToUpdate);

  try {
    const { error, msg, productById, status } = productToUpdate;

    return res.status(status).json({
      error,
      msg,
      productById,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      msg: `Error: ${error}`,
    });
  }
};

exports.deleteById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const productToDelete = await productsService.deleteById(Number(id));
    const { error, status, msg } = productToDelete;

    return res.status(status).json({
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
