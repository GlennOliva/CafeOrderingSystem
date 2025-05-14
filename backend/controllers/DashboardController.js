const Dashboard = require('../models/DashboardModel');

// 🔍 Get total number of users/customers
exports.getTotalCustomer = (req, res) => {
  Dashboard.getTotalCustomer((err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(result[0]);
  });
};

// 🔍 Get total sales
exports.getTotalSales = (req, res) => {
  Dashboard.getTotalSales((err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(result[0]);
  });
};

// 🔍 Get total number of categories
exports.getTotalCategory = (req, res) => {
  Dashboard.getTotalCategory((err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(result[0]);
  });
};

// 🔍 Get total number of products
exports.getCountProduct = (req, res) => {
  Dashboard.getCountProduct((err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json(result[0]);
  });
};
