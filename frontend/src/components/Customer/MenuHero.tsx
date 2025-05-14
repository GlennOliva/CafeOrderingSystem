import React from 'react';
import '../../styles/main.css';
import bannerImage from '../../assets/hero/MENU PAGE IMAGE HEADER.jpg'; // <-- Import the image
import food_img from '../../assets/menu/Crispy Tinapa Salad.jpg'
const MenuHero = () => {
  const categories = [
    'All',
    'Salads',
    'Pastas',
    'Desserts',
    'Fresh Shakes and Juices',
    'Other Beverages',
  ];

  return (
    <div className="menu-hero-container">
      {/* Background image using inline style */}
      <div
        className="menu-hero-banner"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginTop: '2%'
        }}
      >
        <h1 className="menu-hero-title">Menu</h1>
      </div>

      <nav className="menu-categories">
        {categories.map((cat, index) => (
          <button key={index} className={`menu-category-btn ${index === 0 ? 'active' : ''}`}>
            {cat}
          </button>
        ))}
      </nav>

     <div className="menu-grid">
  {Array.from({ length: 16 }).map((_, index) => (
    <div className="menu-card" key={index}>
      {/* Food Image */}
      <div className="menu-card-img">
        <img
          src={food_img}// Replace with your image source or imported image
          alt="Food"
          className="menu-card-thumbnail"
        />
      </div>

      {/* Food Info */}
      <div className="menu-card-info">
        <p className="menu-card-name">Sardinas Pasta</p>
        <p className="menu-card-price">₱ 250</p>
      </div>

      {/* Cart Icon */}
      <div className="menu-card-cart">
        <i className="bx bx-cart"></i>
      </div>
    </div>
  ))}
</div>

    </div>
  );
};

export default MenuHero;
