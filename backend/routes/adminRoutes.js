const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Admin protected route
router.get('/dashboard', verifyToken, isAdmin, (req, res) => {
  res.json({ content: 'Confidential admin data here', role: req.user.role });
});

module.exports = router;