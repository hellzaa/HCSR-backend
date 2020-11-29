var mysql= require('mysql');
var db=require('../server/db');
var jwt= require('jsonwebtoken');
var LabTestDataRow;
var LabTestUpdateRow;
var LaboratoryData;
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

var LabTestData= function(labtest){
this.LabTestName= labtest.LabTestName;
this.Description=labtest.Description;
this.Price=labtest.Price;

}
LabTestData.get_all_labtests= function(req,result){
	//const employeedata=jwt.decode(req.params.employeetoken);
	//const instID=employeedata.sessiondata.Laboratory;
	//console.log(instID);
	db.query('select LabTestName from LabTest', function(err,res){
	if(err)
	{
	console.log(err);
	result(err,null);
	}
	else{
	//console.log(res);
	result(null,res);
	}
	});

}
//Fetch(Get) Inventory... Labtest list
LabTestData.get_labtest= function(req, result){
const employeedata=jwt.decode(req.params.employeetoken);
const instID=employeedata.sessiondata.Laboratory;
console.log(instID);
db.query('select LabTestName, LaboratoryProvides.LabTestID, LaboratoryProvides.Description, Price from LaboratoryProvides inner join LabTest ON LabTest.LabTestID = LaboratoryProvides.LabTestID where LabId = ?',instID, function(err,res){
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

//Get labtest info
LabTestData.get_labtest_info= function(req, result){
const employeedata=jwt.decode(req.params.employeetoken);
const instID=employeedata.sessiondata.InstitutionID;
const labtestData=jwt.decode(req.params.labtesttoken);
const LabTestID=labtestData.row.LabTestID;
var IDs=[LabTestID,instID, LabTestID];
db.query('select * from LaboratoryProvides inner join LabTest ON LabTest.LabTestID= ? AND LaboratoryProvides.LabID = ? AND LaboratoryProvides.LabTestID= ?',IDs, function(err,res){

console.log("here are the results" + res);

result(null,res);
});
};

//Add new labtest
LabTestData.add_new_labtest= function(req, newLabTest, result){

var employeedata=jwt.decode(req.params.employeetoken);
console.log(employeedata);
var userID=employeedata.sessiondata.userID;
var instID=employeedata.sessiondata.Laboratory;
console.log(instID);
console.log(userID);
var LaboratoryTestID;
var check=[newLabTest.LabTestName, newLabTest.Description, newLabTest.Price];
console.log(newLabTest);
database.query("Select LabTestID from LabTest where LabTestName = ? ", check).then(rows=>{
	console.log("found labtest");
	console.log(rows);
	
	console.log(rows.length);
	/*if(rows.length===0)
	{
	
	 database.query('select Laboratory from User where UserID =?',userID)
		.then(rows=>{


	var values=[23,newLabTest.LabTestName, newLabTest.Description];

		return database.query( 'INSERT INTO LabTest (LabTestID, LabTestName, Description) VALUES (?,?,?)',values );

		}).then(rows=>{
			var value=[instID, 23, newLabTest.Description];
			console.log(instID)
			console.log(userID);
		 return database.query('INSERT INTO LaboratoryProvides (LabID, LabTestID, Description) VALUES (?,?,?)',value )
			if(err)
				{
					console.log(err);
					LabTestDataRow=err;
				}
				else
				{
					LabTestDataRow = rows;
				}
		}).then(()=>{
					console.log(LabTestDataRow);
					result(null, LabTestDataRow);

		});

	}
	*/

	//else{

console.log("here is the ID of the exisiting labtest");
LaboratoryTestID=rows[0].LabTestID;
console.log(LaboratoryTestID);
	

	
		

		var value=[instID, LaboratoryTestID, newLabTest.Description, parseFloat(newLabTest.Price)];
		database.query('INSERT INTO LaboratoryProvides (LabID, LabTestID, Description, Price) VALUES (?,?,?,?)',value ).then(rows=>{
			
					LabTestDataRow=rows;
				
		}).then(()=>{
					console.log(LabTestDataRow);
					result(null, LabTestDataRow);

		});
	


		
	//}
});

}
//Edit labtest data
LabTestData.edit_labtest=function(req,newLabTest,result){
var labtestData=jwt.decode(req.params.labtesttoken);
var LabTestID=labtestData.row.LabTestID;
var userData=jwt.decode(req.params.employeetoken);
var instID=userData.sessiondata.InstitutionID;
console.log(newLabTest);
var values=[newLabTest.LabTestName, newLabTest.Description, LabTestID];
database.query( 'UPDATE LabTest SET LabTestName =?, Description =? WHERE LabTestID =?',[newLabTest.LabTestName, newLabTest.Description, LabTestID] ).then(rows=>{

 return database.query('UPDATE LaboratoryProvides SET Description =? WHERE LabID =? AND LabTestID =?',[newLabTest.Description, instID, LabTestID] )
if(err)
{
console.log(err);
LabTestUpdateRow=err;
}
else{
LabTestUpdateRow=rows;

}
}).then(()=>{
result(null,LabTestUpdateRow);

});


};
/*
//Notification
LabTestData.notify=function(req,result){
var employeedata=jwt.decode(req.params.employeetoken);
console.log(employeedata);
var userID=employeedata.sessiondata.userID;
var instID=employeedata.sessiondata.InstitutionID;
database.query('SELECT LabTestID FROM LaboratoryProvides WHERE Amount < 5 AND PharmacyID=?',instID).then(rows=>{
console.log(rows.length);
for( var i=0; i< rows.length; i++)
{
 
      return database.query('Select LabTestName From Medicine WHERE  LabTestID =? ',rows[i].LabTestID);
}
}).then(rows=>{

LabTestUpdateRow=rows;
})



.then(()=>{
console.log(LabTestUpdateRow);
result(null,LabTestUpdateRow);

});


};
*/
//Delete labtest
LabTestData.remove_labtest=function(id,result){
db.query( 'DELETE FROM Medicine WHERE LabTestID = 54' , function(err,res){
if(err){
console.log("error: ",err);
result(null,err);

}else{
result(null,res);
}
});



};

//Search labtest
LabTestData.search_labtest_request= function(req, result){

const LabTestName = req.params.labtestname;
const Lat = req.params.lat;
const Long = req.params.long;
console.log(LabTestName);
console.log(Lat);
console.log(Long);
if(LabTestName === null)
{
LaboratoryData={error:"enter a search item!"};
results(null,);

}
else{
//console.log(LabTestName);
database.query('select LabTestID from LabTest WHERE LabTestName = ?',LabTestName).then(rows=>{
//c onsole.log(rows[0]);
LaboratoryTestID=rows[0].LabTestID;
//console.log(LaboratoryTestID);
 return database.query('SELECT * FROM `LaboratoryProvides` JOIN Laboratory WHERE LaboratoryProvides.LabTestID=? and LaboratoryProvides.LabID = Laboratory.LabID', LaboratoryTestID);
}).then(rows=>{
var distance={};
LaboratoryData={};
//distance.clear();
for(var p in rows)
{
  
   
   distance[p]=Math.sqrt(Math.pow((Lat-rows[p].Latitiude),2)+Math.pow((Long-rows[p].Longitude),2));
  
}
LaboratoryData={"LaboratoryData": rows, "distance": distance};
console.log(distance);


//console.log(rows[0]);
}).then(()=>{
console.log(LaboratoryData);
result(null,LaboratoryData);
});
}

};


////////////////////////////////////////////////////////////////////////////////////////////////////////
LabTestData.search_labtest_request= function(req, result){

const LabTestName=req.params.labtestname;
const Lat=req.params.lat;
const Long=req.params.long;
console.log(LabTestName);
console.log(Lat);
console.log(Long);
if(LabTestName===null)
{
LaboratoryData={error:"enter a search item!"};
results(null,);

}
else{
//console.log(MedName);
database.query('select LabTestID from LabTest WHERE LabTestName = ?',LabTestName).then(rows=>{
//console.log(rows[0]);
LabTestID=rows[0].LabTestID;
 return database.query('SELECT * FROM `LaboratoryProvides` JOIN Laboratory WHERE LaboratoryProvides.LabTestID=? and LaboratoryProvides.LabID=Laboratory.LabID', LabTestID);
}).then(rows=>{
var distance={};
LaboratoryData={};
//distance.clear();
for(var p in rows)
{
  
   
   distance[p]=Math.sqrt(Math.pow((Lat-rows[p].Latitiude),2)+Math.pow((Long-rows[p].Longitude),2));
  
}
LaboratoryData={"LaboratoryData": rows, "distance": distance};
console.log(distance);


//console.log(rows[0]);
}).then(()=>{
console.log(LaboratoryData);
result(null,LaboratoryData);
});
}

};


LabTestData.get_top_rated= function(req, result){

var toprated;
database.query('select * from Laboratory where Rating>=?',4).then(rows=>{
toprated=rows;
		}).then(()=>{
			//console.log(reviews);	
result(null,toprated);	
		});
	


};


LabTestData.rate_lab= function(req, rating, result){
var value=[rating["userID"], rating["labID"]];
var sum=0;
var ratingValue=0;
//console.log(value);
var values=[rating["userID"], rating["labID"], rating["rating"]];
console.log(values);
database.query('select * from RatesLaboratory where PatientID=? and LabID=? ',value ).then(rows=>{

if(rows.length!=0)
{
database.query('UPDATE RatesLaboratory SET Rating=? WHERE PatientID=? and LabID=? ',[ rating["rating"],rating["userID"], rating["labID"]] ).then(rows=>{

		database.query('Select * from RatesLaboratory where LabID=?', rating["labID"]).then(rows=>{
			for(var i=0; i<rows.length; i++)
				{
					sum+=rows[i].Rating;
	//console.log(rows[i]);
				}


		ratingValue=Math.ceil(sum/rows.length);
		database.query("Update Laboratory set Rating=? where LabID=?",[ratingValue, rating["labID"]]).then(()=>{});



	});


	});
}
else
{
database.query('INSERT INTO RatesLaboratory (Rating, PatientID, LabID) VALUES(?,?,?) ',[ rating["rating"],rating["userID"], rating["labID"]] ).then(rows=>{

		database.query('Select * from RatesLaboratory where LabID=?', rating["labID"]).then(rows=>{
			for(var i=0; i<rows.length; i++)
				{
					sum+=rows[i].Rating;
	//console.log(rows[i]);
				}


		ratingValue=Math.ceil(sum/rows.length);
		database.query("Update Laboratory set Rating=? where LabID=?",[ratingValue, rating["labID"]]).then(()=>{});



	});


	});





}

	
				
		}).then(()=>{
					
		});
	


};

LabTestData.write_review_lab= function(req, comment, result){
var value=[comment["userID"], comment["labID"]];
//console.log(value);
var values=[comment["userID"], comment["labID"], comment["comment"]];
//console.log(values);
database.query('select * from RatesLaboratory where PatientID=? and LabID=? ',value ).then(rows=>{
		if(rows.length===0)
{
database.query('INSERT INTO RatesLaboratory (PatientID, LabID, Comment) VALUES (?,?,?) ',values ).then(rows=>{
});

}
else 
{
database.query('UPDATE RatesLaboratory SET Comment=? WHERE PatientID=? and LabID=? ',[ comment["comment"],comment["userID"], comment["labID"]] ).then(rows=>{
});

}	
				
		}).then(()=>{
					
		});
	


};

LabTestData.read_reviews_lab= function(req, result){
console.log(req.params);
var reviews;
database.query('select * from RatesLaboratory inner join User where LabID=? and User.UserID=RatesLaboratory.PatientID',req.params.labID ).then(rows=>{
reviews=rows;
		}).then(()=>{
			//console.log(reviews);	
result(null,reviews);	
		});
	


};


LabTestData.search_lab_request= function(req, result){
const labName=req.params.labname;
var labData={};
if(labName===null)
{
result(null);
}
else{
database.query('select * FROM Laboratory where LabName=?', labName).then(rows=>{
labData=rows;
//console.log(pharmacyData);
result(null,labData);
});

}

//INSERT INTO RatesPharmacy (PatientID, PharmacyID, Rating) VALUES (?,?,?)

};





module.exports=LabTestData;
