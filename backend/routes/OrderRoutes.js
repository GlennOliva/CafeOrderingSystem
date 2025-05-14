const express = require('express');
const router = express.Router();
const controller = require('../controllers/OrderController.js');
// 🟢 Register with image upload
router.post('/add_order', controller.addOrder);

router.get('/', controller.getOrders);


    router.get('/:id', controller.getOrderById); // 👈 this line

// 🟢 Update user
router.put('/:id', controller.updateOrder);

    router.delete('/:id', controller.deleteOrder)

module.exports = router;
