const { Router } = require('express');
  
// Local Modules
const customerController = require('../controllers/customerController');
  
const router = Router();
  
// Soda routes
router.get('/sodas', customerController.getSodaInventory);
router.put('/sodas', customerController.purchaseSoda)

// User routes
router.post('/login', customerController.login);
  
module.exports = router;