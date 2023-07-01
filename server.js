let connection;
var oracledb = require('oracledb');

(async function() {
try{
   connection = await oracledb.getConnection({
        user : 'system',
        password : 'admin',
        connectString : '//localhost:1521/XE'
   });
   console.log("Successfully connected to Oracle!")
   const result = await connection.execute(`
   select * from players
 `);
 for (const row of result.rows) {
    console.log(row);
  }

   
} catch(err) {
    console.log("Error: ", err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch(err) {
        console.log("Error when closing the database connection: ", err);
      }
    }
  }
})()