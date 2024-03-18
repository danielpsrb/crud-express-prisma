const express = require('express')
const dotenv = require("dotenv")
const app = express()
// const prisma = require("./config/prisma")

dotenv.config();

const PORT = process.env.PORT || 3535

const productController = require("./products/product.controller")
app.use("/products", productController)

app.use(express.json());

app.get("/api", (req, res) => {
    res.send("Welcome to this simple API cuyy...")
})

app.listen(PORT, () => {
    console.log("server listening on port " + PORT)
})
