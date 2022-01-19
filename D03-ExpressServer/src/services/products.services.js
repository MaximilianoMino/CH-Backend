const fs = require("fs");
module.exports = class {
  constructor(fileName) {
    this.products = [];
    this.fileName = fileName;
    this.id = 0;
    console.log(this.fileName);
  }

  async getById(id) {
    try {
      //DEVUELVE LOS PRODUCTOS
      const productsRetrieved = await fs.promises.readFile(
        this.fileName,
        "utf-8",
        (error, data) => {
          if (error) {
            throw new Error(error);
          }
          return data;
        }
      );
      //ENCONTRANDO EL PRODUCTO POR ID
      const productById = await JSON.parse(productsRetrieved).find(
        (product) => {
          return product.id === id;
        }
      );
      if (!productById) {
        return `Product with id ${id} doesn't exist`;
      } else {
        return productById;
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAll() {
    const productsRetrieved = await fs.promises.readFile(
      this.fileName,
      "utf-8",
      (error, data) => {
        if (error) {
          throw new Error(error);
        }
        return data;
      }
    );
    try {
      if (productsRetrieved < 1) {
        console.info("Products not found");
      }

      return productsRetrieved
    } catch (error) {
      console.error(error);
    }
  }
};
