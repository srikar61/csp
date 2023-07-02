const express = require('express');
const oracledb = require('oracledb');
const cors=require('cors');
const app = express();
const port = 3000;
app.use(cors());
// Configure Oracle database connection
const dbConfig = {
    user : 'system',
    password : 'admin',
    connectString : '//localhost:1521/XE'
};

// Define the route to fetch data from the "causes" table
app.get('/api/causes', async (req, res) => {
  try {
    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to fetch data from the "causes" table
    const result = await connection.execute('SELECT * FROM causes');
    
    // Close the database connection
    await connection.close();
    res.json(result.rows);
    // Render the fetched data in a table format
    // let tableHTML = '<table>';
    // tableHTML += '<tr><th>Sno</th><th>Disease</th><th>Cause</th></tr>';
    // for (const row of result.rows) {
    //   tableHTML += `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`;
    // }
    // tableHTML += '</table>';

    // // Send the rendered table as the response
    // res.send(tableHTML);
  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to fetch data from the database');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
