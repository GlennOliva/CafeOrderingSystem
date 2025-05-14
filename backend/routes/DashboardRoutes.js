const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

router.get('/total-customers', dashboardController.getTotalCustomer);
router.get('/total-sales', dashboardController.getTotalSales);
router.get('/total-categories', dashboardController.getTotalCategory);
router.get('/total-products', dashboardController.getCountProduct);



module.exports = router;
