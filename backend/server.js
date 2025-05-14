const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const db = require('./config/db.js');
const adminRoutes = require('./routes/AdminRoutes.js');
const DashboardRoutes = require('./routes/DashboardRoutes.js');
const customerRoutes = require('./routes/CustomerRoutes')
const categoryRoutes = require('./routes/CategoryRoutes.js')
const productRoutes = require('./routes/ProductRoutes.js')
const orderRoutes = require('./routes/OrderRoutes.js')
app.use(cors()); // ✅ Allow all origins (for development)
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use('/api/admin', adminRoutes)
app.use('/api/user', customerRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/order', orderRoutes)

app.use(DashboardRoutes); // no '/api' prefix


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (request, response)=> {
    return response.json("Starting Node Server..");
})