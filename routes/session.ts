import express = require("express");
import Transmission = require("transmission")

import { transmission } from '../config'

export const router = express.Router({})


router.get("/", (req, res) => {
  transmission.session((err, results) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send(results);
    }
  })
})

router.put("/", (req, res) => {
  let options: Transmission.setSessionOptions = req.body ? req.body : {} as Transmission.setSessionOptions;
  transmission.session(options, (err, results) => {
    if (err) res.status(500).send(err);
    else {
      res.status(200).send({status: "success", message: "Session options updated"});
    }
  })
})

router.get("/stats", (req, res) => {
  transmission.sessionStats((err, results) => {
    if (err) res.status(500).send(err);
    else res.status(200).send(results);
  })
})