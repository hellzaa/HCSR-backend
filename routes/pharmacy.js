var express = require('express');
var router = express.Router();
var db= require('../server/db');
var home =require('../controllers/home');

router.get('/pharmacy', (req,res,next)=>{
//home.get_home;
res.render('Pharmacy', {title:'Pharmacy'});


});


router.get('/pharmacy/update', (req,res,next)=>{
//home.get_home;
res.render('pharmacyUpdateInventory', {title:'contains'});
res.end("yes");
});

router.post('/pharmacy/update', (req,res,next)=>{
//home.get_home
var GenericName=req.body.GenericName;
var TradeName=req.body.TradeName;
var Dosage=req.body.Dosage;
var Description=req.body.Description;
console.log("GENERIC NAME "+ GenericName);
 let InsertToPharmacyContainsTable = 'INSERT INTO Medicine ( MedID, TradeName, GenericName, Dosage, Description) VALUES (1,"${GenericName}","${TradeName}","${Dosage}","${Description}")';
 
db.query(InsertToPharmacyContainsTable , function(err, results) {
if(err) {console.log(err.message);}
});
res.end("yes");
});

router.get('/pharmacy/checkinventory', (req,res,next)=>{
//home.get_home;
res.render('pharmacyCheckInventory', {title:'contains'});
 let createPharmacyContainsTable = `create table if not exists PharmacyContains(
                          PharmacyID int not null, MedID int not null,Amount int not null)`;
 
db.query(createPharmacyContainsTable, function(err, results) {
if(err) {
console.log(err.message);
}

});


});

router.get('/pharmacy/medicineinfo', (req,res,next)=>{
//home.get_home;
res.render('MedicineInfo', {title:'Medicine Information'});
 let createMedicineInformationTable = `create table if not exists MedicineInformation(
                          MedID int primary key, GenericName varchar(255) not null, TradeName varchar(255) not null, Dosage varchar(255) not null, Description varchar (255) not null)`;
 
db.query(createMedicineInformationTable, function(err, results) {
if(err) {
console.log(err.message);
}

});


});

module.exports =router;
