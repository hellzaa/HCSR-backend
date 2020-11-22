

module.exports.get_landing= function(req, res,next){
	res.render('landing',{title:'express'});
}
module.exports.submit_landing= function(req, res,next){
	console.log("lead_email:" , req.body.lead_email);
	res.redirect('/');
}
