const prisma = require("../config/prisma")

const getAllProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
}

const getProductsById = async (id) => {
    // const productId = req.params.id

    const searchProduct = await prisma.product.findUnique({
        where: {
            id,
        },
    })

    if(!searchProduct) throw new Error("Product not found")

    return searchProduct;
}

const createdProduct = async (newProductData) => {
    const newProduct = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            images: newProductData.images
        }
    })
    
    return newProduct;
}

const deleteProductById = async (id) => {
    await getProductsById(id);
    await prisma.product.delete({
        where: {
            id
        }
    });
};

const updatedProductById = async (id) => {
    const productData = req.body

    if(
        !(
        productData.name &&
        productData.price &&
        productData.description &&
        productData.images
        )
    ) {
        return res.status(400).send("Some Fields are missing and required")
    }

    const updateProduct = await prisma.product.update({
        where: {
            id
        },
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            images: productData.images
        }
    });
    if(updateProduct) res.status(200).send("Product updated successfully...")
    else res.status(400).send("Product update failed")
}

module.exports = { getAllProducts, getProductsById, deleteProductById, createdProduct, updatedProductById }