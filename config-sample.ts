// Rename to config.ts
import Transmission = require("transmission")
import MovieDB = require("moviedb")

export const moviedb = MovieDB('API_KEY')
// Uncomment below to get api key from env variable API_KEY
// export const moviedb = MovieDB(process.env.API_KEY)

export const transmission = new Transmission({
  host: '127.0.0.1', // default
  port: 9091, // default
  username: "username", // default: false
  password: process.env.password // default: false
})

