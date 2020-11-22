const express = require('express')
const router = express.Router()
const mohLaboratoryController = require('../controllers/mohLaboratoryController');

//Retrieve all laboratories
router.get('/get', mohLaboratoryController.findAll);

//Create a new laboratory
router.post('/add', mohLaboratoryController.create);

//Retrieve a single laboratory with id
router.get('/get/:LabID', mohLaboratoryController.findById);

//Update a laboratory with id
router.put('/edit/:LabID', mohLaboratoryController.update);

//Delete a laboratory with id
router.delete('/delete/:LabID', mohLaboratoryController.delete);


module.exports = router;
