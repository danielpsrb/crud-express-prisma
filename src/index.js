const express = require('express')
const dotenv = require("dotenv")
const app = express()
const prisma = require("./config/prisma")



dotenv.config();

const PORT = process.env.PORT || 3535

app.get("/api", (req, res) => {
    res.send("Welcome to this simple API")
})

app.get("/product", async(req, res) => {
    const searchProduct = await prisma.product.findMany();
    res.send(searchProduct);
})

app.listen(PORT, () => {
    console.log("server listening on port " + PORT)
})