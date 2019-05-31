
var dbs;

//creating database
function OnDeviceReady(){
   dbs = window.openDatabase("geo","1.0","Simple Demo",2*1024*1024);
   dbs.transaction(createDB, errorCB, successCB);

}

//creating database table if not exist
function createDB(tx){
db.transaction(createDB, errorCB, successCB);
tx.executeSql('CREATE TABLE IF NOT EXISTS register(id INT, myname TEXT, surname TEXT, national TEXT, address TEXT, eml TEXT, pw TEXT, dist TEXT)');
}

//check for error
 function errorCB(err){
    alert("SQL Error: "+err.code);

    }

//if no error display success
 function successCB(){
    alert("Database & Table Created");

    }

//function to submit form and go to homepage
function submitForm(){
    OnDeviceReady();
    dbs.transaction(insertDB, errorCB);
    $.mobile.changePage("#home", {reverse:false, transition:"slide"});
    return false;

   }

//function to insert values into the database
function insertDB(tx){
   

    var myname = $("[name='myname']").val();
    var surname = $("[name='surname']").val();
    var national = $("[name='national']").val();
    var address = $("[name='address']").val();
    var dist = $('input[name=chose]:checked').val();
    var eml = $("[name='eml']").val();
    var pw = $("[name='pw']").val();
   
    var sql = 'INSERT INTO register (myname, surname, national, address, eml, pw, dist) VALUES (?,?,?,?,?,?,?)';
    tx.executeSql(sql,[myname,surname,national,address,eml,pw,dist],successQueryDB, errorCB);

  }

  function successQueryDB(tx){
    alert("Insert Successful");
  

  }



 //crosscheck username and password of user from database register

function opening(){


  
}
                  


                        
                      
                        function check_login(){
                           
                           event.preventDefault(); // cancel default behavior

                           alert("lala");
                            //authenticating uname and password
                            var myname = $("#uname").val();
                            var pw = $("#passw").val();

                            dbs.transaction(function(tx){
                          
                            tx.executeSql('SELECT * FROM register WHERE myname=? AND pw=?', [myname,pw], function(tx, results) {
                                         var row = results.rows.length;
                                          if (row) {
                                        
                                       $.mobile.changePage("#home",{reverse:false,transition:"slide"});
                                     
                                    }else {
                                        alert("wrong Username or password");
                                          }

                                
                         });


                             });

                            }


                           

 //if (results.rows) {



                    

                     