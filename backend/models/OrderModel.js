const db = require('../config/db'); // MySQL connection via mysql2

// 🔹 Get all orders with user name and product name
exports.getAll = (callback) => {
  const sql = `
    SELECT 
      o.*, 
      u.full_name AS user_name, 
      u.address,
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
      u.address AS user_address,
      p.product_name, 
      p.product_price
    FROM 
      tbl_orders o
    LEFT JOIN 
      tbl_user u ON o.user_id = u.id
    LEFT JOIN 
      tbl_product p ON o.product_id = p.id
    WHERE 
      o.user_id = ?
  `;
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      callback(err);
    } else {
      callback(null, results);  // Make sure this is passing results properly
    }
  });
};




// 🔍 Get a single order by ID
exports.getById = (id, callback) => {
  const sql = 'SELECT * FROM tbl_orders WHERE id = ?';
  db.query(sql, [id], callback);
};

// ➕ Add a new order
exports.create = (data) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO tbl_orders 
      (user_id, product_id, quantity, payment_method, total_amount, special_notes, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      data.user_id,
      data.product_id,
      data.quantity,
      data.payment_method,
      data.total_amount,
      data.special_notes,
       'Pending',
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        return reject(err); // Reject if there's an error
      }
      resolve(result.insertId); // Resolve with the insert ID if successful
    });
  });
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
      special_notes = ? ,
      status = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.product_id,
    data.quantity,
    data.payment_method,
    data.total_amount,
    data.special_notes,
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
