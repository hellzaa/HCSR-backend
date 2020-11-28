const express = require('express')
const router = express.Router()
const mohHospitalController = require('../controllers/mohHospitalController');
const userController = require('../controllers/userController');

//Retrieve all hospitals
router.get('/get', mohHospitalController.findAll);

//Create a new Hospital
router.post('/add', mohHospitalController.create);
//create an admin
router.post('/addadmin', userController.add_hospital_admin);

//Retrieve a single Hospital with id
router.get('/get/:HospID', mohHospitalController.findById);

//Update a hospital with id
router.put('/edit/:HospID', mohHospitalController.update);

//Delete a hospital with id
router.delete('/delete/:HospID', mohHospitalController.delete);
router.put('/editadmin/:UserID', userController.hospital_admin_update);


module.exports = router;
