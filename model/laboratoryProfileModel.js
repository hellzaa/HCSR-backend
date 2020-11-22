var mysql= require('mysql');
var db=require('../server/db');
var LaboratoryDataRow;
var jwt= require('jsonwebtoken');
var LaboratoryUpdateRow;
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

var LaboratoryData= function(laboratory){
this.LabName= laboratory.LabName;
this.Type= laboratory.Type;
this.Branch= laboratory.Branch;
this.City= laboratory.City;
this.Subcity= laboratory.Subcity;
this.Woreda= laboratory.Woreda;
this.PhoneNo= laboratory.PhoneNo;
this.Email= laboratory.Email;
this.PoBox= laboratory.PoBox;
this.Latitude = laboratory.Latitude;
this.Longitude = laboratory.Longitude;
}


LaboratoryData.get_laboratory_profile= function(req, result){

var employeedata=jwt.decode(req.params.employeetoken);

var instID = employeedata.sessiondata.InstitutionID;
console.log(instID);
db.query('select * from Laboratory where LabID = ?', instID, function(err,res){
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


LaboratoryData.edit_laboratory_profile=function(req,newLaboratory,result){
var employeedata = jwt.decode(req.params.employeetoken);

var instID = employeedata.sessiondata.InstitutionID;
console.log(instID);
var values = [newLaboratory.LabName,newLaboratory.Type,newLaboratory.Branch, newLaboratory.City,newLaboratory.Subcity,newLaboratory.Woreda,newLaboratory.PhoneNo, newLaboratory.Email,newLaboratory.PoBox,newLaboratory.Latitude,newLaboratory.Longitude,instID];
database.query( 'UPDATE Laboratory SET  LabName =?, Type =?, Branch =?, City =?, Subcity =?, Woreda =?, PhoneNo =?, Email =?, PoBox =?, Latitude =?, Longitude =? WHERE LabID =?',values ).then(rows=>{

LaboratoryUpdateRow = rows;


}).then(()=>{
result(null,LaboratoryUpdateRow);

});


};


module.exports = LaboratoryData;

