import '../../styles/main.css';
import heroBg2 from '../../assets/hero/MAIN PAGE IMAGE 2.jpg'; // ✅ image import

const Testimonials = () => {
  return (
    <section
      className="ordering-testimonials"
      style={{
        backgroundImage: `url(${heroBg2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '5rem 2rem',
        textAlign: 'center',
        color: '#000',
      }}
    >
      <div className="ordering-testimonial-content">
        <div className="ordering-quote-icon" style={{ fontSize: '3rem', fontWeight: 'bold' }}>“</div>
        <p className="ordering-testimonial-text" style={{ fontStyle: 'italic', maxWidth: '600px', margin: '0 auto' }}>
          Isla ni Lola Cafe serves some of the most authentic Filipino dishes I’ve ever tasted.
          The flavors brought me back to my childhood in the province — warm, comforting, and full of heart.
          Truly a hidden gem.
        </p>
        <div className="ordering-stars" style={{ fontSize: '1.5rem', marginTop: '1rem' }}>★★★★★</div>
        <p className="ordering-critic" style={{ marginTop: '0.5rem', fontWeight: 'bold' }}>Cornel - Food Critic</p>
      </div>
    </section>
  );
};

export default Testimonials;
