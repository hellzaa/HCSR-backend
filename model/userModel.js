var mysql= require('mysql');
var db=require('../server/db/index');
var bcrypt=require('bcrypt');
var validate= require('validator');
var isEmpty= require('is-empty');
var jwt= require('jsonwebtoken');
const { NotImplemented } = require('http-errors');
const saltRounds=10;
//var EmployeeDataRow;
var UserUpdateRow;
var isAuthorized;
var authorized={};
var error;
var password;
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

var UserData = function(employee){
this.Firstname		= employee.Firstname;
this.Lastname		= employee.Lastname;
this.Username		= employee.Username;
this.Password		= employee.Password;
this.Institution 	= employee.Institution;
this.JobDescription	= employee.JobDescription;
this.Pharmacy 		= employee.Pharmacy;
this.Laboratory 	= employee.Laboratory;
this.Hospital 		= employee.Hospital;

}

UserData.get_login_patient= function(logininfo, result){

logininfo.username = !isEmpty(logininfo.Username) ? logininfo.username : "";
// logininfopassword= !isEmpty(logininfo.password) ?logininfo.password : "";
// username checks
  if (validate.isEmpty(logininfo.Username)) {
   	 isAuthorized=false;
	  authorized={isAuthorized: false, pharmacy: 0, token: null};
	 result(null,authorized);
        
       
	  }



database.query('select * from User where Username = ? ', logininfo.Username, function(err,res){

	if(err)
		{

			console.log(err);
			result(err,null);
		}
	else
		{

			bcrypt.compare(logininfo.Password, res[0].Password,function(err,resul)
				{
					console.log(resul);

					result(null,res);

				});


		}

}).then(()=>{
result(null,authorized);
}).catch(function(err){
console.log(err);

});
}

UserData.get_login_info= function(logininfo, result){
	logininfo.Username = !isEmpty(logininfo.Username) ? logininfo.Username : "";
	 logininfo.Password= !isEmpty(logininfo.Password) ?logininfo.Password : "";
	// username checks
	  if (validate.isEmpty(logininfo.Username)) {
			isAuthorized=false;
		 authorized={isAuthorized: false, token: null};
		 result(null,authorized);
			 
		   
		  }
	
	  // Password checks
	  if (validate.isEmpty(logininfo.Password)) {
	  isAuthorized=false;
	 authorized={isAuthorized: false, token: null};
		 result(null,authorized);
			
	  }
	
	database.query("SELECT * FROM User WHERE Username= ? ", logininfo.Username).then((rows,err)=>{
//	console.log(rows[0].Password);
	console.log(logininfo.Password);
	bcrypt.compare(logininfo.Password,rows[0].Password, function(err, result){
		if(result)
			{
	
				var sessiondata={UserID:rows[0].UserID, Firstname:rows[0].Firstname, Lastname:rows[0].Lastname, Username:rows[0].Username, Pharmacy:rows[0].Pharmacy, Laboratory:rows[0].Laboratory, Hospital:rows[0].Hospital, Institution:rows[0].Institution, JobDescription:rows[0].JobDescription};
				//var sessiondata={UserInfo:rows[0]};
				console.log(sessiondata);
				const payload= {sessiondata};
				const token=jwt.sign(payload,"YOUR JWT SECRET",{expiresIn:'1h'});
				authorized={isAuthorized:true, token:token}
	
			}
		else	
			{
				authorized={isAuthorized:false, token:null};
			}
	});
	
	
		
	}).then(()=>{
	result(null,authorized);
	}).catch(function(err){
	console.log(err);
	
	});
}

UserData.get_profile= function(req, result){
//console.log(pharmacyID);
//console.log(req.params.employeetoken);
var employeedata=jwt.decode(req.params.employeetoken);
var UserID=employeedata.sessiondata.UserID;
//console.log(employeedata.sessiondata);
console.log("Getting user profile.....");
db.query('select UserID, Firstname, Lastname, Username, Institution, JobDescription, Hospital, Pharmacy, Laboratory from User where UserID = ?', UserID, function(err,res){
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

};


UserData.add_new_user= function(newUser,req, result){
var employeedata=jwt.decode(req.params.employeetoken);
var instID=employeedata.sessiondata.Pharmacy;
console.log("Institution ID.......");
console.log(instID);
bcrypt.hash(newUser.Password, saltRounds, function(err,hash){


var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash,newUser.Institution, newUser.JobDescription, instID, newUser.Labratory, newUser.Hospital];
database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, Institution , JobDescription, Pharmacy, Labratory, Hospital) VALUES (?,?,?,?,?,?,?,?,?)',values ).then(rows=>{
UserUpdateRow=rows;
}).then(()=>{
result(null,UserUpdateRow);

});

});

};
UserData.add_new_user_patient= function(newUser,result){

bcrypt.hash(newUser.Password, saltRounds, function(err,hash){


var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash, newUser.JobDescription];
database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password,JobDescription) VALUES (?,?,?,?,?)',values ).then(rows=>{
UserUpdateRow=rows;
}).then(()=>{
result(null,UserUpdateRow);

});

});

};


UserData.edit_employee_profile=function(newEmployee,result){

var values=[newEmployee.Firstname,newEmployee.Lastname,newEmployee.Username, newEmployee.Password,newEmployee.JobDescription,2];
console.log(newEmployee.Firstname);
database.query( 'UPDATE User SET Firstname =? , Lastname =?, Username =?, Password =?, JobDescription =? WHERE UserID =?',values ).then(rows=>{
EmployeeUpdateRow=rows;
}).then(()=>{

result(null,EmployeeUpdateRow);

});


};
UserData.edit_profile=function(newEmployee,req,result){
console.log(req.params.employeetoken);
var employeedata=jwt.decode(req.params.employeetoken);
var UserID=employeedata.sessiondata.UserID;
console.log(employeedata.sessiondata);
var values=[newEmployee.Firstname,newEmployee.Lastname,newEmployee.Username, newEmployee.Password,newEmployee.JobDescription,UserID];
console.log(newEmployee.Firstname);
console.log(UserID);
database.query( 'UPDATE User SET Firstname =? , Lastname =?, Username =?, Password =?, JobDescription =? WHERE UserID =?',values ).then(rows=>{
EmployeeUpdateRow=rows;
}).then(()=>{
result(null,EmployeeUpdateRow);

});


};


UserData.remove_employee_profile=function(id,result){
db.query( 'DELETE FROM PharmacyEmployee WHERE PhaEmpID =?',5 , function(err,res){
if(err){
console.log("error: ",err);
result(null,err);

}else{
result(null,res);
}
});




};

UserData.get_employee_record= function(req, result){
//console.log(pharmacyID);
var employeedata=jwt.decode(req.params.employeetoken);

//console.log("Employee record!!!!!!!!!")
console.log(instID);
if(employeedata.sessiondata.Institution==="Pharmacy")
{var instID=employeedata.sessiondata.Pharmacy;
db.query('select Firstname,Lastname,Username,Password,JobDescription from User where Pharmacy = ?', instID, function(err,res){
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

else if (employeedata.sessiondata.Institution==="Laboratory")
{
	var instID=employeedata.sessiondata.Laboratory;
	db.query('select Firstname,Lastname,Username,Password,JobDescription from User where Laboratory = ?', instID, function(err,res){
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
else if (employeedata.sessiondata.Institution==="Hospital")
{
	var instID=employeedata.sessiondata.Hospital;
	db.query('select Firstname,Lastname,Username,Password,JobDescription from User where Hospital = ?', instID, function(err,res){
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
};


UserData.add_new_employee = function(newUser,req, result){
var employeedata=jwt.decode(req.params.employeetoken);
//console.log("Decode token... backend");
//console.log("Token Data:");
console.log(employeedata.sessiondata);

if(employeedata.sessiondata.Institution==="Pharmacy")
{
var instID = employeedata.sessiondata.Pharmacy;
//console.log("Adding new employee...");
var inst = employeedata.sessiondata.Institution;
//var inst = employeedata.Institution;
console.log("Adding new employee to pharmacy #");
console.log(instID);


bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash, newUser.JobDescription,inst, instID];
database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription,Institution,Pharmacy) VALUES (?,?,?,?,?,?,?)',values ).then(rows=>{
UserUpdateRow=rows;
}).then(()=>{
result(null,UserUpdateRow);

});
});

}
else if(employeedata.sessiondata.Institution==="Laboratory")
{
var instID = employeedata.sessiondata.Laboratory;
//console.log("Adding new employee...");
var inst = employeedata.sessiondata.Institution;
//var inst = employeedata.Institution;
console.log("Adding new employee to Laboratory #");
console.log(instID);


bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash, newUser.JobDescription,inst, instID];
database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription,Institution,Laboratory) VALUES (?,?,?,?,?,?,?)',values ).then(rows=>{
UserUpdateRow=rows;
}).then(()=>{
result(null,UserUpdateRow);

});
});

}
else if(employeedata.sessiondata.Institution==="Hospital")
{
var instID = employeedata.sessiondata.Hospital;
//console.log("Adding new employee...");
var inst = employeedata.sessiondata.Institution;
//var inst = employeedata.Institution;
console.log("Adding new employee to Laboratory #");
console.log(instID);


bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash, newUser.JobDescription,inst, instID];
database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription,Institution,Hospital) VALUES (?,?,?,?,?,?,?)',values ).then(rows=>{
UserUpdateRow=rows;
}).then(()=>{
result(null,UserUpdateRow);

});
});

}




};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ MOH Portal @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
UserData.add_moh_user= function(newUser,req, result){

	var inst="MOH";
	
	bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
	var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash, newUser.JobDescription,inst];
	database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription, Institution) VALUES (?,?,?,?,?,?)',values ).then(rows=>{
	UserUpdateRow=rows;
	}).then(()=>{
	result(null,UserUpdateRow);
	
	});
	});
	
	
};

UserData.add_pharmacy_admin= function(newUser,req, result){
	var inst = "Pharmacy";
	var JD = "Admin";
		
	bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
		var values=[ newUser.Firstname, newUser.Lastname, newUser.Username, hash, JD, inst, newUser.Pharmacy];
		database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription, Institution, Pharmacy) VALUES (?,?,?,?,?,?,?)',values ).then(rows=>{
		UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		});
	});
};

UserData.add_laboratory_admin= function(newUser,req, result){
	var inst = "Laboratory";
	var JD = "Admin";
		
	bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
		var values=[ newUser.Firstname, newUser.Lastname, newUser.Username, hash, JD, inst, newUser.Laboratory];
		database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription, Institution, Laboratory) VALUES (?,?,?,?,?,?,?)',values ).then(rows=>{
		UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		});
	});
};

UserData.add_hospital_admin= function(newUser,req, result){
	var inst = "Hospital";
	var JD = "Admin";
		
	bcrypt.hash(newUser.Password,saltRounds,function(err,hash){
		var values=[ newUser.Firstname, newUser.Lastname, newUser.Username, hash, JD, inst, newUser.Hospital];
		database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password, JobDescription, Institution, Hospital) VALUES (?,?,?,?,?,?,?)',values ).then(rows=>{
		UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		});
	});
};

UserData.admin_findById = function (UserID, result) {
    db.query("Select * from User where UserID = ? ", UserID, function (err, res) {
    if(err) {
      console.log("error: ", err);
      result(err, null);
    }
    else{
      result(null, res);
    }
});

};


UserData.get_all_admins = function(result){
	
	db.query("SELECT * from User WHERE JobDescription = 'Admin' ", function(err,res){
	if(err)
	{
		console.log("error: ", err);
		result(null, err);
		//console.log(err);
		//result(err,null);
	}
	else{
		console.log('Admins: ', res);
		result(null,res);
	}
	
});
	
};


UserData.pharmacy_admin_update= function(UserID, employee,result){
	console.log("User Model");
	console.log(employee);

	bcrypt.hash(employee.Password, saltRounds, function(err,hash){
			
	var values=[ employee.Firstname,employee.Lastname,employee.Username, hash, employee.Pharmacy, UserID];
		database.query('UPDATE User SET Firstname=?, Lastname=?, Username=?, Password=?, Pharmacy where UserID=?',values, function (err, res){
			if(err){
				console.log("error: ", err);
				result(null, err);
			}else{
				result(null, res);
			}
		}
	


		).then(rows=>{
			UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		});
	});
};


UserData.laboratory_admin_update= function(UserID, employee,result){
	console.log("User Model");
	console.log(employee);

	bcrypt.hash(employee.Password, saltRounds, function(err,hash){
			
	var values=[ employee.Firstname,employee.Lastname,employee.Username, hash, employee.Laboratory, UserID];
		database.query('UPDATE User SET Firstname=?, Lastname=?, Username=?, Password=?, Laboratory where UserID=?',values, function (err, res){
			if(err){
				console.log("error: ", err);
				result(null, err);
			}else{
				result(null, res);
			}
		}
	


		).then(rows=>{
			UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		});
	});
};


UserData.hospital_admin_update= function(UserID, employee,result){
	console.log("User Model");
	console.log(employee);

	bcrypt.hash(employee.Password, saltRounds, function(err,hash){
			
	var values=[ employee.Firstname,employee.Lastname,employee.Username, hash, employee.Hospital, UserID];
		database.query('UPDATE User SET Firstname=?, Lastname=?, Username=?, Password=?, Hospital where UserID=?',values, function (err, res){
			if(err){
				console.log("error: ", err);
				result(null, err);
			}else{
				result(null, res);
			}
		}
	


		).then(rows=>{
			UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		});
	});
};


///////////////////////////////////////////////////////////////////////////////////


UserData.get_login_patient= function(logininfo, result){
/*
	logininfo.username = !isEmpty(logininfo.Username) ? logininfo.username : "";
	// logininfopassword= !isEmpty(logininfo.password) ?logininfo.password : "";
	// username checks
	  if (validate.isEmpty(logininfo.Username)) {
			isAuthorized=false;
		  authorized={isAuthorized: false, pharmacy: 0, token: null};
		 result(null,authorized);
			
		   
		  }
	
	
	
	database.query('select * from User where Username = ? ', logininfo.Username, function(err,res){
	
		if(err)
			{
	
				console.log(err);
				result(err,null);
			}
		else
			{
	
				bcrypt.compare(logininfo.Password, res[0].Password,function(err,resul)
					{
						console.log(resul);
	
						result(null,res);
	
					});
	
	
			}
	
	}).then(()=>{
	result(null,authorized);
	}).catch(function(err){
	console.log(err);
	
	});
*/

logininfo.Username = !isEmpty(logininfo.Username) ? logininfo.Username : "";
logininfo.Password= !isEmpty(logininfo.Password) ?logininfo.Password : "";
// username checks
  if (validate.isEmpty(logininfo.Username)) {
   	 isAuthorized=false;
	 authorized={isAuthorized: false, token: null};
	 result(null,authorized);
         
       
	  }

  // Password checks
  if (validate.isEmpty(logininfo.Password)) {
  isAuthorized=false;
 authorized={isAuthorized: false, token: null};
	 result(null,authorized);
        
  }

database.query("select * from User WHERE Username= ?",logininfo.Username).then((rows)=>{

console.log(logininfo.Password);
console.log(rows[0]);
bcrypt.compare(logininfo.Password,rows[0].Password, function(err, result){
console.log(result);
	if(result)
		{

			var sessiondata={userID: rows[0].UserID, Firstname:rows[0].Firstname, Lastname:rows[0].Lastname, Username:rows[0].Username, Password:rows[0].Password};
			//console.log(sessiondata);
			//const payload= {sessiondata};
			
			authorized={isAuthorized:true, userData: sessiondata };

		}
	else	
		{
			authorized={isAuthorized:false, userData: null};
		}
});







}).then(()=>{
result(null,authorized);
}).catch(function(err){
console.log(err);

});
	}
	
UserData.add_new_user_patient= function(newUser,result){
console.log(newUser.Password);
var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, newUser.Password, newUser.JobDescription];
database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password,JobDescription) VALUES (?,?,?,?,?)',values ).then(rows=>{
		UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		
		});

/*
		bcrypt.hash(newUser.Password, saltRounds, function(err,hash){
		
		
		var values=[ newUser.Firstname,newUser.Lastname,newUser.Username, hash, newUser.JobDescription];
		database.query( 'INSERT INTO User ( Firstname, Lastname, Username, Password,JobDescription) VALUES (?,?,?,?,?)',values ).then(rows=>{
		UserUpdateRow=rows;
		}).then(()=>{
		result(null,UserUpdateRow);
		
		});
		
		});
*/
		
		};
		
UserData.edit_patient_profile= function(updateUser,result){
console.log(updateUser);

database.query("select * from User WHERE Username= ?",updateUser.OriginalUsername).then((rows)=>{
//console.log(rows[0]);
bcrypt.compare(updateUser.PasswordCurrent,rows[0].Password, function(err, result){

	if(result)
		{
console.log(updateUser.PasswordNew);
bcrypt.hash(updateUser.PasswordNew, saltRounds, function(err,hash){
		
			var values=[ updateUser.Firstname,updateUser.Lastname,updateUser.Username, hash, updateUser.UserID];
	database.query('UPDATE User SET Firstname=?, Lastname=?, Username=?, Password=? where UserID=?',values ).then(rows=>{
		UserUpdateRow=rows;
		}).then(()=>{
		result=UserUpdateRow;
		
		});
});

		}
	else	
		{
console.log("PWD np match");
			result=null;
		}
});

}).then(()=>{
result(null, UserUpdateRow);
});
};






module.exports=UserData;
