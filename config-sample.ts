// Rename to config.ts
import Transmission = require('transmission');
import MovieDB = require('moviedb');
import sqlite3 = require('sqlite3');


export const API_KEY = process.env.API_KEY || 'API_KEY';
export const PASSKEY = process.env.PASSKEY || 'PASSKEY';
export const downloadLocations = {
  tv: '/secondary_datashare/series/ShowName/SeasonNumber',
  movies: '/primary_datashare/movies/'
};

export const transmission = new Transmission({
  host: '127.0.0.1', // default
  port: 9091, // default
  username: "username", // default: false
  password: process.env.password // default: false
});

export const moviedb = MovieDB(API_KEY);

export const options = {
  method: 'POST',
  uri: 'https://torrent-api-url',
  body: {
    username: '',
    "passkey": process.env.PASSKEY,
    category: "1", // DEFAULT: movie. 2 for series. Categories for your api may differ
    search: ""
  },
  json: true // Automatically stringifies the body to JSON 
};

const dbFile = 'db/manager.db';
export const db = new sqlite3.Database(dbFile);
