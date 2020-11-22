var HospitalData = require('../model/hospitalProfileModel.js');

module.exports.get_hospital_profile=function(req, res,next){
	HospitalData.get_hospital_profile(req, function(err,hospital)
{

	if(err)
		res.send(err);
	console.log('res',hospital);
res.send(hospital);
});
};

module.exports.edit_hospital_profile = function(req,res){
HospitalData.edit_hospital_profile(req, new HospitalData(req.body), function(err,hospital){
if(err)
 res.send(err);
res.json(hospital);
});

};

