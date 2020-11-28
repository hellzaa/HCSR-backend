const express = require('express')
const router = express.Router()
const mohPharmacyController = require('../controllers/mohPharmacyController');
const userController = require('../controllers/userController');

//Retrieve all pharmacies
router.get('/get', mohPharmacyController.findAll);

//Create a new Pharmacy
router.post('/add', mohPharmacyController.create);

//Retrieve a single pharmacy with id
router.get('/get/:PharmacyID', mohPharmacyController.findById);

//Update a pharmacy with id
router.put('/edit/:PharmacyID', mohPharmacyController.update);

//Delete a pharmacy with id
router.delete('/delete/:PharmacyID', mohPharmacyController.delete);

//create an admin
router.post('/addadmin', userController.add_pharmacy_admin);
router.put('/editadmin/:UserID', userController.pharmacy_admin_update);

module.exports = router;
