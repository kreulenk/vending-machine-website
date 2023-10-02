const { Router } = require('express');
  
// Local Modules
const adminController = require('../controllers/adminController');
  
const router = Router();
  
// Soda routes
router.put('/soda-cost', adminController.updateSodaCost);
router.post('/restock-soda', adminController.restockSoda);
  
module.exports = router;