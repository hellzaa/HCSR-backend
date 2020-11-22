var mysql= require('mysql');
var db=require('../server/db');
var PharmacyDataRow;
var jwt= require('jsonwebtoken');
var PharmacyUpdateRow;
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

var PharmacyData= function(pharmacy){
this.PharmacyName= pharmacy.PharmacyName;
this.Type= pharmacy.Type;
this.Branch= pharmacy.Branch;
this.City= pharmacy.City;
this.Subcity= pharmacy.Subcity;
this.Woreda= pharmacy.Woreda;
this.PhoneNo= pharmacy.PhoneNo;
this.Email= pharmacy.Email;
this.PoBox= pharmacy.PoBox;
this.Latitude = pharmacy.Latitude;
this.Longitude = pharmacy.Longitude;
}


PharmacyData.get_pharmacy_profile= function(req, result){

var employeedata=jwt.decode(req.params.employeetoken);

var instID=employeedata.sessiondata.UserInfo.Pharmacy;
console.log(employeedata.sessiondata);
console.log(instID);
console.log("Getting Pharmacy Profile...")
db.query('select * from Pharmacy where PharmacyID = ?', instID, function(err,res){
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


PharmacyData.edit_pharmacy_profile=function(req,newPharmacy,result){
var employeedata=jwt.decode(req.params.employeetoken);

var instID=employeedata.sessiondata.InstitutionID;
console.log(instID);
var values=[newPharmacy.PharmacyName,newPharmacy.Type,newPharmacy.Branch, newPharmacy.City,newPharmacy.Subcity,newPharmacy.Woreda,newPharmacy.PhoneNo, newPharmacy.Email,newPharmacy.PoBox,newPharmacy.Latitude,newPharmacy.Longitude,instID];
database.query( 'UPDATE Pharmacy SET  PharmacyName =?, Type =?, Branch =?, City =?, Subcity =?, Woreda =?, PhoneNo =?, Email =?, PoBox =?, Latitude =?, Longitude =? WHERE PharmacyID =?',values ).then(rows=>{

PharmacyUpdateRow=rows;


}).then(()=>{
result(null,PharmacyUpdateRow);

});


};


module.exports = PharmacyData;

