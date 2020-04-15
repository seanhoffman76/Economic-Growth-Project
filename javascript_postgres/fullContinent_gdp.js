const pg = require('pg');
const fs = require('fs')
const cs = 'postgres://postgres:postgres@localhost:5432/gdp_db';
const client = new pg.Client(cs);
client.connect();
client.query("select c.continent_code, c.two_letter_cc, c.three_letter_cc, c.country_name, year, 'total_gdp(usd)' , rank From (SELECT year, 'total_gdp(usd)', country_code, RANK() OVER (PARTITION BY year ORDER BY 'total_gdp(usd)' DESC) AS rank FROM gdp) AS gdp_win left join continent_codes c on (gdp_win.country_code = c.three_letter_cc) WHERE gdp_win.rank <= 30;").then(res => {
    const data = res.rows;
    fs.writeFileSync('continent_gdp.json', JSON.stringify(data))
}).finally(() => client.end());