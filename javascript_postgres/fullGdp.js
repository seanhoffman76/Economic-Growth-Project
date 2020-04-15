const pg = require('pg');
const fs = require('fs')
const cs = 'postgres://postgres:postgres@localhost:5432/gdp_db';
const client = new pg.Client(cs);
client.connect();
client.query("select * from gdp").then(res => {
    const data = res.rows;
    fs.writeFileSync('gdp.json', JSON.stringify(data))
}).finally(() => client.end());