const Category = require('../models/CategoryModel');

// 📥 Get all categories
exports.getCategory = (req, res) => {
    Category.getCategories(req.params.admin_id, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.json(results);
    });
};

// 🔍 Get a specific category by ID
exports.getCategoryById = (req, res) => {
    const categoryId = req.params.id;

    Category.getCategoryById(categoryId, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }

        if (result.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json(result[0]);
    });
};

// ➕ Add a category
exports.addCategory = (req, res) => {
    try {
        const { admin_id, category_name } = req.body;

        if (!admin_id || !category_name) {
            return res.status(400).json({ error: 'Admin ID and category name are required' });
        }

        const categoryData = { admin_id, category_name };

        Category.addCategory(categoryData, (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).json({ error: 'Database error occurred', details: err });
            }

            res.status(201).json({
                message: 'Category successfully created',
                id: result.insertId
            });
        });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ error: 'Server error occurred', details: error });
    }
};

// ✏️ Update category
exports.updateCategory = (req, res) => {
    const id = req.params.id;
    const { admin_id, category_name } = req.body;

    const updatedData = { admin_id, category_name };

    Category.updateCategory(id, updatedData, (err, result) => {
        if (err) {
            console.error('Update error:', err);
            return res.status(500).json({ error: 'Failed to update category' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category updated successfully!' });
    });
};

// ❌ Delete category
exports.deleteCategory = (req, res) => {
    const id = req.params.id;

    Category.deleteCategory(id, (err, result) => {
        if (err) {
            console.error('Delete error:', err);
            return res.status(500).json({ error: 'Failed to delete category' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully!' });
    });
};
