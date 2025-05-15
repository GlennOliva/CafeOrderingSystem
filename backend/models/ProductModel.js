const db = require('../config/db'); // MySQL connection via mysql2

// 🔹 Get all products with admin name (optional join with admin table)
exports.getAll = (callback) => {
  const sql = `
    SELECT 
      p.*, 
      c.category_name AS category_name
    FROM 
      tbl_product p
    LEFT JOIN 
      tbl_category c ON p.category_id = c.id
    WHERE 
      p.status = 'Available'
  `;
  db.query(sql, callback);
};

// 🔍 Get a single product by ID
exports.getById = (id, callback) => {
  const sql = 'SELECT * FROM tbl_product WHERE id = ?';
  db.query(sql, [id], callback);
};

// ➕ Add a new product
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO tbl_product 
      (admin_id, category_id, product_name, product_price, product_qty, product_image, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.admin_id,
    data.category_id || null,
    data.product_name,
    data.product_price,
    data.product_qty,
    data.product_image || null,
    data.status || 'Available'
  ];
  db.query(sql, values, callback);
};

// ✏️ Update product by ID
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE tbl_product
    SET 
      category_id = ?, 
      product_name = ?, 
      product_price = ?, 
      product_qty = ?, 
      product_image = ?, 
      status = ?
    WHERE id = ?
  `;
  const values = [
    data.category_id || null,
    data.product_name,
    data.product_price,
    data.product_qty,
    data.product_image || null,
    data.status,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return callback(err, null);
    }

    if (result.affectedRows === 0) {
      return callback(null, { message: 'Product not found' });
    }

    callback(null, result);
  });
};

// ❌ Delete product by ID
exports.delete = (id, callback) => {
  const sql = 'DELETE FROM tbl_product WHERE id = ?';
  db.query(sql, [id], callback);
};
