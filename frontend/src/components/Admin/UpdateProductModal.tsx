import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../styles/style.css';
import axios from 'axios';

const adminId = localStorage.getItem('admin_id');
const apiUrl = import.meta.env.VITE_API_URL || "";

interface Category {
  id: number;
  category_name: string;
}

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

interface UpdateProductModalProps {
  onClose: () => void;
  product: Product;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ onClose, product }) => {
  const [category, setCategory] = useState<Category[]>([]);
  const [product_name, setProductName] = useState(product.product_name);
    const [product_price, setProductPrice] = useState(product.product_price);
       const [product_qty, setProductQty] = useState(product.product_qty);
const [productImage, setProductImage] = useState<File | null>(null);

  const [status, setStatus] = useState(product.status);
  const [selectedCategory, setSelectedCategory] = useState(product.category_id.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as "success" | "error" | "warning" | "info",
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/category/${adminId}`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.error('Error fetching category:', err));
  }, []);

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
  formData.append('admin_id', adminId || '');
  formData.append('category_id', selectedCategory);
  formData.append('product_name', product_name);
  formData.append('product_price', product_price.toString());
  formData.append('product_qty', product_qty.toString());
  if (productImage) {
    formData.append('product_image', productImage);
  }
  formData.append('status', status);

  try {
    await axios.put(`${apiUrl}/api/product/${product.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    setSnackbar({
      open: true,
      message: "Product updated successfully!",
      severity: "success",
    });

    setTimeout(() => {
      onClose();
      setTimeout(() => window.location.reload(), 500);
    }, 2000);
  } catch (error) {
    console.error("Error updating product:", error);
    setSnackbar({
      open: true,
      message:
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to update product.",
      severity: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};

  
  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Update Product</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Product Name</label>
              <input type="text" value={product_name} onChange={(e) => setProductName(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Product Price</label>
              <input type="number" value={product_price} onChange={(e) => setProductPrice(Number(e.target.value))} required />
            </div>
            <div className="efinance-form-group">
              <label>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                <option value="">Select a Category</option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>{category.category_name}</option>
                ))}
              </select>
            </div>
                     <div className="efinance-form-group">
              <label>Product Qty</label>
              <input type="number" value={product_qty} onChange={(e) => setProductQty(Number(e.target.value))} required />
            </div>

            {product.product_image && (
  <div style={{ marginTop: '10px' }}>
    <label>Current Image:</label><br />
    <img src={`${apiUrl}/uploads/${product.product_image}`} alt="Current Product" width="100" />
  </div>
)}



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
            <button type="button" onClick={onClose} className="efinance-btn cancel">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="efinance-btn submit">
              {isSubmitting ? "Updating..." : "Update"}
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

export default UpdateProductModal;
