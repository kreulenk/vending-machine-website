const { Router } = require('express');
  
// Local Modules
const customerController = require('../controllers/customerController');
  
const router = Router();
  
// Soda routes
router.get('/sodas', customerController.getSodaInventory);

// User routes
router.post('/login', customerController.loginUser);
  
module.exports = router;