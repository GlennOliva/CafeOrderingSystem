const Order = require('../models/OrderModel');

// 📥 Get all Orders
exports.getOrders = (req, res) => {
  Order.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });

    res.json(results);
  });
};

// 🔍 Get Order by ID
exports.getOrderById = (req, res) => {
  const orderId = req.params.id;

  Order.getById(orderId, (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(result[0]);
  });
};

// ➕ Add Order
exports.addOrder = async (req, res) => {
  try {
    const orders = req.body;

    if (!Array.isArray(orders) || orders.length === 0) {
      return res.status(400).json({ error: 'No orders provided' });
    }

    const orderPromises = orders.map(async (order) => {
      const { user_id, product_id, quantity, payment_method, total_amount, special_notes, status } = order;

      if (!user_id || !product_id || !quantity || !payment_method || !total_amount) {
        throw new Error('Required fields are missing');
      }

      const orderData = {
        user_id,
        product_id,
        quantity,
        payment_method,
        total_amount,
        special_notes,
        status: status || 'Pending',
      };

      // Call the model to insert the order
      await Order.create(orderData);
    });

    await Promise.all(orderPromises);

    res.status(201).json({ message: 'Orders successfully created' });
  } catch (error) {
    console.error('Internal Server Error:', error);
    res.status(500).json({ error: 'Server error occurred', details: error.message });
  }
};

// ✏️ Update Order
exports.updateOrder = (req, res) => {
  const id = req.params.id;
  const { user_id, product_id, quantity, payment_method, total_amount, special_notes, status } = req.body;

  if (!user_id || !product_id || !quantity || !payment_method || !total_amount || !special_notes || !status) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  Order.getById(id, (err, order) => {
    if (err) {
      console.error('Error fetching order:', err);
      return res.status(500).json({ error: 'Failed to fetch order' });
    }

    if (!order || order.length === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    const updatedData = {
      user_id,
      product_id,
      quantity,
      payment_method,
      total_amount,
      special_notes,
      status
    };

    Order.update(id, updatedData, (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Failed to update order' });
      }

      res.json({ message: 'Order updated successfully!' });
    });
  });
};

// ❌ Delete Order
exports.deleteOrder = (req, res) => {
  const id = req.params.id;

  Order.delete(id, (err, result) => {
    if (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete order' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully!' });
  });
};


exports.getOrdersByUserId = (req, res) => {
  const user_id = req.user.id;  // Assuming user ID is derived from the authentication middleware

  Order.getOrdersByUserId(user_id, (err, results) => {
    if (err) {
      console.error('Error fetching orders for user:', err);
      return res.status(500).json({ error: 'Failed to fetch orders for the user' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No orders found for this user' });
    }

    res.status(200).json(results);
  });
};
