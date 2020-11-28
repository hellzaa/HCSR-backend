const express = require('express')
const router = express.Router()
const mohLaboratoryController = require('../controllers/mohLaboratoryController');
const userController = require('../controllers/userController');

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


//create an admin
router.post('/addadmin', userController.add_laboratory_admin);
router.put('/editadmin/:UserID', userController.laboratory_admin_update);


module.exports = router;
