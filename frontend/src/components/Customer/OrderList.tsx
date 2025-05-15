/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const OrderList = () => {
  const userId = localStorage.getItem('user_id'); // ✅ Get from localStorage
  const [orders, setOrders] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userId) return console.warn('User ID not found in localStorage');
      try {
        const response = await axios.get(`${apiUrl}/api/order/user_order/${userId}`);
        console.log("Fetched orders from backend:", response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [apiUrl, userId]);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div style={containerStyle}>
      <h2>Order List</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>ID</th>
                  <th style={thStyle}>Customer Name</th>
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Product Price</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Payment Method</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Order date</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.length === 0 ? (
              <tr>
                <td colSpan={8} style={tdStyle}>No orders found.</td>
              </tr>
            ) : (
              currentOrders.map(order => (
                <tr key={order.id}>
                  <td style={tdStyle}>{order.id}</td>
                     <td style={tdStyle}>{order.user_name}</td>
                  <td style={tdStyle}>{order.product_name}</td>
                  <td style={tdStyle}>{order.product_price}</td>
                  <td style={tdStyle}>{order.quantity}</td>
                  <td style={tdStyle}>{order.user_address}</td>
                  <td style={tdStyle}>{order.payment_method}</td>
                  <td style={{ ...tdStyle, color: order.status === 'Delivered' ? 'green' : 'orange' }}>
                    {order.status}
                  </td>
                  <td style={tdStyle}>
                    {new Date(order.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={paginationStyle}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            style={{
              margin: '0 5px',
              padding: '5px 10px',
              backgroundColor: currentPage === index + 1 ? '#333' : '#eee',
              color: currentPage === index + 1 ? '#fff' : '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Styles (same as before)
const containerStyle: React.CSSProperties = {
  padding: '20px',
  fontFamily: 'Arial',
  maxWidth: '100%',
};

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
  minWidth: '600px'
};

const thStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '10px',
  background: '#f5f5f5',
  textAlign: 'left'
};

const tdStyle: React.CSSProperties = {
  border: '1px solid #ddd',
  padding: '10px'
};

const paginationStyle: React.CSSProperties = {
  marginTop: '20px',
  textAlign: 'center'
};

export default OrderList;
