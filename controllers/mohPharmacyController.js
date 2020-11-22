'use strict';
const Pharmacy = require('../model/mohPharmacyModel');
const User = require('../model/mohPharmacyModel');

exports.findAll = function(req, res) {
Pharmacy.findAll(function(err, pharmacy) {
	console.log('controller')
	if (err)
	res.send(err);
	console.log('res', pharmacy);
	res.send(pharmacy);
});
};

exports.create = function(req, res) {
const new_pharmacy = new Pharmacy(req.body);
//handle null error
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
	res.status(400).send({ error:true, message: 'Please provide all required fields' });
	console.log('Please fill in all the required fields.');
}
else{
	Pharmacy.create(new_pharmacy, function(err, pharmacy){
		if(err)
		res.send(err);
		res.json({error:false, message: "Pharmacy added successfully!", data:pharmacy});
		console.log('Pharmacy added successfully!');
	});
}
};

exports.findById = function(req, res) {
Pharmacy.findById(req.params.PharmacyID, function(err, pharmacy) {
	if (err)
	res.send(err);
	res.json(pharmacy);
});
};

exports.update = function(req, res) {
	//console.log("!!!!1st Pharmacy ID!!!");
	//console.log(req.params.PharmacyID);
if(req.body.constructor === Object && Object.keys(req.body).length === 0){
	res.status(400).send({ error:true, message: 'Please provide all required fields' });
}else{
   Pharmacy.update(req.params.PharmacyID, new Pharmacy(req.body), function(err, pharmacy) {
 if (err)
 res.send(err);
 //console.log("Pharmacy ID is...");
 console.log(req.params.PharmacyID);
 res.json({ error:false, message: 'Pharmacy successfully updated' });
});
}
};

exports.delete = function(req, res) {
Pharmacy.delete( req.params.PharmacyID, function(err, pharmacy) {
	if (err)
	res.send(err);
	res.json({ error:false, message: 'Pharmacy successfully deleted' });
});
};

exports.add_admin = function(req,res) {
	console.log("My Pharmacy ID is....");
	console.log(req.params.PharmacyID);

	
	const new_user = new User(req.body);
	//handle null error
	var pharmacyID = req.params.PharmacyID;
	//console.log(pharmacyID);
	if(req.body.constructor === Object && Object.keys(req.body).length === 0){
		res.status(400).send({ error:true, message: 'Please provide all required fields' });
		console.log('Please fill in all the required fields.');
	}
	else{
		User.add_admin(pharmacyID, new_user, function(err, new_user){
			if(err)
			res.send(err);
			else{
			console.log("@@@@@@@@@@@@@@    Pharmacy ID is    @@@@@@@@@@");
			console.log(req.params.PharmacyID);
			console.log("User Added is....");
			console.log(new_user.Firstname);
			res.json({error:false, message: "User added successfully!", data:new_user});
			console.log('User added successfully!');}
	});
}
};

