import express = require("express");
import { router as MOVIE_ROUTER } from './movies';

export const router = express.Router({});

router.use("/movies", MOVIE_ROUTER);