'use strict';
const Hospital = require('../model/mohHospitalModel');

exports.findAll = function(req, res) {
Hospital.findAll(function(err, hospital) {
	console.log('controller')
	if (err)
	res.send(err);
	console.log('res', hospital);
	res.send(hospital);
});
};

exports.create = function(req, res) {
const new_hospital = new Hospital(req.body);
//handle null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
	res.status(400).send({ error:true, message: 'Please provide all required fields' });
}
else{
	Hospital.create(new_hospital, function(err, hospital){
		if(err)
		res.send(err);
		res.json({error:false, message: "Hospital added successfully!", data:hospital});
	});
}
};

exports.findById = function(req, res) {
Hospital.findById(req.params.HospID, function(err, hospital) {
	if (err)
	res.send(err);
	res.json(hospital);
});
};

exports.update = function(req, res) {
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
	res.status(400).send({ error:true, message: 'Please provide all required fields' });
}else{
   Hospital.update(req.params.HospID, new Hospital(req.body), function(err, hospital) {
 if (err)
 res.send(err);
 res.json({ error:false, message: 'Hospital successfully updated' });
});
}
};

exports.delete = function(req, res) {
Hospital.delete( req.params.HospID, function(err, hospital) {
	if (err)
	res.send(err);
	res.json({ error:false, message: 'Hospital successfully deleted' });
});
};

