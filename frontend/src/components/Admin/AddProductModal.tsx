import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../styles/style.css'; // Import your CSS file here
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || ""; // Ensure fallback

interface Category {
  id: number;
  category_name: string;
}

interface AddProductModalProps {
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ onClose }) => {
  // Corrected states
  const [category, setCategory] = useState<Category[]>([]);
  const [product_name, setProductName] = useState("");
  const [product_price, setProductPrice] = useState("");
    const [product_qty, setProductQty] = useState("");
const [product_image, setProductImage] = useState<File | null>(null);
     const [status , setStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Use for category selection
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit status
  const adminId = localStorage.getItem('admin_id') || "";
  // Snackbar state
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
    axios
      .get(`${apiUrl}/api/category`) // Fixed typo
      .then((res) => setCategory(res.data))
      .catch((err) => console.error("Error fetching category", err));
  }, [adminId]);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  if (!selectedCategory) {
    setSnackbar({
      open: true,
      message: "Please select a Category",
      severity: "error",
    });
    setIsSubmitting(false);
    return;
  }

  const formData = new FormData();
  formData.append("admin_id", adminId);
  formData.append("category_id", selectedCategory);
  formData.append("product_name", product_name);
  formData.append("product_price", product_price);
  formData.append("product_qty", product_qty);
  formData.append("status", status);
  if (product_image) {
    formData.append("product_image", product_image);
  }

  try {
    await axios.post(`${apiUrl}/api/product/add_product`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    setSnackbar({
      open: true,
      message: "Product created successfully!",
      severity: "success",
    });

    setTimeout(() => {
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 2000);
  } catch (error) {
    console.error("Error creating product:", error);
    setSnackbar({
      open: true,
      message:
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to create product.",
      severity: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Add Product</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={product_name}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Product Price</label>
              <input
                type="number"
                value={product_price}
                onChange={(e) => setProductPrice(e.target.value)}
                required
              />
            </div>
             <div className="efinance-form-group">
              <label>Product Qty</label>
              <input
                type="number"
                value={product_qty}
                onChange={(e) => setProductQty(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name} {/* Corrected field */}
                  </option>
                ))}
              </select>
            </div>
      <div className="efinance-form-group">
              <label>Product image</label>
      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    if (e.target.files && e.target.files[0]) {
      setProductImage(e.target.files[0]);
    }
  }}
  required
/>

            </div>
        <div className="efinance-form-group">
  <label>Status</label>
  <select value={status} onChange={(e) => setStatus(e.target.value)} required>
    <option value="">Select status</option>
    <option value="Available">Available</option>
    <option value="Not Available">Not Available</option>
  </select>
</div>
            
          </div>

          <div className="efinance-button-group">
            <button type="button" onClick={onClose} className="efinance-btn cancel">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="efinance-btn submit">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>

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
    </div>
  );
};

export default AddProductModal;
