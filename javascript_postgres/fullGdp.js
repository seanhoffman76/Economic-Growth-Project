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
.then(() => client.query("select * from gdp"))
.then(results => console.table(results.rows))
.catch(e => console.log(e))
.finally(() => client.end())