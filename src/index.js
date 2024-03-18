const express = require('express')
const dotenv = require("dotenv")
const app = express()
const prisma = require("./config/prisma")

dotenv.config();

const PORT = process.env.PORT || 3535

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Welcome to this simple API")
})

app.get("/product", async(req, res) => {
    const searchProduct = await prisma.product.findMany();
    res.send(searchProduct);
});

app.post("/product", async(req, res) => {
    const newProductData = req.body
    const newProduct = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            images: newProductData.images
        }
    })
    if(newProduct) res.status(201).send("Product created successfully cuyy...")
    else res.status(500).send("Product creation failed")
})

app.delete("/product/:id", async(req, res) => {
    const productId = req.params.id
    const deleteProduct = await prisma.product.delete({
        where: {
            id: productId
        }
    })
    if(deleteProduct) res.status(200).send("Product deleted successfully...")
    else res.status(500).send("Product deletion failed")
})

app.listen(PORT, () => {
    console.log("server listening on port " + PORT)
})