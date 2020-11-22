var mysql= require('mysql');
var db=require('../server/db');
var LaboratoryDataRow;
var jwt= require('jsonwebtoken');
var HospitalUpdateRow;
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

var HospitalData= function(hospital){
this.HospitalName= hospital.HospitalName;
this.City= hospital.City;
this.Subcity= hospital.Subcity;
this.Woreda= hospital.Woreda;
this.Referral= hospital.Referral;
this.Website= hospital.Website;
this.PhoneNo= hospital.PhoneNo;
this.Email= hospital.Email;
this.PoBox= hospital.PoBox;
this.Latitude = hospital.Latitude;
this.Longitude = hospital.Longitude;
}


HospitalData.get_hospital_profile= function(req, result){

var employeedata=jwt.decode(req.params.employeetoken);

var instID = employeedata.sessiondata.InstitutionID;
console.log(instID);
db.query('select * from Hospital where HospID = ?', instID, function(err,res){
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


HospitalData.edit_hospital_profile=function(req,newHospital,result){
var employeedata = jwt.decode(req.params.employeetoken);

var instID = employeedata.sessiondata.InstitutionID;
console.log(instID);
var values = [newHospital.HospitalName, newHospital.City,newHospital.Subcity,newHospital.Woreda,newHospital.Referral, newHospital.Website,newHospital.PhoneNo, newHospital.Email,newHospital.PoBox,newHospital.Latitude,newHospital.Longitude,instID];
database.query( 'UPDATE Hospital SET  HospitalName =?, City =?, Subcity =?, Woreda =?, Referral =?, Website =?, PhoneNo =?, Email =?, PoBox =?, Latitude =?, Longitude =? WHERE HospID =?',values ).then(rows=>{

HospitalUpdateRow = rows;


}).then(()=>{
result(null,HospitalUpdateRow);

});


};


module.exports = HospitalData;

