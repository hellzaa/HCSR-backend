'use strict';
const Laboratory = require('../model/mohLaboratoryModel');

exports.findAll = function(req, res) {
Laboratory.findAll(function(err, laboratory) {
	console.log('controller')
	if (err)
	res.send(err);
	console.log('res', laboratory);
	res.send(laboratory);
});
};

exports.create = function(req, res) {
const new_laboratory = new Laboratory(req.body);
//handle null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
	res.status(400).send({ error:true, message: 'Please provide all required fields' });
}
else{
	Laboratory.create(new_laboratory, function(err, laboratory){
		if(err)
		res.send(err);
		res.json({error:false, message: "Laboratory added successfully!", data:laboratory});
	});
}
};

exports.findById = function(req, res) {
Laboratory.findById(req.params.LabID, function(err, laboratory) {
	if (err)
	res.send(err);
	res.json(laboratory);
});
};

exports.update = function(req, res) {
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
	res.status(400).send({ error:true, message: 'Please provide all required fields' });
}else{
   Laboratory.update(req.params.LabID, new Laboratory(req.body), function(err, laboratory) {
 if (err)
 res.send(err);
 res.json({ error:false, message: 'Laboratory successfully updated' });
});
}
};

exports.delete = function(req, res) {
Laboratory.delete( req.params.LabID, function(err, laboratory) {
	if (err)
	res.send(err);
	res.json({ error:false, message: 'Laboratory successfully deleted' });
});
};

