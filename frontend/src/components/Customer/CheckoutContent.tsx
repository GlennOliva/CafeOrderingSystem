import React from 'react';

const CheckoutContent = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      {/* Responsive Style */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @media (max-width: 768px) {
              .checkout-container {
                flex-direction: column;
              }

              .left-column, .right-column {
                width: 100% !important;
              }

              .right-column {
                margin-top: 20px;
              }
            }
          `,
        }}
      />

      <div className="checkout-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {/* Left Column */}
        <div className="left-column" style={{ width: '65%' }}>
          <h2>Checkout</h2>
          <hr />

          {/* PAYMENT */}
          <h4>PAYMENT</h4>
          <label>PAYMENT METHOD</label>
          <select style={inputStyle}>
            <option value="cod">Cash on Delivery (COD)</option>
            <option value="paypal">PayPal</option>
            <option value="bank">Bank</option>
          </select>

          {/* CONTACT */}
          <h4>CONTACT</h4>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <input type="text" placeholder="First Name" style={halfInputStyle} />
            <input type="text" placeholder="Last Name" style={halfInputStyle} />
          </div>
          <input type="text" placeholder="Phone Number" style={inputStyle} />
          <input type="email" placeholder="Email" style={inputStyle} />

          {/* DELIVERY */}
          <h4>DELIVERY</h4>
          <label>REGIONAL BRANCH</label>
          <select style={inputStyle}>
            <option>Davao City</option>
            <option>Tagum City</option>
          </select>
          <input type="text" placeholder="City" style={inputStyle} />
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <select style={halfInputStyle}>
              <option>Barangay 1</option>
              <option>Barangay 2</option>
            </select>
            <input type="text" placeholder="Postal Code" style={halfInputStyle} />
          </div>
          <input type="text" placeholder="Block / Lot (Input exact location/landmark)" style={inputStyle} />
        </div>

        {/* Right Column - Order Summary */}
        <div className="right-column" style={{ width: '30%', border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
          <h4>Order Summary</h4>
          <div style={{ marginBottom: '10px' }}>
            <div style={rowStyle}><span>PRODUCT x1</span><span>PHP</span></div>
            <div style={rowStyle}><span>PRODUCT x2</span><span>PHP</span></div>
            <div style={rowStyle}><span>Shipping Fee</span><span>PHP</span></div>
          </div>
          <hr />
          <div style={{ ...rowStyle, fontWeight: 'bold', marginTop: '10px' }}>
            <span>Total</span><span>PHP</span>
          </div>
          <button style={buttonStyle}>PAY NOW</button>
        </div>
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
};

const halfInputStyle: React.CSSProperties = {
  flex: 1,
  padding: '8px',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
};

const buttonStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px',
  background: '#444',
  color: 'white',
  marginTop: '20px',
  border: 'none',
  cursor: 'pointer',
};

export default CheckoutContent;
