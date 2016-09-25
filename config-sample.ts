// Rename to config.ts
import Transmission = require("transmission")

export const transmission = new Transmission({
  host: '127.0.0.1', // default
  port: 9091, // default
  username: "username", // default: false
  password: process.env.password // default: false
})
