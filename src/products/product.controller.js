// layer ini digunakan untuk handle request dan response
// dan juga biasanya untuk handle body
const express = require("express");
const router = express.Router();
const prisma = require("../config/prisma")
const { getAllProducts, getProductsById, deleteProductById, createdProduct, updatedProductById } = require("./product.service")

router.get("/", async (req, res) => {
    try {
        const productId = req.params.id
        const products = await getAllProducts(productId);
        res.send(products);
    } catch (error) {
        res.status(404).send(err.messages)
    }
});

router.get("/:id", async(req, res) => {
    const productId = req.params.id

    const searchProduct = await getProductsById(productId);

    if(!searchProduct) res.status(400).send("Product not found")

    if(searchProduct) res.status(200).send(searchProduct)
})

router.post("/", async(req, res) => {
    try {
        const newProductData = req.body;
        const newProduct = await createdProduct(newProductData)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete("/:id", async(req, res) => {
    try {
        const productId = req.params.id
        await deleteProductById(productId);
        res.send("Product deleted successfully")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.put(":id", async (req, res) => {
    try {
        const productId = req.params.id
        const updatedProducts = await updatedProductById(productId)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.patch("/:id", async(req, res) => {
    const productId = req.params.id
    const productData = req.body
    
    const updateProduct = await prisma.product.update({
        where: {
            id: productId
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            images: productData.images
        }
    });
    if(updateProduct) res.status(200).send("Product updated successfully...")
    else res.status(500).send("Product update failed")
})

module.exports = router;