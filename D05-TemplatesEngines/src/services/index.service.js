const fs = require("fs");

module.exports = class {
  constructor(fileName) {
    this.products = [];
    this.fileName = fileName;
    this.id = 0;
  }

  async saveProducts(product) {
    const { title, thumbnail, price } = product;

    try {
      this.products = await JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8", (error, data) => {
          if (error) {
            throw new Error(error);
          }
          return data;
        })
      );
      let response;
      if (!title || !price || !thumbnail) {
        response = {
          status: 400,
          error: true,
          msg: "All fields are required",
        };
      } else if (title === "" || thumbnail === "" || price === null) {
        response = {
          error: true,
          status: 400,
          msg: `All fields are required`,
        };
      } else {
        product.id = Date.now();
        this.products = [...this.products, product];
        const productSaved = await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.products, null, 4),
          (error) => {
            if (error) {
              throw new Error(error);
            }
          }
        );

        response = {
          status: 200,
          error: false,
          msg: "Product saved",
          product,
        };
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllProducts() {
    try {
      this.products = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8", (error, data) => {
          if (error) {
            throw new Error(error);
          }
          return data;
        })
      );
      let response;
      if (this.products.length < 1) {
        response = {
          status: 400,
          error: true,
          msg: "There are no products.",
        };
      } else {
        response = {
          status: 200,
          error: false,
          msg: "Ok",
          products: this.products,
        };
      }

      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
