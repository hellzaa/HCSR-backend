var PharmacyData = require('../model/pharmacyProfileModel.js');

module.exports.get_pharmacy_profile=function(req, res,next){
	PharmacyData.get_pharmacy_profile(req, function(err,pharmacy)
{

	if(err)
		res.send(err);
	console.log('res',pharmacy);
res.send(pharmacy);
});
};

module.exports.edit_pharmacy_profile=function(req,res){
PharmacyData.edit_pharmacy_profile(req, new PharmacyData(req.body), function(err,pharmacy){
if(err)
 res.send(err);
res.json(pharmacy);
});

};

