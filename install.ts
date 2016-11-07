import sqlite3 = require('sqlite3');
import fs = require('fs');

const dbFile = 'db/manager.db';
const dbFileExits = fs.existsSync(dbFile);

const db = new sqlite3.Database(dbFile);

db.parallelize(function () {
  if (!dbFileExits) {
    db.run("CREATE TABLE Movies (id INTEGER PRIMARY KEY, seen INTEGER, belongs_to_collection INTEGER, name TEXT, poster_path TEXT)");
    db.run("CREATE TABLE Collections (id INTEGER PRIMARY KEY, name TEXT, poster_path TEXT)");
    db.run("CREATE TABLE Series (id INTEGER PRIMARY KEY, seen INTEGER, belongs_to_collection INTEGER, name TEXT, poster_path TEXT)");
    db.run("CREATE TABLE Wishlist (id INTEGER PRIMARY KEY, movie INTEGER, name TEXT, poster_path TEXT)");
  }
});