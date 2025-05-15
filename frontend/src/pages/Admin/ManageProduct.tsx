import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Admin/Navbar';
import { Snackbar, Alert } from '@mui/material';
import UpdateProductModal from '../../components/Admin/UpdateProductModal';
import AddProductModal from '../../components/Admin/AddProductModal';

interface Product {
  id: number;
  category_id: number;
  category_name: string;
  product_name: string;
  product_price: number;
  product_qty: number;
  product_image: string
  status: string;
  created_at: string;
}

const ManageCompliant = () => {
  const [product, setProduct] = useState<Product[]>([]);
  const [filteredProduct, setFilteredProduct] = useState<Product[]>([]); // For filtered results
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
  axios.get(`${apiUrl}/api/product`)
    .then(res => {
      setProduct(res.data);
      setFilteredProduct(res.data); // Initially show all expenses
    })
    .catch(err => console.error('Failed to fetch product:', err));
}, [apiUrl]);


  const handleUpdate = (productId: number) => {
    const productToUpdate = product.find((product) => product.id === productId);
    setSelectedProduct(productToUpdate || null);
  };



  const handleDelete = (productId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this product?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/product/${productId}`)
        .then(() => {
          setProduct(product.filter((product) => product.id !== productId));
          setSnackbar({
            open: true,
            message: "Product deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete resident:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete product. Please try again.',
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
      const filtered = product.filter(product =>
        product.product_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProduct(filtered);
    } else {
      setFilteredProduct(product); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProduct = filteredProduct.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Product</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Product</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Product</a></li>
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

                <div className="action-buttons">
              <button onClick={() => setIsAddProductOpen(true)} className="btn add-btn">
                Add Product
              </button>
            </div> 


            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Product Name</th>
                  <th>Category Name</th>
                  <th>Product Price</th>
                  <th>Product Qty</th>
                  <th>Product Image</th>
                  <th>Status</th>
                  <th>Created_at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProduct.length > 0 ? (
                  currentProduct.map((product) => (
                    <tr key={product.id}>
                      <td>{product.id}</td>
                      <td>{product.product_name}</td>
                      <td>{product.category_name}</td>
                      <td>{product.product_price}</td>
                      <td>{product.product_qty}</td>
                          <td style={{ width: '10px' }}>
  <img 
    src={`${apiUrl}/uploads/${product.product_image}`} 
    alt="Profile" 
    style={{ width: '80px', height: 'auto', objectFit: 'cover', }}
  />
</td>
                         <td>{product.status}</td>
                      <td>{new Date(product.created_at).toLocaleDateString()}</td>
                      <td>
                             <button onClick={() => handleUpdate(product.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No product found.</td>
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
  <span>Showing {currentProduct.length} entries</span>
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
    {[...Array(Math.ceil(filteredProduct.length / itemsPerPage))].map((_, index) => (
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
      disabled={currentPage === Math.ceil(filteredProduct.length / itemsPerPage)}
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

   {isAddProductOpen && <AddProductModal onClose={() => setIsAddProductOpen(false)} />}
      {selectedProduct && (
        <UpdateProductModal onClose={() => setSelectedProduct(null)} product={selectedProduct} />
      )}
    </div>
  );
};

export default ManageCompliant;
