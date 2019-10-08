const mysql = require('mysql')
const config = require('./config')
const pool = mysql.createPool(config)

const db = (sql, params = []) => {
  return new Promise((res, rej) => {
    pool.getConnection(function (err, connection) {
      if (err) rej(err); // not connected!

      // Use the connection
      connection.query(sql, params, function (error, results, fields) {
        // When done with the connection, release it.
        connection.release();
        console.log('sql:'+sql,'params:'+params)
        // Handle error after the release.
        if (error) rej(error);
        res(results)
        // Don't use the connection here, it has been returned to the pool.
      });
    });
  })
}
module.exports = db