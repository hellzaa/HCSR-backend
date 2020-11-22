const express = require('express')
const router = express.Router()
const mohPharmacyController = require('../controllers/mohPharmacyController');

//Retrieve all pharmacies
router.get('/get', mohPharmacyController.findAll);

//Create a new Pharmacy
router.post('/add', mohPharmacyController.create);

router.post('/addadmin/:PharmacyID', mohPharmacyController.add_admin);

//Retrieve a single pharmacy with id
router.get('/get/:PharmacyID', mohPharmacyController.findById);

//Update a pharmacy with id
router.put('/edit/:PharmacyID', mohPharmacyController.update);

//Delete a pharmacy with id
router.delete('/delete/:PharmacyID', mohPharmacyController.delete);


module.exports = router;
