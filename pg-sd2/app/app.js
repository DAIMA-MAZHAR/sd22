// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root - /
app.get("/all-students", function(req, res) {
  
    sql = 'select * from students';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results);
    });
});
// task 2
app.get("/all-students-formatted", function(req, res) {
  
    sql = 'select * from students';
    var output = '<table border= "1px" >';
    db.query(sql).then(results => {
        for (var row of results){
            output += '<tr>';
            output += '<td>'+ row.id + '</td>';
            output += '<td>'+ '<a href ="./single-students/' + row.id + '">'+ row.name + '</a>' + '</td>';
            output += '</tr>';
        }
        output += '</table>';
        res.send(output);
    });
});
//task 3

app.get("/single-student/:id", function (req, res) {
    var stId = req.params, id;
    console. log(stId);
    var stsql = "SELECT s.name as student, ps.name, as programme, \
    ps.id as pcode from Students s \
    JOIN Student Programme sp on sp.id = s.id \
    JOIN Programmes ps on ps.id = sp.programme \
    WHERE s.id = ?";
    var modSql = "SELECT * FROM Programme_Modules pm \
    JOIN Modules m on m.code = pm.module \
    WHERE programme = ?";
    db. query(stSql, [stId]). then(results => {
    console. log(results);
    var plode = results [0].pcode;
    output = '';
    output += '<div><b>Student: </b>' + results[0].student + '</div>';
     output += '<div><b> Programme: </b>' + results (e).programme + '</div>';
    //Now call the database for the modules
     db. query (modSql, [IpCodel]). then(results => {
         output += ' <table border="lpx">'
          for (var row of results) {
    output += '<tr>';
    outout += '<td>' + row.module + '</td>';
    outout += '<td>' + row.name + '</td>';
    output += '</tr>';

}

  
    output+= '</table>" ';
    res.send(output);

});
});
});


app.get("/", function(req, res) {
    res.send("Hello worldCCC!");
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});