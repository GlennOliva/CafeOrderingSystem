import '../../styles/style.css';
import Sidebar from '../../components/Admin/Sidebar';
import Navbar from '../../components/Admin/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [totalCustomer, setTotalCustomer] = useState<number | null>(null);
  const [totalSales, setTotalSales] = useState<number | null>(null);
  const [totalCategory, setTotalCategory] = useState<number | null>(null);
  const [totalProduct, setTotalProduct] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);  // Added error state

  const apiUrl = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [customerRes, salesRes, categoryRes, productRes] = await Promise.all([
          axios.get(`${apiUrl}/total-customers`),
          axios.get(`${apiUrl}/total-sales`),
          axios.get(`${apiUrl}/total-categories`),
          axios.get(`${apiUrl}/total-products`)
        ]);

        setTotalCustomer(customerRes.data?.no_customers ?? 0);
        setTotalSales(salesRes.data?.total_sales ?? 0);
        setTotalCategory(categoryRes.data?.no_category ?? 0);
        setTotalProduct(productRes.data?.no_products ?? 0);
      } catch (error) {
        setError('Error fetching dashboard data');
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [apiUrl]);

  const formatNumber = (num: number | null) => {
    return num !== null ? num.toLocaleString() : 'Loading...';
  };

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Dashboard</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Home</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Dashboard</a></li>
          </ul>

          {error ? (
            <div className="error-message">{error}</div>  // Display error message if any
          ) : (
            <div className="info-data">
              <div className="card">
                <div className="head">
                  <div>
                    <h2>{formatNumber(totalCustomer)}</h2>
                    <p>NO. CUSTOMER</p>
                  </div>
                  <i className='bx bx-group icon'></i>
                </div>
              </div>

              <div className="card">
                <div className="head">
                  <div>
                    <h2>₱ {formatNumber(totalSales)}</h2>
                    <p>TOTAL SALES</p>
                  </div>
                  <i className='bx bx-money icon'></i>
                </div>
              </div>

              <div className="card">
                <div className="head">
                  <div>
                    <h2>{formatNumber(totalCategory)}</h2>
                    <p>NO. CATEGORIES</p>
                  </div>
                  <i className='bx bx-category icon'></i>
                </div>
              </div>

              <div className="card">
                <div className="head">
                  <div>
                    <h2>{formatNumber(totalProduct)}</h2>
                    <p>NO. PRODUCTS</p>
                  </div>
                  <i className='bx bx-package icon'></i>
                </div>
              </div>
            </div>
          )}

          <div className="data">
            {/* Additional dashboard data or charts can go here */}
          </div>
        </main>
      </section>
    </div>
  );
};

export default AdminDashboard;
