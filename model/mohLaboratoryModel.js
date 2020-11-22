'use strict';
var db = require('../server/db/index');
var jwt= require('jsonwebtoken');

//Laboratory object create
var Laboratory = function(laboratory){
this.LabName         = laboratory.LabName;
this.Type            = laboratory.Type;
this.Branch          = laboratory.Branch;
this.City            = laboratory.City;
this.Subcity         = laboratory.Subcity;
this.Woreda          = laboratory.Woreda;
this.PhoneNo         = laboratory.PhoneNo;
this.Email           = laboratory.Email;
this.PoBox           = laboratory.PoBox;
this.Latitude        = laboratory.Latitude;
this.Longitude       = laboratory.Longitude;
}


Laboratory.create = (newLaboratory, result) => {
    //var employeedata=jwt.decode(req.params.employeetoken);
    //var instID=employeedata.sessiondata.InstitutionID;
    //console.log(instID);

    db.query("INSERT INTO Laboratory SET ?", newLaboratory, function (err, res) {
        if(err){
            console.log("error: ",err);
            result(err,null);
            return;
        }
        else{
            console.log(res.insertId);
            result(null,res.insertId);
        }
    //console.log("Created Laboratory: ", {LabID:res.insertId, ...newLaboratory });
    //result(null, { LabID: res.insertId, ...newLaboratory });
});

};
Laboratory.findById = function (LabID, result) {
    db.query("Select * from Laboratory where LabID = ? ", LabID, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
});

};
Laboratory.findAll = function (result) {
    db.query("Select * from Laboratory", function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      console.log('Laboratory : ', res);
      result(null, res);
    }
});

};

Laboratory.update = function(LabID, laboratory, result){
    db.query("UPDATE Laboratory SET LabName=?,Type=?,Branch=?,City=?,Subcity=?,Woreda=?,PhoneNo=?,Email=?,PoBox=?,Latitude=?,Longitude=? WHERE LabID = ?", [laboratory.LabName,laboratory.Type,laboratory.Branch,laboratory.City,laboratory.Subcity,laboratory.Woreda,laboratory.PhoneNo,laboratory.Email,laboratory.PoBox,laboratory.Latitude,laboratory.Longitude, LabID], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }else{
      result(null, res);
    }
});

};

Laboratory.delete = function(LabID, result){
    db.query("DELETE FROM Laboratory WHERE LabID = ?", [LabID], function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(null, err);
    }
    else{
      result(null, res);
    }
});

};


module.exports = Laboratory;

