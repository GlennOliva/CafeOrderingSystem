const Product = require('../models/ProductModel');

// 📥 Get all Products
exports.getProducts = (req, res) => {
  Product.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });

    console.log(results); // 👈 log the result
    res.json(results);
  });
};

// 🔍 Get Product by ID
exports.getProductById = (req, res) => {
  const productId = req.params.id;

  Product.getById(productId, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(result[0]);
  });
};

// ➕ Add Product
exports.addProduct = (req, res) => {
  try {
    const { admin_id, category_id, product_name, product_price, product_qty, status } = req.body;
    const product_image = req.file ? req.file.filename : null;

    if (!admin_id || !product_name || !product_price || !product_qty || !status) {
      return res.status(400).json({ error: 'Required fields are missing' });
    }

    const productData = {
      admin_id,
      category_id,
      product_name,
      product_price,
      product_qty,
      product_image,
      status
    };

    Product.create(productData, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: err });
      }
      res.status(201).json({
        message: 'Product successfully created',
        id: result.insertId
      });
    });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Server error occurred' });
  }
};

// ✏️ Update Product
exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { category_id, product_name, product_price, product_qty, status, existing_image } = req.body;

  if (!product_name || !product_price || !product_qty || !status) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  // Fetch the product by ID
  Product.getById(id, (err, product) => {
    if (err) {
      console.error('Error fetching product:', err);
      return res.status(500).json({ error: 'Failed to fetch product' });
    }

    if (!product || product.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let product_image = product[0].product_image;

    if (req.file) {
      product_image = req.file.filename;
    } else if (existing_image) {
      product_image = existing_image;
    }

    const updatedData = {
      category_id,
      product_name,
      product_price,
      product_qty,
      status,
      product_image
    };

    Product.update(id, updatedData, (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Failed to update product' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json({ message: 'Product updated successfully!' });
    });
  });
};

// ❌ Delete Product
exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.delete(id, (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully!' });
  });
};
