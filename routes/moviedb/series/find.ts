import express = require("express")
import { moviedb } from '../../../config'

export const router = express.Router({})

router.get("/", (req, res) => {
  moviedb.searchTv(req.query, (err, shows) => {
    if (err) res.status(500).send(err);
    else res.send(shows);
  })
})

router.get("/:id", (req, res) => {
  moviedb.tvInfo({ id: req.params.id, append_to_response: 'credits' }, (err, show) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(show);
  })
})

router.get("/season/:show/:season", (req, res) => {
  let id = req.params.show;
  let season = req.params.season;

  moviedb.tvSeasonInfo({ id, season_number: season }, (err, seasonInfo) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(seasonInfo);
  })
})