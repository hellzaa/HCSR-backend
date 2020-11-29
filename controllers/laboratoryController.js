var LabTestData = require('../model/laboratoryModel.js');


module.exports.get_all_labtests = function(req, res,next){
	console.log("recieved req");
		LabTestData.get_all_labtests(req, function(err,labtest)
	{
	
		if(err)
			res.send(err);
		//console.log('res', labtest);
	res.send(labtest);
	
	});
	}


module.exports.get_labtest = function(req, res,next){
	LabTestData.get_labtest(req, function(err,labtest)
{

	if(err)
		res.send(err);
	//console.log('res', labtest);
res.send(labtest);

});
}

module.exports.get_labtest_info = function(req, res,next){

	LabTestData.get_labtest_info(req, function(err,labtest)
		{

			if(err)
				res.send(err);
	//console.log('res', labtest);
			res.send(labtest);

		});
};

module.exports.add_new_labtest=function(req, res){
//console.log(req.params.employeetoken);


var new_labtest = new LabTestData(req.body);
if(!new_labtest.LabTestName||!new_labtest.Description)
	{

		res.status(400).send({error: true, message:"enter description and test name"});
	}
else	{

		LabTestData.add_new_labtest(req, new_labtest, function(err, labtest)
			{

				if(err)
					res.send(err);
				res.json(labtest);
			});

	}

};



module.exports.edit_labtest = function(req,res){
console.log(req.body);
LabTestData.edit_labtest(req, new LabTestData(req.body), function(err,labtest){
if(err)
 res.send(err);
res.json(labtest);
});

};

/*
module.exports.notify=function(req,res){
LabTestData.notify(req, function(err,notification){
if(err)
res.send(err);
//console.log("in controller");
//console.log(notification);
res.send({notification});


});

};*/

module.exports.remove_labtest = function(req,res){
LabTestData.remove_labtest(req.params.LabTestID, function(err,labtest){
if(err)
res.send(err);
res.json({message:"lab test successfuly deleted"});

});

};


module.exports.search_labtest_request = function(req, res,next){
//console.log(req.params);
	LabTestData.search_labtest_request(req, function(err,labtest)
		{

			if(err)
				res.send(err);
	console.log('res', labtest);
			res.send(labtest);

		});
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


module.exports.search_labtest_request=function(req, res,next){
//console.log(req.params);
	LabTestData.search_labtest_request(req, function(err,labtest)
		{

			if(err)
				res.send(err);
	console.log('res', labtest);
			res.send(labtest);

		});
};

module.exports.get_top_rated=function(req, res){


	LabTestData.get_top_rated(req, function(err,toprated)
		{

			if(err)
				res.send(err);
	console.log('res', toprated);
			res.send(toprated);

		});
};


module.exports.search_lab_request=function(req, res,next){
console.log(req.params);
	LabTestData.search_lab_request(req, function(err,lab)
		{

			if(err)
				res.send(err);
	console.log('res', lab);
			res.send(lab);

		});
};



module.exports.rate_lab=function(req, res){
//console.log(req.params);

	LabTestData.rate_lab(req, req.body, function(err,lab)
		{

			if(err)
				res.send(err);
	console.log('res', lab);
			res.send(lab);

		});
};



module.exports.write_review_lab=function(req, res){
//console.log(req.params);

	LabTestData.write_review_lab(req, req.body, function(err,lab)
		{

			if(err)
				res.send(err);
	console.log('res', lab);
			res.send(lab);

		});
};



module.exports.read_reviews_lab=function(req, res){
//console.log(req.params);

	LabTestData.read_reviews_lab(req, function(err,reviews)
		{

			if(err)
				res.send(err);
	console.log('res', reviews);
			res.send(reviews);

		});
};
