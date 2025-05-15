const express = require('express');
const router = express.Router();
const controller = require('../controllers/CategoryController.js');
// insert schedule
router.post('/add_category', controller.addCategory);

  router.get('/', controller.getCategory); // 👈 this line

    router.get('/:id', controller.getCategoryById); // 👈 this line

    router.delete('/:id', controller.deleteCategory)

// 🟢 Update schedule
router.put('/:id',  controller.updateCategory);

module.exports = router;
