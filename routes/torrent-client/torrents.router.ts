import express = require("express")
import rq = require("request-promise")

import { options } from '../../config'

export const router = express.Router({})

router.get("/tv/:name", (req, res) => {

  options.body.category = "2" // TV Category
  options.body.search = req.params.name

  rq(options)
    .then(htmlString => {
      res.send(htmlString)
    })
    .catch(err => {
      res.send(err);
    })
})