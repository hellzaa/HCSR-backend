var mysql= require('mysql');
var db=require('../server/db');
var jwt= require('jsonwebtoken');
var specialityDataRow;
var specialityUpdateRow;
var SpecialistData;
//var IntegratedHopsSpecData;
var distance;
class Database {
    constructor( ) {
        this.connection = mysql.createConnection( { password: '' , user: 'root' , database: 'HCSR' , host: 'localhost', port:'3307'});
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err )
                    return reject( err );
                resolve( rows );
            } );
        } );
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err )
                    return reject( err );
                resolve();
            } );
        } );
    }
}
var database=new Database();

var SpecialistData= function(specialist){
this.SpecialistName= specialist.specialistName;


}

////////////////////////////////////////////////////////////////////////////////////////////////

SpecialistData.search_specialist_request= function(req, result){

const SpecialityName=req.params.specialityname;
const Lat=req.params.lat;
const Long=req.params.long;
console.log(SpecialityName);
console.log(Lat);
console.log(Long);
if(SpecialityName===null)
{
SpecialistData={error:"enter a search item!"};
results(null,);

}
else
	{
obj=[];
HospitalData=[];
HospitalDataT=[];
AD=[];	
		database.query('select * from Specialist WHERE Speciality = ?',SpecialityName).then(rows=>{
obj=rows;
}).then(()=>{//query specialists
//console.log(obj);
result(null, obj);
});

	}

};

SpecialistData.get_specialist_request= function(req, result){

const SpecID=req.params.specialist;
//console.log(SpecID);
if(SpecID===null)
{
SpecialistData={error:"enter a search item!"};
results(null,);

}
else
	{
obj=[];
database.query('SELECT * FROM `SpecialistWorksIn` JOIN Hospital ON SpecialistWorksIn.SpecID=? and Hospital.HospID=SpecialistWorksIn.HospID', SpecID).then(
rows=>{
obj=rows;
}).then(()=>{
result(null, obj);
});
	}

};




SpecialistData.get_top_rated= function(req, result){

var toprated;
database.query('select * from Specialist where Rating>=?',4).then(rows=>{
toprated=rows;
		}).then(()=>{
			console.log(toprated);	
result(null,toprated);	
		});
	


};


SpecialistData.rate_spec= function(req, rating, result){
var value=[rating["userID"], rating["specID"]];
var sum=0;
var ratingValue=0;
//console.log(value);
var values=[rating["userID"], rating["specID"], rating["rating"]];
console.log(values);
database.query('select * from RatesSpecialist where PatientID=? and SpecID=? ',value ).then(rows=>{

if(rows.length!=0)
{
database.query('UPDATE RatesSpecialist SET Rating=? WHERE PatientID=? and SpecID=? ',[ rating["rating"],rating["userID"], rating["specID"]] ).then(rows=>{

		database.query('Select * from RatesSpecialist where SpecID=?', rating["specID"]).then(rows=>{
			for(var i=0; i<rows.length; i++)
				{
					sum+=rows[i].Rating;
	//console.log(rows[i]);
				}


		ratingValue=Math.ceil(sum/rows.length);
		database.query("Update Specialist set Rating=? where SpecID=?",[ratingValue, rating["specID"]]).then(()=>{});



	});


	});
}
else
{
database.query('INSERT INTO RatesSpecialist (Rating, PatientID, SpecID) VALUES(?,?,?) ',[ rating["rating"],rating["userID"], rating["specID"]] ).then(rows=>{

		database.query('Select * from RatesSpecialist where SpecID=?', rating["specID"]).then(rows=>{
			for(var i=0; i<rows.length; i++)
				{
					sum+=rows[i].Rating;
	//console.log(rows[i]);
				}


		ratingValue=Math.ceil(sum/rows.length);
		database.query("Update Specialist set Rating=? where SpecID=?",[ratingValue, rating["specID"]]).then(()=>{});



	});


	});





}

	
				
		}).then(()=>{
					
		});
	


};



SpecialistData.write_review_spec= function(req, comment, result){
var value=[comment["userID"], comment["specID"]];
//console.log(value);
var values=[comment["userID"], comment["specID"], comment["comment"]];
//console.log(values);
database.query('select * from RatesSpecialist where PatientID=? and SpecID=? ',value ).then(rows=>{
		if(rows.length===0)
{
database.query('INSERT INTO RatesSpecialist (PatientID, SpecID, Comment) VALUES (?,?,?) ',values ).then(rows=>{
});

}
else 
{
database.query('UPDATE RatesSpecialist SET Comment=? WHERE PatientID=? and SpecID=? ',[ comment["comment"],comment["userID"], comment["specID"]] ).then(rows=>{
});

}	
				
		}).then(()=>{
					
		});
	


};

SpecialistData.read_reviews_spec= function(req, result){
console.log(req.params);
var reviews;
database.query('select * from RatesSpecialist inner join User where SpecID=? and User.UserID=RatesSpecialist.PatientID',req.params.specID ).then(rows=>{
reviews=rows;
		}).then(()=>{
			//console.log(reviews);	
result(null,reviews);	
		});
	


};


SpecialistData.search_spec_request= function(req, result){
const specName=req.params.specname;
var specData={};
if(specName===null)
{
result(null);
}
else{
database.query('select * FROM Specialist where Firstname=?', specName).then(rows=>{
specData=rows;
//console.log(pharmacyData);
result(null,specData);
});

}

//INSERT INTO RatesPharmacy (PatientID, PharmacyID, Rating) VALUES (?,?,?)

};











module.exports=SpecialistData;
