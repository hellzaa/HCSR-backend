var MedicineData=require('../model/pharmacyModel.js');

module.exports.get_inventory=function(req, res,next){
	MedicineData.get_inventory(req, function(err,medicine)
{

	if(err)
		res.send(err);
	//console.log('res', medicine);
res.send(medicine);

});
}

module.exports.get_med_info=function(req, res,next){

	MedicineData.get_med_info(req, function(err,medicine)
		{

			if(err)
				res.send(err);
	//console.log('res', medicine);
			res.send(medicine);

		});
};

module.exports.add_new_medicine=function(req, res){
//console.log(req.params.employeetoken);


var new_medicine= new MedicineData(req.body);
if(!new_medicine.GenericName||!new_medicine.Amount||!new_medicine.Price)
	{

		res.status(400).send({error: true, message:"enter amount and price"});
	}
else	{

		MedicineData.add_new_medicine(req, new_medicine, function(err, medicine)
			{

				if(err)
					res.send(err);
				res.json(medicine);
			});

	}

};



module.exports.edit_medicine=function(req,res){
console.log(req.body);
MedicineData.edit_medicine(req, new MedicineData(req.body), function(err,medicine){
if(err)
 res.send(err);
res.json(medicine);
});

};


module.exports.notify=function(req,res){
MedicineData.notify(req, function(err,notification){
if(err)
res.send(err);
//console.log("in controller");
//console.log(notification);
res.send({notification});


});

};

module.exports.remove_medicine=function(req,res){
MedicineData.remove_medicine(req.params.MedID, function(err,medicine){
if(err)
res.send(err);
res.json({message:"successfuly deleted"});

});

};



/////////////////////////////////////////////////////////////////////////////////
module.exports.search_med_request=function(req, res,next){
//console.log(req.params);
	MedicineData.search_med_request(req, function(err,medicine)
		{

			if(err)
				res.send(err);
	console.log('res', medicine);
			res.send(medicine);

		});

};
module.exports.search_pharmacy_request=function(req, res,next){
//console.log(req.params);
	MedicineData.search_pharmacy_request(req, function(err,pharmacy)
		{

			if(err)
				res.send(err);
	console.log('res', pharmacy);
			res.send(pharmacy);

		});
};



module.exports.rate_pharmacy=function(req, res){
//console.log(req.params);

	MedicineData.rate_pharmacy(req, req.body, function(err,pharmacy)
		{

			if(err)
				res.send(err);
	console.log('res', pharmacy);
			res.send(pharmacy);

		});
};



module.exports.write_review_pharmacy=function(req, res){
//console.log(req.params);

	MedicineData.write_review_pharmacy(req, req.body, function(err,pharmacy)
		{

			if(err)
				res.send(err);
	console.log('res', pharmacy);
			res.send(pharmacy);

		});
};



module.exports.read_reviews_pharmacy=function(req, res){
//console.log(req.params);

	MedicineData.read_reviews_pharmacy(req, function(err,reviews)
		{

			if(err)
				res.send(err);
	console.log('res', reviews);
			res.send(reviews);

		});
};


module.exports.get_top_rated=function(req, res){


	MedicineData.get_top_rated(req, function(err,toprated)
		{

			if(err)
				res.send(err);
	console.log('res', toprated);
			res.send(toprated);

		});
};

