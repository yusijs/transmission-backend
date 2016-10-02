import express = require("express")
import { moviedb } from '../../../config'

export const router = express.Router({})

router.get("/", (req, res) => {
  // query
  moviedb.searchMovie(req.query, (err, movies) => {
    if (err) res.status(500).send(err);
    else res.send(movies);
  })
})

router.get("/:id", (req, res) => {
  moviedb.movieInfo({ id: req.params.id }, (err, movie) => {
    if (err) res.status(500).send(err);
    else res.send(movie);
  })
})