const db = require('../config/db'); // MySQL connection via mysql2

// 🔹 Get all orders with user name and product name
exports.getAll = (callback) => {
  const sql = `
    SELECT 
      o.*, 
      u.full_name AS user_name, 
      p.product_name, 
      p.product_price
    FROM 
      tbl_orders o
    LEFT JOIN 
      tbl_user u ON o.user_id = u.id
    LEFT JOIN 
      tbl_product p ON o.product_id = p.id
  `;
  db.query(sql, callback);
};


// 🔹 Get all orders with user name and product name for a specific user
exports.getOrdersByUserId = (user_id, callback) => {
  const sql = `
    SELECT 
      o.*, 
      u.full_name AS user_name, 
      p.product_name, 
      p.product_price
    FROM 
      tbl_orders o
    LEFT JOIN 
      tbl_user u ON o.user_id = u.id
    LEFT JOIN 
      tbl_product p ON o.product_id = p.id
    WHERE 
      o.user_id = ?  -- Filter orders by user_id
  `;
  db.query(sql, [user_id], callback);  // Pass the user_id as a parameter to the query
};



// 🔍 Get a single order by ID
exports.getById = (id, callback) => {
  const sql = 'SELECT * FROM tbl_orders WHERE id = ?';
  db.query(sql, [id], callback);
};

// ➕ Add a new order
exports.create = (data, callback) => {
  const sql = `
    INSERT INTO tbl_orders 
      (user_id, product_id, quantity, payment_method, total_amount, status, created_at)
    VALUES (?, ?, ?, ?, ?, ?, NOW())
  `;
  const values = [
    data.user_id,
    data.product_id,
    data.quantity,
    data.payment_method,
    data.total_amount,
    data.status || 'Pending'
  ];
  db.query(sql, values, callback);
};

// ✏️ Update order by ID
exports.update = (id, data, callback) => {
  const sql = `
    UPDATE tbl_orders
    SET 
      user_id = ?, 
      product_id = ?, 
      quantity = ?, 
      payment_method = ?, 
      total_amount = ?, 
      status = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.product_id,
    data.quantity,
    data.payment_method,
    data.total_amount,
    data.status,
    id
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database query error:', err);
      return callback(err, null);
    }

    if (result.affectedRows === 0) {
      return callback(null, { message: 'Order not found' });
    }

    callback(null, result);
  });
};

// ❌ Delete order by ID
exports.delete = (id, callback) => {
  const sql = 'DELETE FROM tbl_orders WHERE id = ?';
  db.query(sql, [id], callback);
};
