'use strict';
var db = require('../server/db/index');
var jwt= require('jsonwebtoken');

//Hospital object create
var Hospital = function(hospital){
this.HospitalName    = hospital.HospitalName;
this.City            = hospital.City;
this.Subcity         = hospital.Subcity;
this.Woreda          = hospital.Woreda;
this.Referral        = hospital.Referral;
this.Website         = hospital.Website;
this.PhoneNo         = hospital.PhoneNo;
this.Email           = hospital.Email;
this.PoBox           = hospital.PoBox;
this.Latitude        = hospital.Latitude;
this.Longitude       = hospital.Longitude;
}


Hospital.create = (newHospital, result) => {
    //var employeedata=jwt.decode(req.params.employeetoken);
    //var instID=employeedata.sessiondata.InstitutionID;
    //console.log(instID);

    db.query("INSERT INTO Hospital SET ?", newHospital, function (err, res) {
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
Hospital.findById = function (HospID, result) {
    db.query("Select * from Hospital where HospID = ? ", HospID, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
});

};
Hospital.findAll = function (result) {
    db.query("Select * from Hospital", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('Hospital : ', res);
      result(null, res);
    }
});

};

Hospital.update = function(HospID, hospital, result){
    db.query("UPDATE Hospital SET HospitalName=?,City=?,Subcity=?,Woreda=?,Referral=?,Website=?,PhoneNo=?,Email=?,PoBox=?,Latitude=?,Longitude=? WHERE HospID = ?", [hospital.HospitalName,hospital.City,hospital.Subcity,hospital.Woreda,hospital.Referral,hospital.Website,hospital.PhoneNo,hospital.Email,hospital.PoBox,hospital.Latitude,hospital.Longitude, HospID], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
});

};

Hospital.delete = function(HospID, result){
    db.query("DELETE FROM Hospital WHERE HospID = ?", [HospID], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
});

};


module.exports = Hospital;

