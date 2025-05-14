import  { useState } from 'react';
import '../../styles/main.css';
import logo from '../../assets/logo/IMG_7997.png';
import { Link, useNavigate } from 'react-router-dom';
import UpdateProfileDialog from './UpdateProfileDialog';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const [showDialog, setShowDialog] = useState(false);
const [showUpdateForm, setShowUpdateForm] = useState(false);
const navigate = useNavigate()

const handleLogout = () => {
  // Clear user data, token, etc.
  console.log('Logging out...');
  navigate('/'); // redirect to login or home
};

  return (
    <nav className="ordering-navbar">
      {/* Logo */}
      <img src={logo} alt="Cafe Logo" className="ordering-navbar-logo" />

      {/* Hamburger Icon (for mobile) */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
        <span className={`bar ${menuOpen ? 'open' : ''}`}></span>
      </div>

      {/* Navigation Links */}
      <ul className={`ordering-navbar-links ${menuOpen ? 'show' : ''}`}>
          <Link to='/home' className="ordering-navbar-text" style={{textDecoration: 'none'}}>Home</Link>
        <Link to='/menu' className="ordering-navbar-text" style={{textDecoration: 'none'}}>Menu</Link>
       <Link to='/about' className="ordering-navbar-text" style={{textDecoration: 'none'}}>About Us</Link>
         <Link to='/orders' className="ordering-navbar-text" style={{textDecoration: 'none'}}>Orders</Link>
      <li>
  <Link to="/cart"><i className='bx bx-cart'></i></Link>
</li>
 <li style={{ position: 'relative' }}>
      <button onClick={() => setShowDialog(!showDialog)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <i className='bx bx-user'></i>
      </button>

      {showDialog && (
        <div style={dialogStyle}>
          <p style={{ marginBottom: '10px' }}>👋 Welcome, Glenn</p>
          <button style={dialogButtonStyle} onClick={() => { setShowUpdateForm(true); setShowDialog(false); }}>
            Update Profile
          </button>
          <button style={dialogButtonStyle} onClick={handleLogout}>Logout</button>
        </div>
      )}

      {showUpdateForm && (
        <UpdateProfileDialog
          onClose={() => setShowUpdateForm(false)}
          onSave={() => {
            console.log('Submit');
            setShowUpdateForm(false);
          }}
        />
      )}
    </li>


      </ul>
    </nav>
  );
};


const dialogStyle: React.CSSProperties =  {
  position: 'absolute',
  top: '40px',
  right: '0',
  background: 'white',
  border: '1px solid #ccc',
  borderRadius: '8px',
  padding: '15px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  zIndex: 1000,
  width: '200px',
  marginRight: '3%'
};

const dialogButtonStyle:React.CSSProperties = {
  width: '100%',
  background: 'none',
  border: 'none',
  textAlign: 'left',
  padding: '10px 0',
  cursor: 'pointer',
  fontSize: '14px'
};


export default Navbar;
