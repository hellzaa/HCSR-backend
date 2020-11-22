//create a database connection
var mysql= require('mysql');
var pool=mysql.createConnection({ password: '' , user: 'root' , database: 'HCSR' , host: 'localhost', port:'3307'});
pool.connect((err)=>{
if(!err)
	console.log("Sucess");
else
   console.log("err");
});

module.exports= pool;
