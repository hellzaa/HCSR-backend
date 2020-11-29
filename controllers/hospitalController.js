var SpecialistData = require('../model/hospitalModel.js');


module.exports.get_all_specialist = function(req, res,next){
	SpecialistData.get_all_specialist(req, function(err,specialist)
{

	if(err)
		res.send(err);
	//console.log('res', specialist);
res.send(specialist);

});
}


module.exports.get_specialist = function(req, res,next){
	SpecialistData.get_specialist(req, function(err,specialist)
{

	if(err)
		res.send(err);
	//console.log('res', specialist);
res.send(specialist);

});
}

module.exports.get_specialist_info = function(req, res,next){

	SpecialistData.get_specialist_info(req, function(err,specialist)
		{

			if(err)
				res.send(err);
	//console.log('res', specialist);
			res.send(specialist);

		});
};

module.exports.add_new_specialist=function(req, res){
//console.log(req.params.employeetoken);



		SpecialistData.add_new_specialist(req, function(err, specialist)
			{

				if(err)
					res.send(err);
				res.json(specialist);
			});

	

};



module.exports.edit_specialist = function(req,res){
console.log(req.body);
SpecialistData.edit_specialist(req, new SpecialistData(req.body), function(err,specialist){
if(err)
 res.send(err);
res.json(specialist);
});

};

/*
module.exports.notify=function(req,res){
SpecialistData.notify(req, function(err,notification){
if(err)
res.send(err);
//console.log("in controller");
//console.log(notification);
res.send({notification});


});

};*/

module.exports.remove_specialist = function(req,res){
SpecialistData.remove_specialist(req.params.SpecID, function(err,specialist){
if(err)
res.send(err);
res.json({message:"Specialist successfuly deleted"});

});

};


module.exports.search_specialist_request = function(req, res,next){
//console.log(req.params);
	SpecialistData.search_specialist_request(req, function(err,specialist)
		{

			if(err)
				res.send(err);
	console.log('res', specialist);
			res.send(specialist);

		});
};
