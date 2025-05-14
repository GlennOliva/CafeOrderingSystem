const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProductController.js');
const upload = require('../middlewares/uploads.js'); // <-- ADD THIS
// 🟢 Register with image upload
router.post('/add_product', upload.single('product_image'), controller.addProduct);

router.get('/', controller.getProducts);


    router.get('/:id', controller.getProductById); // 👈 this line

// 🟢 Update user
router.put('/:id', upload.single('product_image'), controller.updateProduct);

    router.delete('/:id', controller.deleteProduct)

module.exports = router;
