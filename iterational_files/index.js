var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('client'));

server.listen(PORT, function() {
    console.log("Server running");
});

const Client = require('pg').Client
const client = new Client({
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 5432,
    database: "gdp_db"
})

client.connect()
.then(() => console.log("Connected successfully"))
.then(() => client.query("select * from continent_codes"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())