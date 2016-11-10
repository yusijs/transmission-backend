import express = require("express");
import { router as MOVIE_ROUTER } from './movies';
import { router as SERIES_ROUTER } from './shows';

export const router = express.Router({});

router.use("/movies", MOVIE_ROUTER);
router.use("/series", SERIES_ROUTER);