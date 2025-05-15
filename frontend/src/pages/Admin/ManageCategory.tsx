import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/style.css';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Admin/Navbar';
import { Snackbar, Alert } from '@mui/material';
import UpdateCategoryModal from '../../components/Admin/UpdateCategoryModal';
import AddCategoryModal from '../../components/Admin/AddCategoryModal';

interface Category {
  id: number;
  category_name: string;
  created_at: string;
}

const ManageCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]); // For filtered results
   const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
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
  axios.get(`${apiUrl}/api/category`)
    .then(res => {
      setCategory(res.data);
      setFilteredCategory(res.data); // Initially show all expenses
    })
    .catch(err => console.error('Failed to fetch category:', err));
}, [apiUrl]);


  const handleUpdate = (categoryId: number) => {
    const categoryToUpdate = category.find((category) => category.id === categoryId);
    setSelectedCategory(categoryToUpdate || null);
  };


  const handleDelete = (categoryId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this category?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/category/${categoryId}`)
        .then(() => {
          setCategory(category.filter((category) => category.id !== categoryId));
          setSnackbar({
            open: true,
            message: "Category deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete schedule:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete category. Please try again.',
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
      const filtered = category.filter(category =>
        category.category_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCategory(filtered);
    } else {
      setFilteredCategory(category); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * itemsPerPage;
  const indexOfFirstCategory = indexOfLastCategory - itemsPerPage;
  const currentCategory = filteredCategory.slice(indexOfFirstCategory, indexOfLastCategory );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Category</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Category</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Category</a></li>
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
              <button onClick={() => setIsAddCategoryOpen(true)} className="btn add-btn">
                Add Category
              </button>
            </div> 
    
            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category Name</th>
                  <th>Created_at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentCategory.length > 0 ? (
                  currentCategory.map((category) => (
                    <tr key={category.id}>
                      <td>{category.id}</td>
                      <td>{category.category_name}</td>
                      <td>{new Date(category.created_at).toLocaleDateString()}</td>
                      <td>
                                <button onClick={() => handleUpdate(category.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(category.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No category found.</td>
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
  <span>Showing {currentCategory.length} entries</span>
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
    {[...Array(Math.ceil(filteredCategory.length / itemsPerPage))].map((_, index) => (
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
      disabled={currentPage === Math.ceil(filteredCategory.length / itemsPerPage)}
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
      {isAddCategoryOpen && <AddCategoryModal onClose={() => setIsAddCategoryOpen(false)} />}
      {selectedCategory && (
        <UpdateCategoryModal onClose={() => setSelectedCategory(null)} category={selectedCategory} />
      )}
    </div>
  );
};

export default ManageCategory;
