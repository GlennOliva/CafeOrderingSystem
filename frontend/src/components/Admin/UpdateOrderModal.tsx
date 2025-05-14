import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../styles/style.css';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || "";

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

interface UpdateOrderModalProps {
  onClose: () => void;
  order: Orders;
}

const UpdateOrderModal: React.FC<UpdateOrderModalProps> = ({ onClose, order }) => {
const [status, setStatus] = useState(order?.status || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as "success" | "error" | "warning" | "info",
  });



 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const payload = {
      user_id: order.user_id,
      product_id: order.product_id,
      quantity: order.quantity,
      payment_method: order.payment_method,
      total_amount: order.total_amount,
      status: status,
    };

    await axios.put(`${apiUrl}/api/order/${order.id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setSnackbar({
      open: true,
      message: "Order updated successfully!",
      severity: "success",
    });

    setTimeout(() => {
      onClose();
      setTimeout(() => window.location.reload(), 500);
    }, 2000);
  } catch (error) {
    console.error("Error updating order:", error);
    setSnackbar({
      open: true,
      message:
        axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to update order.",
      severity: "error",
    });
  } finally {
    setIsSubmitting(false);
  }
};



  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Update Order</h2>

        <form onSubmit={handleSubmit} className="efinance-form" encType="multipart/form-data">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Order Product Name</label>
   <input type="text" value={order?.product_name} readOnly />

            </div>
            <div className="efinance-form-group">
              <label>Product Price</label>
              <input type="text" value={order.product_price || ""} readOnly />
            </div>

            <div className="efinance-form-group">
              <label>Order Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="On Delivery">On Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div className="efinance-form-group">
              <label>Quantity</label>
              <input type="text" value={order.quantity} readOnly />
            </div>

            
            <div className="efinance-form-group">
              <label>Customer Name</label>
              <input type="text" value={order.user_name} readOnly />
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

export default UpdateOrderModal;
