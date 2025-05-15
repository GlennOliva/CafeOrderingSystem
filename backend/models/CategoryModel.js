const db = require('../config/db'); // Ensure this connects MySQL using mysql2

// 🔹 Get all categories for an admin
// If admin filtering isn't needed:
exports.getCategories = (_, callback) => {
  const sql = 'SELECT * FROM tbl_category';
  db.query(sql, callback);
};


// 🔹 Get a single category by ID
exports.getCategoryById = (categoryId, callback) => {
  const sql = 'SELECT * FROM tbl_category WHERE id = ?';
  db.query(sql, [categoryId], callback);
};

// ➕ Add a new category
exports.addCategory = (data, callback) => {
  const sql = `
    INSERT INTO tbl_category (
      admin_id, category_name
    ) VALUES (?, ?)
  `;
  const values = [
    data.admin_id,
    data.category_name
  ];
  db.query(sql, values, callback);
};

// ✏️ Update category by ID
exports.updateCategory = (id, data, callback) => {
  const sql = `
    UPDATE tbl_category
    SET admin_id = ?, category_name = ?
    WHERE id = ?
  `;
  const values = [
    data.admin_id,
    data.category_name,
    id
  ];
  db.query(sql, values, callback);
};

// ❌ Delete category by ID
exports.deleteCategory = (id, callback) => {
  const sql = 'DELETE FROM tbl_category WHERE id = ?';
  db.query(sql, [id], callback);
};
