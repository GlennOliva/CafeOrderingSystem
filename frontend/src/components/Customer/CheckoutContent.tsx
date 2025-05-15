/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CheckoutContent = () => {
  const [userData, setUserData] = useState<any>(null);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [cartItems, setCartItems] = useState<any[]>([]); // Add cartItems if necessary
  const apiUrl = import.meta.env.VITE_API_URL;
  const user_id = localStorage.getItem('user_id') || '';
  const navigate = useNavigate();
  
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });

  useEffect(() => {
    // Fetch cart items
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/cart/${user_id}`);
        setCartItems(response.data); // assuming response.data contains the cart items
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    if (user_id) {
      fetchCartItems();
    }
  }, [user_id, apiUrl]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/user/${user_id}`);
        const result = response.data;

        // Check if the result contains data (instead of success flag)
        if (result && result.id) {
          setUserData(result); // Assuming 'id' is a valid field indicating success
        } else {
          alert('Failed to fetch user data.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data.');
      }
    };

    if (user_id) {
      fetchUserData();
    }
  }, [apiUrl, user_id]);

  const handleSubmit = async () => {
  const orders = cartItems.map(item => ({
    user_id: user_id,
    product_id: item.product_id, // ✅ Use actual product_id, not cart item id
    quantity: item.qty,
    payment_method: selectedPayment,
    total_amount: item.product_price * item.qty,
    special_notes: specialNotes,
  }));

  try {
    const response = await axios.post(`${apiUrl}/api/order/add_order`, orders, {
      headers: { 'Content-Type': 'application/json' },
    });

    const result = response.data;
    if (result.message === 'Orders successfully created') {
      // Successfully placed the order, now clear the cart
      await clearCart();
      setSnackbar({
        open: true,
        message: 'Order placed successfully!',
        severity: 'success',
      });

      // Wait for 3 seconds before navigating
      setTimeout(() => {
        navigate('/orders');
      }, 3000); // 3 seconds delay
    } else {
      setSnackbar({
        open: true,
        message: 'Failed to place order: ' + result.message,
        severity: 'error',
      });
    }
  } catch (error) {
    console.error('Error:', error);
    setSnackbar({
      open: true,
      message: 'Error placing the order.',
      severity: 'error',
    });
  }
};


  // Function to clear the cart
  const clearCart = async () => {
    try {
      console.log('Sending request to clear cart for user_id:', user_id);  // Debug log
      const response = await axios.delete(`${apiUrl}/api/cart/user/${user_id}`);
      console.log('Clear Cart Response:', response.data);

      if (response.data.success) {
        setCartItems([]);  // Clear the cart in the frontend
      } else {
        setSnackbar({
          open: true,
          message: 'Failed to clear the cart: ' + response.data.message,
          severity: 'error',
        });
      }
    } catch (error) {
      console.error('Error clearing the cart:', error);
      setSnackbar({
        open: true,
        message: 'Error clearing the cart.',
        severity: 'error',
      });
    }
  };

  if (!userData) {
    return <div>Loading user data...</div>; // Show a loading message until data is fetched
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .checkout-container {
                flex-direction: column;
              }

              .left-column, .right-column {
                width: 100% !important;
              }

              .right-column {
                margin-top: 20px;
              }
            }
          `,
        }}
      />
      <div className="checkout-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Left Column */}
        <div className="left-column" style={{ width: '65%' }}>
          <h2>Checkout</h2>
          <hr style={{ marginBottom: '3%' }} />

          {/* PAYMENT */}
          <h4>PAYMENT</h4>
          <select
            value={selectedPayment}
            onChange={e => setSelectedPayment(e.target.value)}
            style={inputStyle}
          >
            <option value="" disabled>Select Payment Method</option>
            <option value="cod">Cash on Delivery</option>
            <option value="gcash">GCash</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank</option>
          </select>

          {/* CONTACT */}
          <h4>CONTACT / DELIVERY ADDRESS</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Full Name"
              value={`${userData.full_name}`}
              style={halfInputStyle}
              disabled
            />
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            value={userData.contact_number || ''}
            style={inputStyle}
            disabled
          />
          <input
            type="email"
            placeholder="Email"
            value={userData.email || ''}
            style={inputStyle}
            disabled
          />
          <input
            type="text"
            placeholder="Address"
            value={userData.address || ''}
            style={inputStyle}
            disabled
          />

          {/* SPECIAL NOTES */}
          <h4>SPECIAL NOTES</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Special Notes"
              value={specialNotes}
              onChange={e => setSpecialNotes(e.target.value)}
              style={halfInputStyle}
            />
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="right-column" style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h4>Order Summary</h4>
          <div style={{ marginBottom: '10px' }}>
            {cartItems.map(item => (
              <div key={item.id} style={rowStyle}>
                <span>{item.product_name} x{item.qty}</span>
                <span>PHP {item.product_price * item.qty}</span>
              </div>
            ))}
          </div>
          <hr />
          <div style={{ ...rowStyle, fontWeight: 'bold', marginTop: '10px' }}>
            <span>Total</span>
            <span>PHP {cartItems.reduce((total, item) => total + item.product_price * item.qty, 0)}</span>
          </div>
          <button style={buttonStyle} onClick={handleSubmit}>
            PAY NOW
          </button>
        </div>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
};

const halfInputStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: '#444',
  color: 'white',
  marginTop: '20px',
  border: 'none',
  cursor: 'pointer',
};

export default CheckoutContent;
