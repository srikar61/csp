
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
    const records = result.rows.map(row => ({
      sno: row[0],
      disease: row[1],
      cause: row[2]
    }));
    res.json(records);

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).send('Failed to fetch data from the database');
  }
});

// Define the route to fetch data from the "diseases" table
app.get('/api/diseases', async (req, res) => {
  try {
    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to fetch data from the "diseases" table
    const result = await connection.execute('SELECT * FROM diseases');

    // Close the database connection
    await connection.close();
    const records = result.rows.map(row => ({
      sno: row[0],
      disease: row[1],
      symptoms: row[2]
    }));
    res.json(records);

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
    res.status(200).json({message: 'Data inserted successfully'});

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to insert data into the database');
  }
});

// Define the route to insert data into the "diseases" table
app.post('/api/diseases', async (req, res) => {
  try {
    const disease = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to insert data into the "diseases" table
    await connection.execute(
      `INSERT INTO diseases (sno, disease, symptoms) VALUES (:sno, :disease, :symptoms)`,
      disease
    );
    await connection.commit();

    // Close the database connection
    await connection.close();
    res.status(200).json({message: 'Data inserted successfully'});

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to insert data into the database');
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
    res.status(200).json('Data updated successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to update data in the database');
  }
});

// Define the route to update data in the "diseases" table
app.put('/api/diseases/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const disease = req.body;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to update data in the "diseases" table
    await connection.execute(
      `UPDATE diseases SET sno = :sno, disease = :disease ,symptoms= :symptoms WHERE sno = :id`,
      { ...disease, id }
    );
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).json('Data updated successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to update data in the database');
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
    res.status(200).json('Data deleted successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to delete data from the database');
  }
});

// Define the route to delete data from the "diseases" table
app.delete('/api/diseases/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Create a connection to the Oracle database
    const connection = await oracledb.getConnection(dbConfig);

    // Execute the SQL query to delete data from the "diseases" table
    await connection.execute(`DELETE FROM diseases WHERE sno = :id`, [id]);
    await connection.commit();
    // Close the database connection
    await connection.close();
    res.status(200).json('Data deleted successfully');

  } catch (error) {
    console.error('Error executing SQL statement:', error);
    res.status(500).json('Failed to delete data from the database');
  }
});


app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(
      `SELECT * FROM users WHERE username = :username AND password = :password`,
      [username, password]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred' });
  }
});

// Route for signup
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const connection = await oracledb.getConnection(dbConfig);
    await connection.execute(
      `INSERT INTO users (username, password) VALUES (:username, :password)`,
      [username, password]
    );
    
    res.json({ success: true, message: 'Signup successful' });
    await connection.commit();
    await connection.close();
  } catch (error) {
    console.error('Error during signup:', error);
    res.json({ success: false, message: 'An error occurred' });
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});