import sqlite3 = require('sqlite3');
import fs = require('fs');

const dbFile = 'db/manager.db';
const dbFileExits = fs.existsSync(dbFile);

const db = new sqlite3.Database(dbFile);

db.parallelize(function () {
  if (!dbFileExits) {
    db.run("CREATE TABLE Movies (id INTEGER, seen INTEGER, name TEXT, poster_path TEXT)");
    db.run("CREATE TABLE Collections (id INTEGER, name TEXT, poster_path TEXT)");
    db.run("CREATE TABLE Series (id INTEGER, seen INTEGER, name TEXT, poster_path TEXT)");
    db.run("CREATE TABLE Wishlist (id INTEGER, movie INTEGER, name TEXT, poster_path TEXT)");
  }
});