const express = require('express')
const router = express.Router()
const mohHospitalController = require('../controllers/mohHospitalController');

//Retrieve all hospitals
router.get('/get', mohHospitalController.findAll);

//Create a new Hospital
router.post('/add', mohHospitalController.create);

//Retrieve a single Hospital with id
router.get('/get/:HospID', mohHospitalController.findById);

//Update a hospital with id
router.put('/edit/:HospID', mohHospitalController.update);

//Delete a hospital with id
router.delete('/delete/:HospID', mohHospitalController.delete);


module.exports = router;
