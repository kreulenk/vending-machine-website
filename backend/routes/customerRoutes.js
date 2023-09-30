const { Router } = require('express');
  
// Local Modules
const customerController = require('../controllers/customerController');
  
const router = Router();
  
// Requests 
router.get('/sodas', customerController.getSodaInventory);
  
module.exports = router;