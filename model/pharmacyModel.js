var mysql= require('mysql');
var db=require('../server/db');
var jwt= require('jsonwebtoken');
var MedicineDataRow;
var MedicineUpdateRow;
var PharmacyData;
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
var database=new Database();

var MedicineData= function(medicine){
this.GenericName= medicine.GenericName;
this.TradeName=medicine.TradeName;
this.Dosage=medicine.Dosage;
this.Description=medicine.Description;
this.Amount=medicine.Amount;
this.Price=medicine.Price

}

//Fetch(Get) Inventory... Medicine list
MedicineData.get_inventory= function(req, result){
const employeedata=jwt.decode(req.params.employeetoken);
const instID=employeedata.sessiondata.Pharmacy;
console.log(instID);
console.log("Getting inventory...")
db.query('select * from PharmacyContains inner join Medicine ON Medicine.MedID=PharmacyContains.MedID where PharmacyId = ?',instID, function(err,res){
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

//Get medicine info
MedicineData.get_med_info= function(req, result){
const employeedata=jwt.decode(req.params.employeetoken);
const instID=employeedata.sessiondata.Pharmacy;
const medData=jwt.decode(req.params.medtoken);
const MedID=medData.row.MedID;
var IDs=[MedID,instID, MedID];
db.query('select * from PharmacyContains inner join Medicine ON Medicine.MedID= ? AND PharmacyContains.PharmacyID = ? AND PharmacyContains.MedID= ?',IDs, function(err,res){

console.log("here are the results"+res);

result(null,res);
});
};

//Add new medicine
MedicineData.add_new_medicine= function(req, newMedicine, result){

var employeedata=jwt.decode(req.params.employeetoken);
console.log(employeedata);
var UserID=employeedata.sessiondata.UserID;
var instID=employeedata.sessiondata.Pharmacy;
console.log("############################   Add medicine to pharmacy   ###################")
console.log(instID);
console.log(UserID);
var MedicineID;
var check=[newMedicine.GenericName,newMedicine.TradeName,newMedicine.Dosage, newMedicine.Description];
console.log(newMedicine);
database.query("Select MedID from Medicine where GenericName = ? AND TradeName = ? AND Dosage = ? AND Description = ?", check).then(rows=>{
	console.log("found med");
	console.log(rows);
	
	console.log(rows.length);
	if(rows.length === 0)
	{
	
	 database.query('select Pharmacy from User where UserID =?',UserID)
		.then(rows=>{


	var values=[4,newMedicine.TradeName,newMedicine.GenericName,newMedicine.Dosage, newMedicine.Description];

		return database.query( 'INSERT INTO Medicine (MedID, TradeName, GenericName, Dosage, Description) VALUES (?,?,?,?,?)',values );

		}).then(rows=>{
			var value=[instID, 4, newMedicine.Amount, newMedicine.Price];
			console.log(instID);
			console.log(UserID);
		 return database.query('INSERT INTO PharmacyContains (PharmacyID, MedID, Amount, Price) VALUES (?,?,?,?)',value )
			if(err)
				{
					console.log(err);
					MedicineDataRow=err;
				}
				else
				{
					MedicineDataRow=rows;
				}
		}).then(()=>{
					console.log(MedicineDataRow);
					result(null, MedicineDataRow);

		});
		/*.then(rows=>{
			MedicineDataRow=rows;
			}).then(()=>{
			result(null,MedicineDataRow);
			
			});
		*/
		
	}

	else{

console.log("here is the ID of the exisiting med");
MedicineID=rows[0].MedID;
console.log(MedicineID);
	

	
		

		var value=[instID, MedicineID, newMedicine.Amount, newMedicine.Price];
		database.query('INSERT INTO PharmacyContains (PharmacyID, MedID, Amount, Price) VALUES (?,?,?,?)',value ).then(rows=>{
			
					MedcineDataRow=rows;
				
		}).then(()=>{
					console.log(MedicineDataRow);
					result(null, MedicineDataRow);

		});
	


		
	}
});




};

//Edit medicine data
MedicineData.edit_medicine=function(req,newMedicine,result){
var medData=jwt.decode(req.params.medtoken);
var MedID=medData.row.MedID;
var userData=jwt.decode(req.params.employeetoken);
var instID=userData.sessiondata.Pharmacy;
console.log(newMedicine);
var values=[newMedicine.TradeName,newMedicine.GenericName,newMedicine.Dosage, newMedicine.Description, MedID];
database.query( 'UPDATE Medicine SET TradeName =? , GenericName =?, Dosage =?, Description =? WHERE MedID =?',[newMedicine.TradeName,newMedicine.GenericName,newMedicine.Dosage, newMedicine.Description, MedID] ).then(rows=>{

 return database.query('UPDATE PharmacyContains SET Amount =?, Price =? WHERE PharmacyID =? AND MedID =?',[newMedicine.Amount, Price, instID, MedID] )
if(err)
{
console.log(err);
MedicineUpdateRow=err;
}
else{
MedicineUpdateRow=rows;

}
}).then(()=>{
result(null,MedicineUpdateRow);

});


};

//Notification
MedicineData.notify=function(req,result){
var employeedata=jwt.decode(req.params.employeetoken);
console.log(employeedata);
var UserID=employeedata.sessiondata.UserID;
var instID=employeedata.sessiondata.Pharmacy;
database.query('SELECT MedID FROM PharmacyContains WHERE Amount < 5 AND PharmacyID=?',instID).then(rows=>{
console.log(rows.length);
for( var i=0; i< rows.length; i++)
{
 
      return database.query('Select GenericName From Medicine WHERE  MedID =? ',rows[i].MedID);
}
}).then(rows=>{

MedicineUpdateRow=rows;
})



.then(()=>{
console.log(MedicineUpdateRow);
result(null,MedicineUpdateRow);

});


};

//Delete medicine
MedicineData.remove_medicine=function(id,result){
db.query( 'DELETE FROM Medicine WHERE MedID=54' , function(err,res){
if(err){
console.log("error: ",err);
result(null,err);

}else{
result(null,res);
}
});



};

//Search medicine
MedicineData.search_med_request= function(req, result){

const MedName=req.params.medname;
const Lat=req.params.lat;
const Long=req.params.long;
console.log(MedName);
console.log(Lat);
console.log(Long);
if(MedName===null)
{
PharmacyData={error:"enter a search item!"};
results(null,);

}
else{
//console.log(MedName);
database.query('select MedID from Medicine WHERE GenericName = ?',MedName).then(rows=>{
//console.log(rows[0]);
MedicineID=rows[0].MedID;
//console.log(MedicineID);
 return database.query('SELECT * FROM `PharmacyContains` JOIN Pharmacy WHERE PharmacyContains.MedID=? and PharmacyContains.PharmacyID=Pharmacy.PharmacyID', MedicineID);
}).then(rows=>{
var distance={};
PharmacyData={};
//distance.clear();
for(var p in rows)
{
  
   
   distance[p]=Math.sqrt(Math.pow((Lat-rows[p].Latitiude),2)+Math.pow((Long-rows[p].Longitude),2));
  
}
PharmacyData={"PharmacyData": rows, "distance": distance};
console.log(distance);


//console.log(rows[0]);
}).then(()=>{
console.log(PharmacyData);
result(null,PharmacyData);
});
}

};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

MedicineData.search_med_request= function(req, result){

const MedName=req.params.medname;
const Lat=req.params.lat;
const Long=req.params.long;
console.log(MedName);
console.log(Lat);
console.log(Long);
if(MedName===null)
{
PharmacyData={error:"enter a search item!"};
results(null,);

}
else{
//console.log(MedName);
database.query('select MedID from Medicine WHERE GenericName = ?',MedName).then(rows=>{
//console.log(rows[0]);
MedicineID=rows[0].MedID;
//console.log(MedicineID);
 return database.query('SELECT * FROM `PharmacyContains` JOIN Pharmacy WHERE PharmacyContains.MedID=? and PharmacyContains.PharmacyID=Pharmacy.PharmacyID', MedicineID);
}).then(rows=>{
var distance={};
PharmacyData={};
//distance.clear();
for(var p in rows)
{
  
   
   distance[p]=Math.sqrt(Math.pow((Lat-rows[p].Latitiude),2)+Math.pow((Long-rows[p].Longitude),2));
  
}
PharmacyData={"PharmacyData": rows, "distance": distance};
console.log(distance);


//console.log(rows[0]);
}).then(()=>{
console.log(PharmacyData);
result(null,PharmacyData);
});
}

};

MedicineData.search_pharmacy_request= function(req, result){
const pharmName=req.params.pharmacyname;
var pharmacyData={};
if(pharmName===null)
{
result(null);
}
else{
database.query('select * FROM Pharmacy where PharmacyName=?', pharmName).then(rows=>{
pharmacyData=rows;
//console.log(pharmacyData);
result(null,pharmacyData);
});

}

//INSERT INTO RatesPharmacy (PatientID, PharmacyID, Rating) VALUES (?,?,?)

};

MedicineData.rate_pharmacy= function(req, rating, result){
var value=[rating["userID"], rating["pharmacyID"]];
var sum=0;
var ratingValue=0;
//console.log(value);
var values=[rating["userID"], rating["pharmacyID"], rating["rating"]];
console.log(values);
database.query('select * from RatesPharmacies where PatientID=? and PharmacyID=? ',value ).then(rows=>{

if(rows.length!=0)
{
database.query('UPDATE RatesPharmacies SET Rating=? WHERE PatientID=? and PharmacyID=? ',[ rating["rating"],rating["userID"], rating["pharmacyID"]] ).then(rows=>{

		database.query('Select * from RatesPharmacies where PharmacyID=?', rating["pharmacyID"]).then(rows=>{
			for(var i=0; i<rows.length; i++)
				{
					sum+=rows[i].Rating;
	//console.log(rows[i]);
				}


		ratingValue=Math.ceil(sum/rows.length);
		database.query("Update Pharmacy set Rating=? where PharmacyID=?",[ratingValue, rating["pharmacyID"]]).then(()=>{});



	});


	});
}
else
{
database.query('INSERT INTO RatesPharmacies (Rating, PatientID, PharmacyID) VALUES(?,?,?) ',[ rating["rating"],rating["userID"], rating["pharmacyID"]] ).then(rows=>{

		database.query('Select * from RatesPharmacies where PharmacyID=?', rating["pharmacyID"]).then(rows=>{
			for(var i=0; i<rows.length; i++)
				{
					sum+=rows[i].Rating;
	//console.log(rows[i]);
				}


		ratingValue=Math.ceil(sum/rows.length);
		database.query("Update Pharmacy set Rating=? where PharmacyID=?",[ratingValue, rating["pharmacyID"]]).then(()=>{});



	});


	});





}

	
				
		}).then(()=>{
					
		});
	


};

MedicineData.write_review_pharmacy= function(req, comment, result){
var value=[comment["userID"], comment["pharmacyID"]];
//console.log(value);
var values=[comment["userID"], comment["pharmacyID"], comment["comment"]];
//console.log(values);
database.query('select * from RatesPharmacies where PatientID=? and PharmacyID=? ',value ).then(rows=>{
		if(rows.length===0)
{
database.query('INSERT INTO RatesPharmacies (PatientID, PharmacyID, Comment) VALUES (?,?,?) ',values ).then(rows=>{
});

}
else 
{
database.query('UPDATE RatesPharmacies SET Comment=? WHERE PatientID=? and PharmacyID=? ',[ comment["comment"],comment["userID"], comment["pharmacyID"]] ).then(rows=>{
});

}	
				
		}).then(()=>{
					
		});
	


};

MedicineData.read_reviews_pharmacy= function(req, result){
console.log(req.params);
var reviews;
database.query('select * from RatesPharmacies inner join User where PharmacyID=? and User.UserID=RatesPharmacies.PatientID',req.params.pharmacyID ).then(rows=>{
reviews=rows;
		}).then(()=>{
			//console.log(reviews);	
result(null,reviews);	
		});
	


};

MedicineData.get_top_rated= function(req, result){

var toprated;
database.query('select * from Pharmacy where Rating>=?',4).then(rows=>{
toprated=rows;
		}).then(()=>{
			//console.log(reviews);	
result(null,toprated);	
		});
	


};




module.exports=MedicineData;
