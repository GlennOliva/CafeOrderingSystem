const express = require('express');
const router = express.Router();
const controller = require('../controllers/CartController');

router.post('/add_cart', controller.addToCart);         // ➕ Create
router.get('/:user_id', controller.getCartByUser);      // 📥 Read all by user_id
router.put('/:id', controller.updateCart);              // ✏️ Update qty
router.delete('/:id', controller.deleteCart);           // ❌ Delete
router.delete('/user/:userId', controller.deleteCartByUserId);
module.exports = router;
