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

  async getProductById(id) {
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

      let response;
      if (!productById) {
        response = {
          status: 400,
          error: true,
          msg: `Product with ${id} doesn't exist.`,
        };
      } else {
        response = {
          status: 200,
          error: false,
          msg: "OK",
          productById,
        };
      }
      return response;
    } catch (error) {
      throw new Error(error);
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

  async deleteAll() {
    try {
      this.products = [];
      console.log("Products deleted");
      const fileUpdated = await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.products, null, "\t"),
        (error) => {
          if (error) {
            throw new Error(error);
          }
        }
      );
      return fileUpdated;
    } catch (error) {
      console.error(error);
    }
  }

  async updateProduct(id, productToUpdate) {
    const { title, price, thumbnail } = productToUpdate;
    try {
      //DEVUELVE LOS PRODUCTOS
      this.products = await JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8", (error, data) => {
          if (error) {
            throw new Error(error);
          }
          return data;
        })
      );

      //ENCONTRANDO EL PRODUCTO POR ID
      let productById = await this.products.find((product) => {
        return product.id === id;
      });
      let response;

      if (productById == undefined) {
        response = {
          error: true,
          status: 400,
          msg: `Product with id ${id} does not exist.`,
        };
      } else if (!title || !price || !thumbnail) {
        response = {
          error: true,
          status: 400,
          msg: `All fields are required`,
        };
      } else if (title === "" || price === null || thumbnail === "") {
        response = {
          error: true,
          status: 400,
          msg: `All fields are required`,
        };
      } else {
        response = {
          error: false,
          status: 200,
          msg: `Product with id ${id} has been updated.`,
          productById,
        };
        this.products.map((product) => {
          if (product.id === id) {
            product.title = title;
            product.price = price;
            product.thumbnail = thumbnail;
          }
          return product;
        });

        //SOBREESCRIBIENDO EL ARCHIVO ACTUALIZADO

        const fileUpdated = await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(this.products, null, 4),
          (error) => {
            if (error) {
              throw new Error(error);
            }
          }
        );
        fileUpdated;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      //DEVUELVE LOS PRODUCTOS
      this.products = await JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8", (error, data) => {
          if (error) {
            throw new Error(error);
          }
          return data;
        })
      );

      //ENCONTRANDO EL PRODUCTO, PARA VALIDAR SU EXISTENCIA
      const findProductToDelete = await this.products.find((product) => {
        return product.id === id;
      });
      let response;
      if (!findProductToDelete) {
        response = {
          error: true,
          status: 400,
          msg: `Product with id ${id} doesn't exist`,
        };
      } else {
        response = {
          error: false,
          status: 200,
          msg: `Product with ${findProductToDelete.id} deleted`,
        };
        //FILTRANDO EL PRODUCTO A ELIMINAR
        const productToBeDeleted = this.products.filter((productToDelete) => {
          return productToDelete.id !== id;
        });
        //SOBREESCRIBIENDO ARCHVO CON EL PRODUCTO YA ELIMINADO
        const fileUpdated = await fs.promises.writeFile(
          this.fileName,
          JSON.stringify(productToBeDeleted, null, "\t"),
          (error) => {
            if (error) {
              throw new Error(error);
            }
          }
        );

        fileUpdated;
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  }
};
