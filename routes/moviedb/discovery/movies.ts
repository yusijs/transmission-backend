import express = require("express");
import { moviedb, API_KEY } from '../../../config';
import rq = require("request-promise");

export const router = express.Router({});

router.get("/", (req, res) => {
  moviedb.discoverMovie(req.query, (err, result) => {
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
  moviedb.genreMovieList({}, (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.send(result.genres);
  });
});

router.get("/certifications", (req, res) => {
  rq('https://api.themoviedb.org/3/certification/movie/list', {
    qs: {
      api_key: API_KEY
    },
    json: true
  }).then(certifications => {
    res.send(certifications.certifications.US);
  }).catch(err => {
    res.status(500).send(err);
  })
});

interface Query {
  sort_by?: string;
  certification_country?: string;
  certification?: string | {
    lte?: string
  };
  include_adult?: boolean;
  include_video?: boolean;
  page?: number;
  primary_release_year?: number;
  primary_release_date?: {
    gte?: string;
    lte?: string;
  };
  release_date?: {
    gte?: string;
    lte?: string;
  };
  vote_count?: {
    gte?: number;
    lte?: number;
  };
  vote_average?: {
    gte?: number;
    lte?: number;
  };
  with_cast?: string;
  with_crew?: string;
  with_companies?: string;
  with_genres?: string;
  with_keywords?: string;
  with_people?: string;
  year?: number;
  without_genres?: string;
  with_runtime?: {
    gte?: number;
    lte?: number;
  };
}