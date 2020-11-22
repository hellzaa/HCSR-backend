var LaboratoryData = require('../model/laboratoryProfileModel.js');

module.exports.get_laboratory_profile=function(req, res,next){
	LaboratoryData.get_laboratory_profile(req, function(err,laboratory)
{

	if(err)
		res.send(err);
	console.log('res',laboratory);
res.send(laboratory);
});
};

module.exports.edit_laboratory_profile = function(req,res){
LaboratoryData.edit_laboratory_profile(req, new LaboratoryData(req.body), function(err,laboratory){
if(err)
 res.send(err);
res.json(laboratory);
});

};

