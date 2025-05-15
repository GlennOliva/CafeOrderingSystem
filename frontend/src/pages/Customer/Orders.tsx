
import Navbar from '../../components/Customer/Navbar'
import Footer from '../../components/Customer/Footer'
import OrderList from '../../components/Customer/OrderList'

const Orders = () => {
  return (
  <>
  <Navbar/>
    <OrderList userId={'user_id'}/>
  <Footer/>
  </>
  )
}

export default Orders