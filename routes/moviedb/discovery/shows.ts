import express = require("express");
import { moviedb } from '../../../config';

export const router = express.Router({});

router.get("/", (req, res) => {
  moviedb.discoverTv(req.query, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    if (result.total_results === 0) {
      res.status(204).send({
        status: 0,
        message: `Nothing returned from API`
      });
      return;
    }

    res.status(200).send(result);
  });
});

router.get("/genres", (req, res) => {
  moviedb.genreTvList({}, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(result.genres);
  });
});


interface Query {
'air_date.gte': string;
'air_date.lte': string;
'first_air_date.gte': string;
'first_air_date.lte': string;
'first_air_date_year': number;
'timezone': string;
'vote_average.gte': number;
'vote_count.gte': number;
'with_genres': string;
'with_networks': string;
'without_genres': string;
'with_runtime.gte': number;
'with_runtime.lte': number;
'include_null_first_air_dates': boolean;
}