let sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('./db/urly.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.log(err.message);
  }
  else {
      console.log("connected to sqlite db");
  }

});

const dbAll = (query) => {
  return new Promise((resolve, reject) => {
    db.all(query, (err,rows) => {
          if (err) {
              reject(err);
          }
          resolve(rows);
      })
  })
}

const dbRunPrepared = (query, values) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare(query);
    stmt.run(values, (err) => {
      if (err) {
        console.log('error', err);
        reject(err)
      }
      else {
        resolve(this.lastID);
      }
    })

  })
}

exports.db = db;
exports.dbAll = dbAll;
exports.dbRunPrepared = dbRunPrepared;