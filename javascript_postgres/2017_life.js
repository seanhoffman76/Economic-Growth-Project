const pg = require('pg');
const fs = require('fs')
const cs = 'postgres://postgres:postgres@localhost:5432/gdp_db';
const client = new pg.Client(cs);
client.connect();
client.query("SELECT country, country_code, year, life_exp, two_letter_cc FROM public.life_exp l LEFT JOIN public.continent_codes c on (l.country_code = c.three_letter_cc) WHERE l.year = 2017").then(res => {
    const data = res.rows;
    fs.writeFileSync('2017_life.json', JSON.stringify(data))
}).finally(() => client.end());