'use strict';
var db = require('../server/db/index');
//var bcrypt=require('bcrypt');
//const saltRounds=10;
//var jwt= require('jsonwebtoken');

//Pharmacy object create
var Pharmacy = function(pharmacy){
this.PharmacyName    = pharmacy.PharmacyName;
this.Type            = pharmacy.Type;
this.Branch          = pharmacy.Branch;
this.City            = pharmacy.City;
this.Subcity         = pharmacy.Subcity;
this.Woreda          = pharmacy.Woreda;
this.PhoneNo         = pharmacy.PhoneNo;
this.Email           = pharmacy.Email;
this.PoBox           = pharmacy.PoBox;
this.Latitude        = pharmacy.Latitude;
this.Longitude       = pharmacy.Longitude;
}



Pharmacy.create = (newPharmacy, result) => {
    db.query("INSERT INTO Pharmacy SET ?", newPharmacy, function (err, res) {
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
  
});

};
Pharmacy.findById = function (PharmacyID, result) {
    db.query("Select * from Pharmacy where PharmacyID = ? ", PharmacyID, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
});

};
Pharmacy.findAll = function (result) {
    db.query("Select * from Pharmacy", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('Pharmacy : ', res);
      result(null, res);
    }
});

};

Pharmacy.update = function(PharmacyID, pharmacy, result){
    db.query("UPDATE Pharmacy SET PharmacyName=?,Type=?,Branch=?,City=?,Subcity=?,Woreda=?,PhoneNo=?,Email=?,PoBox=?,Latitude=?,Longitude=? WHERE PharmacyID = ?", [pharmacy.PharmacyName, pharmacy.Type, pharmacy.Branch, pharmacy.City, pharmacy.Subcity, pharmacy.Woreda, pharmacy.PhoneNo, pharmacy.Email, pharmacy.PoBox, pharmacy.Latitude, pharmacy.Longitude, PharmacyID], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
});

};

Pharmacy.delete = function(PharmacyID, result){
    db.query("DELETE FROM Pharmacy WHERE PharmacyID = ?", [PharmacyID], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
});

};



module.exports = Pharmacy;

