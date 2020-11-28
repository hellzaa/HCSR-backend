const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController');

router.get('/getalladmins', userController.get_all_admins);

router.post('/adduser', userController.add_moh_user);
router.get('/getadmin/:UserID', userController.admin_findById);


module.exports = router;
