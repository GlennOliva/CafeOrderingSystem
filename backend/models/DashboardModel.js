const db = require('../config/db'); // mysql2 or mysql2/promise

// Get total customers
exports.getTotalCustomer = (callback) => {
  const sql = `SELECT COUNT(*) AS no_customers FROM tbl_user`;
  db.query(sql, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

// Get total sales
exports.getTotalSales = (callback) => {
  const sql = `SELECT SUM(total_amount) AS total_sales FROM tbl_orders`;
  db.query(sql, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

// Get total categories
exports.getTotalCategory = (callback) => {
  const sql = `SELECT COUNT(*) AS no_category FROM tbl_category`;
  db.query(sql, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};

// Get total products
exports.getCountProduct = (callback) => {
  const sql = `SELECT COUNT(*) AS no_products FROM tbl_product`;
  db.query(sql, (error, results) => {
    if (error) return callback(error, null);
    callback(null, results);
  });
};
