import express = require("express")
import { moviedb } from '../../../config'

export const router = express.Router({})

import { router as FIND_ROUTER} from './find'
import { router as MY_ROUTER } from './my';

router.use("/find", FIND_ROUTER)
router.use("/my", MY_ROUTER)

router.get("/:id", (req, res) => {
  let {id} = req.params;
  moviedb.movieInfo({id: id}, (err, movie) => {
    if(err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(movie);
  })
})