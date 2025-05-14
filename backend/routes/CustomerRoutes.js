const express = require('express');
const router = express.Router();
const controller = require('../controllers/CustomerController.js');
const upload = require('../middlewares/uploads.js'); // <-- ADD THIS
// 🟢 Register with image upload
router.post('/register', upload.single('image'), controller.addUser);

router.get('/', controller.getUsers);

    // 🟢 Login
    router.post('/login', controller.loginUser);

    router.get('/:id', controller.getUserById); // 👈 this line

        router.delete('/:id', controller.deleteUser)

// 🟢 Update user
router.put('/:id', upload.single('image'), controller.updateUser);

module.exports = router;
