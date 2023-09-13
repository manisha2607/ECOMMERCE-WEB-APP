const productModel = require('../models/productModel');
const slugify = require('slugify');
const fileSystem = require('fs');

module.exports.createProduct = async (req, res) => {
    try {
        const { name, slug, description, price, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        // validations 
        switch (true) {
            case !name:
                return res.status(400).json({
                    success: false,
                    message: "Name is required!"
                })
            case !description:
                return res.status(400).json({
                    success: false,
                    message: "Description is required!"
                })
            case !price:
                return res.status(400).json({
                    success: false,
                    message: "Price is required!"
                })
            case !category:
                return res.status(400).json({
                    success: false,
                    message: "Category is required!"
                })
            case !quantity:
                return res.status(400).json({
                    success: false,
                    message: "Quantity is required!"
                })
            case photo && photo.size < 10000:
                return res.status(400).json({
                    success: false,
                    message: "Photo is required and should be less than 1mb!"
                })
        }
        const product = new productModel({
            ...req.fields,
            slug: slugify(name)
        })
        // taking photo
        if (photo) {
            product.photo.data = fileSystem.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save();
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            product
        })
    } catch (error) {
        let errMsg = error.message
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.getProduct = async (req, res) => {
    try {
        const products = await productModel.find({}) //finding in database
            .populate("category") // passing category instead of category id
            .select("-photo") // exculding photo
            .limit(12) // setting limit of items can show at a time
            .sort({ createdAt: -1 }) // setting which items has to be seen first
        return res.status(200).json({
            success: true,
            message: "All Products List-",
            products,
            total: products.length
        })
    } catch (error) {
        let errMsg = error.message
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.getSingleProduct = async (req, res) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({
                success: false,
                message: "Invalid Identifiers!"
            })
        }
        const product = await productModel.findOne({ slug })
            .select("-photo")
            .populate("category")
        return res.status(200).json({
            success: true,
            message: "Search product is-",
            product
        })
    } catch (error) {
        let errMsg = error.message
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.getPhoto = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: true,
                message: "Invalid Identifiers!"
            })
        }
        const product = await productModel.findById(id)
            .select("photo")
        if (product.photo.data) {
            res.set("Content-type", product.photo.contentType)
            return res.status(200).send(product.photo.data)
        }
    } catch (error) {
        let errMsg = error.message
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid Indentifiers!"
            })
        }
        const product = await productModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully!"
        })
    } catch (error) {
        let errMsg = error.message
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.updateProduct = async (req, res) => {
    try {
        const { photo } = req.files
        const { name, description, price, category, quantity } = req.fields
        const { id } = req.params
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Invalid Identifiers"
            })
        }

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required!"
            })
        }
        if (!description) {
            return res.status(400).json({
                success: false,
                message: "Description is required!"
            })
        }
        if (!price) {
            return res.status(400).json({
                success: false,
                message: "Price is required!"
            })
        }
        if (!category) {
            return res.status(400).json({
                success: false,
                message: "Category is required!"
            })
        }
        if (!quantity) {
            return res.status(400).json({
                success: false,
                message: "Quantity is required!"
            })
        }
        if (photo && photo.size < 10000) {
            return res.status(400).json({
                success: false,
                message: "Photo is required length should be 1 mb!"
            })
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id,
            {
                ...req.fields,
                slug: slugify(name)
            },
            {
                new: true
            })
        if (photo) {
            updatedProduct.photo.data = fileSystem.readFileSync(photo.path)
            updatedProduct.photo.contentType = photo.type
        }
        await updatedProduct.save()
        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully",
            updatedProduct
        })

    } catch (error) {
        let errMsg = error.message
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}