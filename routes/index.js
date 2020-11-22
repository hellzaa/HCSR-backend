var express = require('express');
var router = express.Router();
var db= require('../server/db');
var middlewear= require('../middlewear/middlewear');
var pharmacyController=require('../controllers/pharmacyController');
var userController=require('../controllers/userController');
var specialistController=require('../controllers/specialistController');
var pharmacyProfileController=require('../controllers/pharmacyProfileController');
var laboratoryController = require('../controllers/laboratoryController');
var laboratoryProfileController = require('../controllers/laboratoryProfileController');
var hospitalController = require('../controllers/hospitalController');
var hospitalProfileController = require('../controllers/hospitalProfileController');

router.post('/login',userController.get_login_info);
//router.post('/loginpatient/:username',userController.get_login_patient);
//router.post('/signup',userController.add_new_user_patient);
router.post('/pharmacy/addnewuserprofile', userController.add_new_user);
//router.get('/pharmacy/pharmacylogin',employeeController.get_login_info);

router.get('/pharmacy/inventory/:employeetoken', pharmacyController.get_inventory);

router.post('/pharmacy/addnewmedicine/:employeetoken',pharmacyController.add_new_medicine);

router.get('/pharmacy/medinfo/:employeetoken/:medtoken', pharmacyController.get_med_info);


router.put('/pharmacy/editmeddata/:employeetoken/:medtoken', pharmacyController.edit_medicine);
router.delete('/pharmacy/removemedicinedata', pharmacyController.remove_medicine);



router.get('/pharmacy/employeeinfo/:employeetoken', userController.get_profile);
router.put('/pharmacy/adminprofile:employeetoken/',userController.edit_employee_profile);
router.put('/pharmacy/adminprofile/:employeetoken',userController.edit_profile);
router.get('/pharmacy/employeerecord/:employeetoken', userController.get_employee_record);
router.post('/pharmacy/addnewemployee/:employeetoken',userController.add_new_employee);
//router.delete('/pharmacy/removeemloyeeprofile',employeeController.remove_employee_profile);
router.get('/pharmacy/notification/:employeetoken', pharmacyController.notify);

router.get('/pharmacy/pharmacyinfo/:employeetoken', pharmacyProfileController.get_pharmacy_profile);
router.put('/pharmacy/editpharmacyprofile/:employeetoken',pharmacyProfileController.edit_pharmacy_profile);
//router.post('/pharmacy/addnewpharmacyprofile', pharmacyProfileController.add_new_pharmacy);
//router.delete('/pharmacy/removepharmacyprofile',pharmacyProfileController.remove_pharmacy_profile);

router.get('/pharmacy/searchmed/:medname/:lat/:long', pharmacyController.search_med_request);

//################################################################################################################
//################################################################################################################
//################################################################################################################

router.post('/laboratory/addnewuserprofile', userController.add_new_user);
//router.get('/pharmacy/pharmacylogin',employeeController.get_login_info);

router.get('/laboratory/labtest/:employeetoken', laboratoryController.get_labtest);

router.post('/laboratory/addnewlabtest/:employeetoken', laboratoryController.add_new_labtest);

router.get('/laboratory/labtestinfo/:employeetoken/:labtesttoken', laboratoryController.get_labtest_info);


router.put('/laboratory/editlabtest/:employeetoken/:labtesttoken', laboratoryController.edit_labtest);
router.delete('/laboratory/removelabtest', laboratoryController.remove_labtest);

router.get('/laboratory/employeeinfo/:employeetoken', userController.get_profile);
router.put('/laboratory/adminprofile:employeetoken/',userController.edit_employee_profile);
router.put('/laboratory/adminprofile/:employeetoken',userController.edit_profile);
router.get('/laboratory/employeerecord/:employeetoken', userController.get_employee_record);
router.post('/laboratory/addnewemployee/:employeetoken',userController.add_new_employee);
//router.delete('/pharmacy/removeemloyeeprofile',employeeController.remove_employee_profile);
//router.get('/laboratory/notification/:employeetoken', laboratoryController.notify);

router.get('/laboratory/laboratoryinfo/:employeetoken', laboratoryProfileController.get_laboratory_profile);
router.put('/laboratory/editlaboratoryprofile/:employeetoken',laboratoryProfileController.edit_laboratory_profile);
//router.post('/laboratory/addnewlaboratoryprofile', laboratoryProfileController.add_new_laboratory);
//router.delete('/laboratory/removelaboratoryprofile', laboratoryProfileController.remove_laboratory_profile);

router.get('/laboratory/searchlabtest/:labtestname/:lat/:long', laboratoryController.search_labtest_request);


//################################################################################################################
//################################################################################################################
//################################################################################################################

router.post('/hospital/addnewuserprofile', userController.add_new_user);
//router.get('/pharmacy/pharmacylogin',employeeController.get_login_info);

router.get('/hospital/specialist/:employeetoken', hospitalController.get_specialist);

router.post('/hospital/addnewspecialist/:employeetoken', hospitalController.add_new_specialist);

router.get('/hospital/specialistinfo/:employeetoken/:specialisttoken', hospitalController.get_specialist_info);


router.put('/hospital/editspecialist/:employeetoken/:specialisttoken', hospitalController.edit_specialist);
router.delete('/hospital/removespecialist', hospitalController.remove_specialist);

router.get('/hospital/employeeinfo/:employeetoken', userController.get_profile);
router.put('/hospital/adminprofile:employeetoken/',userController.edit_employee_profile);
router.put('/hospital/adminprofile/:employeetoken',userController.edit_profile);
router.get('/hospital/employeerecord/:employeetoken', userController.get_employee_record);
router.post('/hospital/addnewemployee/:employeetoken',userController.add_new_employee);
//router.delete('/pharmacy/removeemloyeeprofile',employeeController.remove_employee_profile);
//router.get('/laboratory/notification/:employeetoken', laboratoryController.notify);

router.get('/hospital/hospitalinfo/:employeetoken', hospitalProfileController.get_hospital_profile);
router.put('/hospital/edithospitalprofile/:employeetoken',hospitalProfileController.edit_hospital_profile);
//router.post('/laboratory/addnewlaboratoryprofile', laboratoryProfileController.add_new_laboratory);
//router.delete('/laboratory/removelaboratoryprofile', laboratoryProfileController.remove_laboratory_profile);

router.get('/laboratory/searchlabtest/:labtestname/:lat/:long', laboratoryController.search_labtest_request);




router.post('/moh/addmohuser', userController.add_moh_user);
router.post('/moh/addpharmacyadmin/:PharmacyID', userController.moh_add_pharmacy_admin);

/////////////////////////////////////////////////////////////////////////////////////
router.post('/loginpatient',userController.get_login_patient);

router.post('/signup',userController.add_new_user_patient);

router.get('/pharmacy/searchmed/:medname', pharmacyController.search_med_request);
router.get('/labratory/searchlabtest/:labtestname', laboratoryController.search_labtest_request);
router.get('/specialist/searchspeciality/:specialityname', specialistController.search_specialist_request);
router.get('/specialist/:specialist', specialistController.get_specialist_request);

router.get('/pharmacy/searchpharmacy/:pharmacyname', pharmacyController.search_pharmacy_request);
router.post('/pharmacy/rate/pharmacy',pharmacyController.rate_pharmacy);
router.post('/pharmacy/writereview',pharmacyController.write_review_pharmacy);

router.get('/pharmacy/readreviews/:pharmacyID', pharmacyController.read_reviews_pharmacy);


router.get('/pharmacy/toprated', pharmacyController.get_top_rated);
router.get('/lab/toprated', laboratoryController.get_top_rated);

router.get('/lab/searchlab/:labname', laboratoryController.search_lab_request);
router.post('/lab/rate',laboratoryController.rate_lab);
router.post('/lab/writereview',laboratoryController.write_review_lab);

router.get('/lab/readreviews/:labID', laboratoryController.read_reviews_lab);

router.post('/updatepatinetprofile',userController.edit_patient_profile);



router.get('/specialist/spec/toprated', specialistController.get_top_rated);

router.get('/specialist/searchspec/:specname', specialistController.search_spec_request);
router.post('/specialist/rate',specialistController.rate_spec);
router.post('/specialist/writereview',specialistController.write_review_spec);

router.get('/specialist/readreviews/:specID', specialistController.read_reviews_spec);












module.exports = router;

