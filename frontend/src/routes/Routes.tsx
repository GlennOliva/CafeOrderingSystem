import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Customer/Home';
import Menu from '../pages/Customer/Menu';
import About from '../pages/Customer/About';
import Cart from '../pages/Customer/Cart';
import Checkout from '../pages/Customer/Checkout';
import Orders from '../pages/Customer/Orders';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ManageCustomer from '../pages/Admin/ManageCustomer';
import ManageCategory from '../pages/Admin/ManageCategory';
import ManageProduct from '../pages/Admin/ManageProduct';
import ManageOrder from '../pages/Admin/ManageOrder';




const AppRoutes = () => (
  <Router>
    <Routes>
  <Route path="/" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/home" element={<Home/>} />
<Route path="/menu" element={<Menu/>} />
<Route path='/about' element={<About/>} />
<Route path='/cart' element={<Cart/>} />
<Route path='/checkout' element={<Checkout/>} />
<Route path='/orders' element={<Orders/>} />
<Route path='/admin/dashboard' element={<AdminDashboard/>} />
<Route path='/admin/manage_customer' element={<ManageCustomer/>} />
<Route path='/admin/manage_category' element={<ManageCategory/>} />
<Route path='/admin/manage_product' element={<ManageProduct/>} />
<Route path='/admin/manage_order' element={<ManageOrder/>} />
    </Routes>
  </Router>
);

export default AppRoutes;
