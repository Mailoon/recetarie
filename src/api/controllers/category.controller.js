import {
    _getCategories,
    _getCategoryById,
    _createCategory,
    _updateCategory,
    _deleteCategory
} from '../../services/categoryServices.js';

// Get all categories
const getCategories = async (req, res) => {
    try {
        const categories = await _getCategories();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get category by ID
const getCategoryById = async (req, res) => {
    try {
        const category = await _getCategoryById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new category
const createCategory = async (req, res) => {
    try {
        const newCategory = await _createCategory(req.body);
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a category
const updateCategory = async (req, res) => {
    try {
        const updatedCategory = await _updateCategory(req.params.id, req.body);
        if (!updatedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await _deleteCategory(req.params.id);
        if (!deletedCategory) return res.status(404).json({ message: 'Category not found' });
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory };