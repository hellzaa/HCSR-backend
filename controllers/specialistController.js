var SpecialistData=require('../model/specialistModel.js');


module.exports.search_specialist_request=function(req, res,next){
//console.log(req.params);
	SpecialistData.search_specialist_request(req, function(err,speciality)
		{

			if(err)
				res.send(err);
console.log("contr");
	console.log(speciality);
			res.send(speciality);

		});
};

module.exports.get_specialist_request=function(req, res,next){
console.log(req.params);
	SpecialistData.get_specialist_request(req, function(err,hospitals)
		{

			if(err)
				res.send(err);
console.log("here");
	console.log(hospitals);
			res.send(hospitals);

		});
};



module.exports.get_top_rated=function(req, res){
console.log('res');

	 SpecialistData.get_top_rated(req, function(err,toprated)
		{

			if(err)
				res.send(err);
	console.log('res', toprated);
			res.send(toprated);

		});
};


module.exports.search_spec_request=function(req, res,next){
console.log(req.params);
	 SpecialistData.search_spec_request(req, function(err,spec)
		{

			if(err)
				res.send(err);
	console.log('res', spec);
			res.send(spec);

		});
};



module.exports.rate_spec=function(req, res){
//console.log(req.params);

	 SpecialistData.rate_spec(req, req.body, function(err,spec)
		{

			if(err)
				res.send(err);
	console.log('res', spec);
			res.send(spec);

		});
};



module.exports.write_review_spec=function(req, res){
console.log(req.body);

	 SpecialistData.write_review_spec(req, req.body, function(err,spec)
		{

			if(err)
				res.send(err);
	console.log('res', spec);
			res.send(spec);

		});
};



module.exports.read_reviews_spec=function(req, res){
//console.log(req.params);

	 SpecialistData.read_reviews_spec(req, function(err,reviews)
		{

			if(err)
				res.send(err);
	console.log('res', reviews);
			res.send(reviews);

		});
};


