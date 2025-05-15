import salad from '../../assets/menu/Alugbati & Kesong Puti Salad.jpg'; // Replace with actual path
import pasta from '../../assets/menu/Spicy Tinapa Pasta.jpg';
import drinks from '../../assets/menu/Tropical Halo Halo.jpg';
import '../../styles/main.css';

const FoodCategory = () => {
  return (
    <section className="ordering-food-category">
      <h2 className="ordering-section-title">FILIPINO FAVORITES</h2>
      <div className="ordering-food-list">
        <div className="ordering-food-card">
          <img src={salad} alt="Alugbati Salad" />
          <p>Salad</p>
        </div>
        <div className="ordering-food-card">
          <img src={pasta} alt="Shrimp Aligue Pasta" />
          <p>Pasta</p>
        </div>
        <div className="ordering-food-card">
          <img src={drinks} alt="Tropical Halo Halo" />
          <p>Drinks</p>
        </div>
      </div>
    </section>
  );
};

export default FoodCategory;
