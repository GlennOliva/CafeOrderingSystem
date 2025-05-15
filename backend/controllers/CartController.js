const Cart = require('../models/CartModel');

// ➕ CREATE
exports.addToCart = (req, res) => {
  const { user_id, product_id, qty } = req.body;
  if (!user_id || !product_id || !qty) {
    return res.status(400).json({ error: 'user_id, product_id, qty are required' });
  }

  const cartData = {
    user_id,
    product_id,
    qty,
    created_at: new Date()
  };

  Cart.insertCart(cartData, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Cart added', id: result.insertId });
  });
};

// 📥 READ by user
exports.getCartByUser = (req, res) => {
  const user_id = req.params.user_id;
  Cart.getCartByUser(user_id, (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.json(results);
  });
};

// ✏️ UPDATE qty
exports.updateCart = (req, res) => {
  const id = req.params.id;
  const { qty } = req.body;
  if (!qty) return res.status(400).json({ error: 'qty is required' });

  Cart.updateCart(id, qty, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart updated' });
  });
};

// ❌ DELETE
exports.deleteCart = (req, res) => {
  const id = req.params.id;
  Cart.deleteCart(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Cart item not found' });
    res.json({ message: 'Cart deleted' });
  });
};


exports.deleteCartByUserId = (req, res) => {
  const userId = req.params.userId;  // ✔️ Extracts user ID from the URL

  Cart.deleteCartByUser(userId, (err, result) => {  // ✔️ Calls the model function
    if (err) return res.status(500).json({ error: 'Database error' });  // ✔️ Handles DB error
    if (result.affectedRows === 0)  // ✔️ Checks if any row was actually deleted
      return res.status(404).json({ message: 'No cart items found for this user' });

    res.json({ success: true, message: 'Cart cleared successfully' });  // ✔️ Success response
  });
};
