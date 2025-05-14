import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Admin/Navbar';
// import AddBudgetModal from '../../components/User/AddBudgetModal';
// import UpdateBudgetModal from '../../components/User/UpdateBudgetModal';
import { Snackbar, Alert } from '@mui/material';
import UpdateOrderModal from '../../components/Admin/UpdateOrderModal';

interface Orders {
  id: number;
  user_id: number;
  user_name: string;
  product_id: number;
  product_name: string; 
  product_price: number;
 payment_method: string;
 total_amount: number;
 status: string;
  created_at: string;
  quantity: number;
}

const ManageCustomer = () => {
  const [order, setOrder] = useState<Orders[]>([]);
  const [filteredOrder, setFilteredOrder] = useState<Orders[]>([]); // For filtered results
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>(null);
  // const [residentProfile , setResidentProfile] = useState<{
  //   image:string,
  // } | null>(null);
//   const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');


  const apiUrl = import.meta.env.VITE_API_URL;
  
useEffect(() => {
  axios.get(`${apiUrl}/api/order`)
    .then(res => {
      setOrder(res.data);
      setFilteredOrder(res.data); // Initially show all expenses
    })
    .catch(err => console.error('Failed to fetch order:', err));
}, [apiUrl]);


  const handleUpdate = (orderId: number) => {
    const orderToUpdate = order.find((order) => order.id === orderId);
    setSelectedOrder(orderToUpdate || null);
  };


  const handleDelete = (orderId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this order?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/order/${orderId}`)
        .then(() => {
          setOrder(order.filter((order) => order.id !== orderId));
          setSnackbar({
            open: true,
            message: "Order deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete order:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete order. Please try again.',
            severity: 'error',
          });
        });
    }
  };
  


 
  

  const closeSnackbar = () => {
    setSnackbar({
      open: false,
      message: '',
      severity: 'info',
    });
  };

  // Handle search filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const filtered = order.filter(order =>
        order.product_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredOrder(filtered);
    } else {
      setFilteredOrder(order); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrder = filteredOrder.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Orders</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Order</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Orders</a></li>
          </ul>

          <div className="efinance-table-container">
            <div className="efinance-table-controls">
              <input
                type="text"
                className="efinance-table-search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>



            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Customer Name</th>
                  <th>Product Name</th>
                  <th>Product Price</th>
                  <th>Order Qty</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                  <th>Created_at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.length > 0 ? (
                  currentOrder.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.user_name}</td>
                      <td>{order.product_name}</td>
                      <td>{order.product_price}</td>
                      <td>{order.quantity}</td>
                      <td>{order.total_amount}</td>
                      <td>{order.status}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                           <td>
                             <button onClick={() => handleUpdate(order.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(order.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No resident found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div
  className="efinance-table-footer"
  style={{
    width: '100%',
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'space-between',
    padding: '10px',
    marginTop: '20px',
    gap: '10px'
  }}
>
  <span>Showing {currentOrder.length} entries</span>
  <div
    className="efinance-pagination"
    style={{
      display: 'flex',
      gap: '6px'
    }}
  >
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        margin: '0 4px',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#f3f4f6',
        cursor: 'pointer'
      }}
    >
      Previous
    </button>
    {[...Array(Math.ceil(filteredOrder.length / itemsPerPage))].map((_, index) => (
      <button
        key={index}
        onClick={() => paginate(index + 1)}
        style={{
          margin: '0 4px',
          padding: '6px 10px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: currentPage === index + 1 ? '#3b82f6' : '#f3f4f6',
          color: currentPage === index + 1 ? 'white' : 'black',
          cursor: 'pointer'
        }}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === Math.ceil(filteredOrder.length / itemsPerPage)}
      style={{
        margin: '0 4px',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#f3f4f6',
        cursor: 'pointer'
      }}
    >
      Next
    </button>
  </div>
</div>
          </div>
        </main>
      </section>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

    Modals
      {selectedOrder && (
        <UpdateOrderModal onClose={() => setSelectedOrder(null)} order={selectedOrder} />
      )} 
    </div>
  );
};

export default ManageCustomer;
