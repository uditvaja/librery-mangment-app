const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', authMiddleware, (req, res) => {

    res.json(req.user); // Return the authenticated user info
  });
module.exports = router;
