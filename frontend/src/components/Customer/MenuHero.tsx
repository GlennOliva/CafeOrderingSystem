/* eslint-disable @typescript-eslint/no-explicit-any */
import  { useState, useEffect } from 'react';
import '../../styles/main.css';
import bannerImage from '../../assets/hero/MENU PAGE IMAGE HEADER.jpg';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


const MenuHero = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const user_id = localStorage.getItem('user_id') || '';
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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/category`);
        const data = await res.json();
        setCategories(['All', ...data.map((cat: any) => cat.category_name)]);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/product`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchCategories();
    fetchProducts();
  }, [apiUrl]);


  const handleAddToCart = async (product_id: number) => {
  if (!user_id) {
    setSnackbar({
      open: true,
      message: 'Please log in to add items to cart',
      severity: 'warning',
    });
    return;
  }

  try {
    const res = await fetch(`${apiUrl}/api/cart/add_cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id,
        product_id,
        qty: 1,
      }),
    });

    const result = await res.json();
    if (res.ok) {
      setSnackbar({
        open: true,
        message: 'Product added to cart!',
        severity: 'success',
      });
    } else {
      setSnackbar({
        open: true,
        message: `Failed to add to cart: ${result.error}`,
        severity: 'error',
      });
    }
  } catch (err) {
    console.error('Add to cart error:', err);
    setSnackbar({
      open: true,
      message: 'Something went wrong while adding to cart',
      severity: 'error',
    });
  }
};





  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category_name === selectedCategory);

  return (
    <div className="menu-hero-container">
      <div
        className="menu-hero-banner"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          marginTop: '2%',
        }}
      >
        <h1 className="menu-hero-title">Menu</h1>
      </div>

      <nav className="menu-categories">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`menu-category-btn ${cat === selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div className="menu-grid">
        {filteredProducts.map((product, index) => (
          <div className="menu-card" key={index}>
            <div className="menu-card-img">
              <img
                src={`${apiUrl}/uploads/${product.product_image}`} // Adjust path based on your backend image storage
                alt={product.product_name}
                className="menu-card-thumbnail"
              />
            </div>
            <div className="menu-card-info">
              <p className="menu-card-name">{product.product_name}</p>
              <p className="menu-card-price">₱ {product.product_price}</p>
            </div>
    <div className="menu-card-cart" onClick={() => handleAddToCart(product.id)}>
  <i className="bx bx-cart"></i>
</div>

          </div>
        ))}
      </div>


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



  );
};

export default MenuHero;
