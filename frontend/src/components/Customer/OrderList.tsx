import React, { useState } from 'react';

const OrderList = () => {
  const orders = [
    { id: 1, productName: 'Betta Fish', price: '₱150', quantity: 2, address: 'Davao City, Barangay 10, Block 5', status: 'Pending' },
    { id: 2, productName: 'Aquarium Set', price: '₱1,200', quantity: 1, address: 'Tagum City, Barangay 2, Lot 15', status: 'Delivered' },
    { id: 3, productName: 'Fish Food', price: '₱200', quantity: 3, address: 'Panabo City, Purok 4', status: 'Pending' },
    { id: 4, productName: 'Water Filter', price: '₱800', quantity: 1, address: 'Digos City, Zone 3', status: 'Delivered' },
    { id: 5, productName: 'Aquarium Light', price: '₱500', quantity: 2, address: 'Mati City, Block 7', status: 'Pending' },
    { id: 6, productName: 'Heater', price: '₱650', quantity: 1, address: 'Davao City, Barangay 12', status: 'Delivered' }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  // Pagination logic
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
              <th style={thStyle}>Product Name</th>
              <th style={thStyle}>Product Price</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Address</th>
              <th style={thStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td style={tdStyle}>{order.id}</td>
                <td style={tdStyle}>{order.productName}</td>
                <td style={tdStyle}>{order.price}</td>
                <td style={tdStyle}>{order.quantity}</td>
                <td style={tdStyle}>{order.address}</td>
                <td style={{ ...tdStyle, color: order.status === 'Delivered' ? 'green' : 'orange' }}>
                  {order.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
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

// Styles
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
