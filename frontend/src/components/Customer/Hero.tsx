import { useNavigate } from 'react-router-dom';
import '../../styles/main.css';
import heroBg from '../../assets/hero/MAIN PAGE IMAGE 1.jpg'; // adjust path if needed

const Hero = () => {
  const navigate = useNavigate();

  const handleNavigatetoMenu = () => {
    navigate('/menu');
  };

  return (
    <section className="ordering-hero" style={{ backgroundImage: `url(${heroBg})` }}>
      <div className="ordering-hero-content">
        <h1>A Filipino Cafe right at the heart of Palawan.</h1>
        <button className="ordering-hero-button" onClick={handleNavigatetoMenu}>
          Order Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
