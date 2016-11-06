import express = require("express")
import rq = require("request-promise")

import { options } from '../../config'

export const router = express.Router({})

router.get("/tv/:name", (req, res) => {

  let season = req.query.season || '';
  let episode = req.query.episode || '';
  options.body.category = "2" // TV Category
  options.body.search = `${req.params.name} ${season} ${episode}`

  rq(options)
    .then(htmlString => {
      // res.send(options);
      res.send(htmlString)
    })
    .catch(err => {
      res.status(500).send(err);
    })
})

router.get("/movie/:name", (req, res) => {

  options.body.category = "1" // Movie Category
  options.body.search = req.params.name.replace(/[^\w\s!?]/g,'');

  rq(options)
    .then(htmlString => {
      // res.send(options);
      res.send(htmlString)
    })
    .catch(err => {
      res.status(500).send(err);
    })
})