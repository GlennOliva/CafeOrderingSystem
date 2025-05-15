/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const CartContent = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const user_id = localStorage.getItem('user_id') || '';
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCartItems = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/cart/${user_id}`);
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  useEffect(() => {
    if (user_id) fetchCartItems();
  }, [user_id]);

  const updateQuantity = async (id: number, newQty: number) => {
    if (newQty < 1) return;

    try {
      await fetch(`${apiUrl}/api/cart/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qty: newQty }),
      });
      fetchCartItems();
    } catch (err) {
      console.error('Error updating cart:', err);
    }
  };

  const deleteCartItem = async (id: number) => {
    try {
      await fetch(`${apiUrl}/api/cart/${id}`, {
        method: 'DELETE',
      });
      fetchCartItems();
    } catch (err) {
      console.error('Error deleting cart item:', err);
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Your Cart</h2>
      <hr />

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left Side - Cart Items */}
        <div style={{ flex: '1 1 60%', maxWidth: '65%' }}>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  margin: '20px 0',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '20px',
                  alignItems: 'center'
                }}
              >
                {/* Product Image */}
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    marginRight: '20px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={`${apiUrl}/uploads/${item.product_image}`}
                    alt={item.product_name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Product Info */}
                <div style={{ flexGrow: 1 }}>
                  <div style={{ fontWeight: 'bold' }}>{item.product_name}</div>
                  <div style={{ color: '#666', marginBottom: '10px' }}>₱ {item.product_price}</div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span>QUANTITY:</span>
                    <button onClick={() => updateQuantity(item.id, item.qty + 1)} style={qtyBtnStyle}>+</button>
                    <input type="text" value={item.qty} readOnly style={qtyInputStyle} />
                    <button onClick={() => updateQuantity(item.id, item.qty - 1)} style={qtyBtnStyle}>−</button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => deleteCartItem(item.id)}
                  style={{
                    marginLeft: '20px',
                    backgroundColor: '#f44336',
                    color: '#fff',
                    border: 'none',
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  Remove
                </button>
              </div>
            ))
          )}

          {/* Special Instructions */}
          <div>
            <textarea
              placeholder="Special Instructions: (e.g. no mayo)"
              style={{
                width: '100%',
                height: '100px',
                padding: '10px',
                marginTop: '20px',
                border: '1px solid #aaa'
              }}
            ></textarea>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div
          style={{
            width: '300px',
            border: '1px solid #ccc',
            padding: '20px',
            alignSelf: 'flex-start',
            marginTop: '20px'
          }}
        >
          <h3>Order Summary</h3>

          {cartItems.map((item, index) => (
            <div key={index} style={summaryRowStyle}>
              <span>{item.product_name} x {item.qty}</span>
              <span>₱ {item.product_price * item.qty}</span>
            </div>
          ))}

          <div style={{ ...summaryRowStyle, marginTop: '10px' }}>
            <span>Total Qty</span>
            <span>{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
          </div>
          <hr />
          <div style={{ ...summaryRowStyle, fontWeight: 'bold' }}>
            <span>Total</span>
            <span>
              ₱ {cartItems.reduce((sum, item) => sum + item.product_price * item.qty, 0)}
            </span>
          </div>

         <button
  style={{
    width: '100%',
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }}
  onClick={() => navigate('/checkout', { state: { cartItems } })}
>
  PROCEED TO CHECKOUT
</button>

        </div>
      </div>
    </div>
  );
};

// Styles
const qtyBtnStyle: React.CSSProperties = {
  width: '30px',
  height: '30px',
  border: '1px solid #ccc',
  backgroundColor: '#eee',
  cursor: 'pointer'
};

const qtyInputStyle: React.CSSProperties = {
  width: '40px',
  textAlign: 'center',
  margin: '0 10px',
  border: '1px solid #ccc',
  height: '30px'
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0'
};

export default CartContent;
