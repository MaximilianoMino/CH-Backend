const express = require("express");

const app = express();
const PORT = 8080;

const ProductsContainer = require("./services/products.services");
const productsContainer = new ProductsContainer("src/products.txt");

app.get("/products", async (req, res, next) => {
  const products = await productsContainer.getAll();
  console.log(products);

   try {
     res.status(200).json({products});
   } catch (error) {
     res.status(500).json({error});
   }
});

app.get('/randomProduct', async (req, res, next) => {
    const getRandom = Math.round(Math.random() * 3) 
    const productRetrieved = await productsContainer.getById(getRandom)
    try {
        res.status(200).json({productRetrieved})
    } catch (error) {
        res.status(500).json({error});
    }
})
app.listen(PORT, () => {
  console.log(`Listening in port ${PORT}`);
});
