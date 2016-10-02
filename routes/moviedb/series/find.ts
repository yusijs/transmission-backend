import express = require("express")
import { moviedb } from '../../../config'

export const router = express.Router({})

router.get("/", (req, res) => {
  moviedb.searchTv({ query: req.query.query }, (err, shows) => {
    if (err) res.status(500).send(err);
    else res.send(shows);
  })
})