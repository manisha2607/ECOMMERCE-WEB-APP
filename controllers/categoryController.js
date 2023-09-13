const categoryModel = require('../models/categoryModel');
const slugify = require('slugify');

module.exports.createCategory = async (req, res) => {

    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Category name is required!"
            })
        }
        //  Checking  if category already exists
        const category = await categoryModel.findOne({ name });
        if (category) {
            return res.status(400).json({
                success: false,
                message: "Category is already exists!"
            })
        }
        // if category is not present then create category
        const newCategory = await categoryModel.create({
            name: name,
            slug: slugify(name)
        })
        // await newCategory.save();

        return res.status(200).json({
            success: true,
            message: " Category created Successfully!",
            newCategory
        })
    } catch (error) {
        let errMsg = error.errMsg
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.categoryUpdate = async (req, res) => {

    try {
        const { name } = req.body;
        const { id } = req.params;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required!"
            })
        }

        const category = await categoryModel.findByIdAndUpdate(id, {
            name: name,
            slug: slugify(name)
        }, { new: true })
        await category.save()
        return res.status(200).json({
            success: true,
            message: " Category updated successfully!",
            category
        })
    } catch (error) {
        let errMsg = error.errMsg
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.getCategory = async (req, res) => {
    try {
        const allCategory = await categoryModel.find({})
        return res.status(200).json({
            success: true,
            message: "All Categories-",
            allCategory
        })
    } catch (error) {
        let errMsg = error.errMsg
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.getSingleCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const singleCtegory = await categoryModel.findById(id);
        return res.status(200).json({
            success: true,
            message: "Single Category Get Successfully!",
            singleCtegory
        })
    } catch (error) {
        let errMsg = error.errMsg
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}

module.exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCategory = await categoryModel.findByIdAndDelete(id)
        return res.status(200).json({
            success: true,
            message: "Category Deleted Successfully!",
            deleteCategory
        })
    } catch (error) {
        let errMsg = error.errMsg
        if (process.env.environment === 'production') {
            errMsg = "Internal server Error!"
        }
        return res.status(500).json({
            success: false,
            message: errMsg
        })
    }
}
