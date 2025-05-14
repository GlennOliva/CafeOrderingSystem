import React, { useState } from 'react'; // Import useState
import '../../styles/main.css'; // Make sure to create this CSS file
import { Snackbar, Alert } from '@mui/material'; // Import Material-UI Snackbar and Alert

interface UpdateProfileProps {
  initialFullName: string;
  initialEmail: string;
  initialPassword: string;
  initialContactNumber: string;
  image: string;
  userId: string;
  address: string;
  onClose: () => void;
}

const UpdateProfile: React.FC<UpdateProfileProps> = ({
  initialFullName,
  initialEmail,
  initialPassword,
  initialContactNumber,
  userId,
  address,
  onClose
}) => {
  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState(initialPassword);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [userAddress, setUserAddress] = useState(address);
  const [contactNumber, setContactNumber] = useState(initialContactNumber);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'info',
  });

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', userAddress);
    formData.append('contact_number', contactNumber);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    fetch(`${apiUrl}/api/user/${userId}`, {
      method: 'PUT',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Profile updated:', data);
        setSnackbar({
          open: true,
          message: 'User Profile updated successfully!',
          severity: 'success',
        });
        // Show snackbar, then close dialog and reload after a short delay
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 3000); // Wait for 3 seconds before closing and reloading
      })
      .catch((err) => {
        console.error(err);
        setSnackbar({
          open: true,
          message: 'Error updating profile. Please try again.',
          severity: 'error',
        });
      });
  };

  return (
    <div
      className="dialog-container"
      style={{
        padding: '50px',
        width: '500px',
      }}
    >
      <h4 className="dialog-title">Update Profile</h4>

      {/* Form Inputs */}
      <input
        type="text"
        placeholder="Full Name"
        className="dialog-input"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="dialog-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Address"
        className="dialog-input"
        value={userAddress}
        onChange={(e) => setUserAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Contact Number"
        className="dialog-input"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="dialog-input"
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="file" className="dialog-input" onChange={handleImageChange} />

      {/* Action Buttons */}
      <div className="dialog-actions">
        <button onClick={onClose} className="dialog-button cancel">
          Cancel
        </button>
        <button onClick={handleSubmit} className="dialog-button save">
          Save
        </button>
      </div>

      {/* Snackbar notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ marginTop: '50px' }}
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

export default UpdateProfile;
