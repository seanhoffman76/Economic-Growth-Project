SELECT year, country AS name, c.continent_code, c.three_letter_cc AS three_cc, total_gdp/1000000 AS value, rank 
FROM (SELECT year, country, total_gdp, country_code, RANK() OVER (PARTITION BY year ORDER BY total_gdp DESC) AS rank FROM gdp) AS gdp_win 
LEFT JOIN continent_codes c on (gdp_win.country_code = c.three_letter_cc)
WHERE year >= 1950;