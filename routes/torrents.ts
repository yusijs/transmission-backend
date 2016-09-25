import express = require("express");
import { transmission } from '../config'
import { router as ADD_TORRENT } from './add-torrent'

export const router = express.Router({})

router.use("/add", ADD_TORRENT);

router.get("/", (req, res) => {
  if (!req.query.ids) { // Get all torrents
    transmission.get((err, results) => {
      res.json(results.torrents);
    })
  }
  else { // Get specific torrent(s)
    let {ids} = req.query
    // Needs to be a number, so parse the id(s)
    if (typeof ids == 'object')
      ids = ids.map(item => parseInt(item))
    else
      ids = parseInt(ids);
    transmission.get(ids, (err, results) => {
      res.json(results.torrents);
    })
  }
})

router.delete("/", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "error", message: "No ids supplied." })
    return false;
  }
  else {
    let ids = req.body.ids;
    let remove: boolean = req.body.remove ? true : false;
    if (typeof ids == 'object')
      ids = ids.map(item => parseInt(item))
    else
      ids = parseInt(ids);
    transmission.remove(ids, remove, (err, results) => {
      if(err) res.send(err);
      else res.send({status: "success", message: `${ids.toString()} deleted`});
    })
  }
})

