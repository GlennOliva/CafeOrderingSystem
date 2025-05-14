import { useNavigate } from 'react-router-dom';
import product_image from '../../assets/menu/Green Tea Lychee.jpg'

const CartContent = () => {
      const navigate = useNavigate();
  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Your Cart</h2>
      <hr />

      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        {/* Left Side - Cart Items */}
        <div style={{ flex: '1 1 60%', maxWidth: '65%' }}>
          {[1, 2].map((_item, index) => (
            <div key={index} style={{ display: 'flex', margin: '20px 0', borderBottom: '1px solid #ccc', paddingBottom: '20px' }}>
              {/* Product Image */}
              <div style={{
  width: '100px',
  height: '100px',
  marginRight: '20px',
  borderRadius: '20px',
  overflow: 'hidden',
  flexShrink: 0
}}>
  <img
    src={product_image} // Replace this with your actual product image URL
    alt="Product"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>


              {/* Product Info */}
              <div style={{ flexGrow: 1 }}>
                <div style={{ fontWeight: 'bold' }}>Lychee</div>
                <div style={{ color: '#666', marginBottom: '10px' }}>₱ 250</div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ marginRight: '10px' }}>QUANTITY:</span>
                  <button style={qtyBtnStyle}>+</button>
                  <input type="text" value="1" readOnly style={qtyInputStyle} />
                  <button style={qtyBtnStyle}>−</button>
                </div>
              </div>
            </div>
          ))}

          {/* Special Instructions */}
          <div>
            <textarea
              placeholder="Special Instructions: (e.g. no mayo)"
              style={{ width: '100%', height: '100px', padding: '10px', marginTop: '20px', border: '1px solid #aaa' }}
            ></textarea>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div style={{
          width: '300px',
          border: '1px solid #ccc',
          padding: '20px',
          alignSelf: 'flex-start',
          marginTop: '20px'
        }}>
          <h3>Order Summary</h3>
          <div style={summaryRowStyle}>
            <span>PRODUCT x 1</span>
            <span>₱ 250</span>
          </div>
          <div style={summaryRowStyle}>
            <span>PRODUCT x 2</span>
            <span>₱ 250</span>
          </div>
          <div style={{ ...summaryRowStyle, marginTop: '10px' }}>
            <span>Qty</span>
            <span>2</span>
          </div>
          <hr />
          <div style={{ ...summaryRowStyle, fontWeight: 'bold' }}>
            <span>Total</span>
            <span>₱ 500</span>
          </div>
      <button
      style={{
        width: '100%',
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#333',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
      }}
      onClick={() => navigate('/checkout')}
    >
      PROCEED TO CHECKOUT
    </button>
        </div>
      </div>
    </div>
  );
};

// Styles
const qtyBtnStyle: React.CSSProperties = {
  width: '30px',
  height: '30px',
  border: '1px solid #ccc',
  backgroundColor: '#eee',
  cursor: 'pointer'
};

const qtyInputStyle: React.CSSProperties = {
  width: '40px',
  textAlign: 'center',
  margin: '0 10px',
  border: '1px solid #ccc',
  height: '30px'
};

const summaryRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  margin: '8px 0'
};


export default CartContent;
