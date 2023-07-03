const express = require('express');
const oracledb = require('oracledb');
const cors = require('cors');
const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

// Configure Oracle database connection
const dbConfig = {
  user: 'system',
  password: 'admin',
  connectString: '//localhost:1521/XE'
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

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to fetch data from the database');
  }
});

// Define the route to insert data into the "causes" table
app.post('/api/causes', async (req, res) => {
  try {
    const cause = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to insert data into the "causes" table
    await connection.execute(
      `INSERT INTO causes (sno, disease, cause) VALUES (:sno, :disease, :cause)`,
      cause
    );
    await connection.commit();

    // Close the database connection
    await connection.close();
    res.status(200).send('Data inserted successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to insert data into the database');
  }
});

// Define the route to update data in the "causes" table
app.put('/api/causes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const cause = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to update data in the "causes" table
    await connection.execute(
      `UPDATE causes SET sno = :sno, disease = :disease, cause = :cause WHERE sno = :id`,
      { ...cause, id }
    );
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).send('Data updated successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to update data in the database');
  }
});

// Define the route to delete data from the "causes" table
app.delete('/api/causes/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to delete data from the "causes" table
    await connection.execute(`DELETE FROM causes WHERE sno = :id`, [id]);
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).send('Data deleted successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to delete data from the database');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
