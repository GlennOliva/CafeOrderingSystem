import React from 'react';
import '../../styles/main.css'; // Make sure to create this CSS file

interface UpdateProfileDialogProps {
  onClose: () => void;
  onSave: () => void;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({ onClose, onSave }) => {
  const isSmallScreen = window.innerWidth <= 600;

  return (
    <div
      className="dialog-container"
      style={{
        padding: isSmallScreen ? '30px 20px' : '50px',
        width: isSmallScreen ? '90%' : '500px'
      }}
    >
      <h4 className="dialog-title">{isSmallScreen ? 'Update Profile' : 'Update Profile'}</h4>
      <input type="text" placeholder="Full Name" className="dialog-input" />
      <input type="email" placeholder="Email" className="dialog-input" />
      <input type="text" placeholder="Address" className="dialog-input" />
      <input type="text" placeholder="Contact Number" className="dialog-input" />
      <input type="file" className="dialog-input" />
      <div className="dialog-actions">
        <button onClick={onClose} className="dialog-button cancel">Cancel</button>
        <button onClick={onSave} className="dialog-button save">Save</button>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
