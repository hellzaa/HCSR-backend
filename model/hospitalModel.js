var mysql= require('mysql');
var db=require('../server/db');
var jwt= require('jsonwebtoken');
var SpecialistDataRow;
var SpecialistInfo=[];
var SpecialistUpdateRow;
var HospitalData;
//var distance;
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
var database = new Database();

var SpecialistData= function(specialist){
this.Title = specialist.Title;
this.FirstName = specialist.FirstName;
this.LastName = specialist.LastName;
this.Speciality =specialist.Speciality;
this.WorkingDay=specialist.WorkingDay;
this.WorkingHour=specialist.WorkingHour;
}

//Fetch(Get) Inventory... Specialist list
SpecialistData.get_specialist = function(req, result){
const employeedata=jwt.decode(req.params.employeetoken);
const instID=employeedata.sessiondata.Hospital;
console.log(instID);
db.query('select * from SpecialistWorksIn inner join Specialist ON Specialist.SpecID = SpecialistWorksIn.SpecID where HospID = ?',instID, function(err,res){
if(err)
{
console.log(err);
result(err,null);
}
else{
console.log(res);
result(null,res);
}
});
};

SpecialistData.get_all_specialist= function(req, result){
db.query('select SpecID, Title, FirstName, LastName, Speciality from Specialist', function(err,res){
for(var i=0; i<res.length; i++)
	SpecialistInfo.push({SpecID: res[i]["SpecID"], SpecialistInfo: res[i]["Title"].concat(" ").concat(res[i]["FirstName"]).concat(" ").concat(res[i]["LastName"]), Speciality: res[i]["Speciality"]})
console.log(SpecialistInfo);

result(null,SpecialistInfo);
});
};


//Get specialist info
SpecialistData.get_specialist_info= function(req, result){
const employeedata=jwt.decode(req.params.employeetoken);
const instID=employeedata.sessiondata.InstitutionID;
const specialistData=jwt.decode(req.params.specialisttoken);
const SpecID=specialistData.row.SpecID;
var IDs=[SpecID,instID, SpecID];
db.query('select * from SpecialistWorksIn inner join Specialist ON Specialist.SpecID= ? AND SpecialistWorksIn.PharmacyId = ? AND SpecialistWorksIn.SpecID= ?',IDs, function(err,res){

console.log("here are the results" + res);

result(null,res);
});
};

//Add new specialist
SpecialistData.add_new_specialist= function(req, result){
var SpecInfo=req.body;
var employeedata=jwt.decode(req.params.employeetoken);
console.log(employeedata);
var userID=employeedata.sessiondata.userID;
var instID=employeedata.sessiondata.Hospital;
console.log(instID);
console.log(userID);
var HospSpecialistID;

console.log(SpecInfo);
var check=[SpecInfo["SpecialistInfo"].split(" ")[0],SpecInfo["SpecialistInfo"].split(" ")[1],SpecInfo["SpecialistInfo"].split(" ")[2]];
console.log(check);
database.query("Select SpecID from Specialist where Title = ? AND FirstName = ? AND LastName = ?", check).then(rows=>{
	console.log("found specialist");
	console.log(rows);
	
	console.log(rows.length);
	/*if(rows.length===0)
	{
	
	 database.query('select Hospital from User where UserID =?',userID)
		.then(rows=>{


	var values=[23,newSpecialist.Title, newSpecialist.FirstName, newSpecialist.LastName, newSpecialist.Speciality];

		return database.query( 'INSERT INTO Specialist (SpecID, Title, FirstName, LastName, Speciality) VALUES (?,?,?,?,?)',values );

		}).then(rows=>{
			var value=[instID, 23, newSpecialist.WorkingDay, newSpecialist.WorkingHour];
			console.log(instID)
			console.log(userID);
		 return database.query('INSERT INTO SpecialistWorksIn (HospID, SpecID, WorkingDay, WorkingHour) VALUES (?,?,?,?)',value )
			if(err)
				{
					console.log(err);
					SpecialistDataRow=err;
				}
				else
				{
					SpecialistDataRow = rows;
				}
		}).then(()=>{
					console.log(SpecialistDataRow);
					result(null, SpecialistDataRow);

		});

	}

	*///else{

console.log("here is the ID of the exisiting specialist");
HospSpecialistID=rows[0].SpecID;
console.log(HospSpecialistID);
	

	
		

		var value=[instID, HospSpecialistID, SpecInfo["WorkingDay"], SpecInfo["WorkingHour"]];
		database.query('INSERT INTO SpecialistWorksIn (HospID, SpecID, WorkingDay, WorkingHour) VALUES (?,?,?,?)',value ).then(rows=>{
			
					SpecialistDataRow=rows;
				
		}).then(()=>{
					console.log(SpecialistDataRow);
					result(null, SpecialistDataRow);

		});
	


		
	//}
});




};

//Edit specialist data
SpecialistData.edit_specialist=function(req,newSpecialist,result){
var specialistData=jwt.decode(req.params.specialisttoken);
var SpecID=specialistData.row.SpecID;
var userData=jwt.decode(req.params.employeetoken);
var instID=userData.sessiondata.InstitutionID;
console.log(newSpecialist);
var values=[newSpecialist.FirstName, newSpecialist.LastName, newSpecialist.Speciality, SpecID];
database.query( 'UPDATE Specialist SET FirstName =?, LastName =?, Speciality =? WHERE SpecID =?',[newSpecialist.FirstName, newSpecialist.LastName, newSpecialist.Speciality, SpecID] ).then(rows=>{

 return database.query('UPDATE SpecialistWorksIn SET WorkingDay =?, WorkingHour =? WHERE HospID =? AND SpecID =?',[newSpecialist.WorkingDay, newSpecialist.WorkingHour, instID, SpecID] )
if(err)
{
console.log(err);
SpecialistUpdateRow=err;
}
else{
SpecialistUpdateRow=rows;

}
}).then(()=>{
result(null,SpecialistUpdateRow);

});


};
/*
//Notification
SpecialistData.notify=function(req,result){
var employeedata=jwt.decode(req.params.employeetoken);
console.log(employeedata);
var userID=employeedata.sessiondata.userID;
var instID=employeedata.sessiondata.InstitutionID;
database.query('SELECT SpecID FROM SpecialistWorksIn WHERE Amount < 5 AND PharmacyID=?',instID).then(rows=>{
console.log(rows.length);
for( var i=0; i< rows.length; i++)
{
 
      return database.query('Select FirstName From Specialist WHERE  SpecID =? ',rows[i].SpecID);
}
}).then(rows=>{

SpecialistUpdateRow=rows;
})



.then(()=>{
console.log(SpecialistUpdateRow);
result(null,SpecialistUpdateRow);

});


};
*/
//Delete specialist
SpecialistData.remove_specialist = function(id,result){
db.query( 'DELETE FROM Specialist WHERE SpecID = 54' , function(err,res){
if(err){
console.log("error: ",err);
result(null,err);

}else{
result(null,res);
}
});



};

//Search specialist
SpecialistData.search_specialist_request= function(req, result){

const Title = req.params.Title;
const FirstName = req.params.FirstName;
const LastName = req.params.LastName;
//const Lat = req.params.lat;
//const Long = req.params.long;
console.log(Title);
console.log(FirstName);
console.log(LastName);
if(FirstName === null)
{
HospitalData={error:"enter a search item!"};
results(null,);

}
else{
//console.log(FirstName);
database.query('select SpecID from Specialist WHERE Title = ? AND FirstName = ? AND LastName =?', Title, FirstName, LastName).then(rows=>{
//c onsole.log(rows[0]);
HospSpecialistID=rows[0].SpecID;
//console.log(HospSpecialistID);
 return database.query('SELECT * FROM `SpecialistWorksIn` JOIN Hospital WHERE SpecialistWorksIn.SpecID=? and SpecialistWorksIn.HospID = Hospital.HospID', HospSpecialistID);
}).then(rows=>{
var distance={};
HospitalData={};
//distance.clear();
for(var p in rows)
{
  
   
   distance[p]=Math.sqrt(Math.pow((Lat-rows[p].Latitiude),2)+Math.pow((Long-rows[p].Longitude),2));
  
}
HospitalData={"HospitalData": rows, "distance": distance};
console.log(distance);


//console.log(rows[0]);
}).then(()=>{
console.log(HospitalData);
result(null,HospitalData);
});
}

};


module.exports = SpecialistData;
