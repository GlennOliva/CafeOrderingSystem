const db = require('../config/db');

// ➕ INSERT
exports.insertCart = (data, callback) => {
  const sql = `
    INSERT INTO tbl_cart (user_id, product_id, qty)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [data.user_id, data.product_id, data.qty], callback);
};

// 📥 SELECT by user_id
exports.getCartByUser = (user_id, callback) => {
  const sql = `
    SELECT c.*, p.product_name, p.product_price, p.product_image
    FROM tbl_cart c
    JOIN tbl_product p ON c.product_id = p.id
    WHERE c.user_id = ?
  `;
  db.query(sql, [user_id], callback);
};

// ✏️ UPDATE qty
exports.updateCart = (id, qty, callback) => {
  const sql = 'UPDATE tbl_cart SET qty = ? WHERE id = ?';
  db.query(sql, [qty, id], callback);
};

// ❌ DELETE
exports.deleteCart = (id, callback) => {
  const sql = 'DELETE FROM tbl_cart WHERE id = ?';
  db.query(sql, [id], callback);
};


exports.deleteCartByUser = (userId, callback) => {
  console.log('Deleting cart for user_id:', userId);  // Debug log
  const sql = 'DELETE FROM tbl_cart WHERE user_id = ?';
  db.query(sql, [userId], callback);
};
