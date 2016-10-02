import express = require("express")

import { router as TORRENT_ROUTER } from './routes/transmission/torrents'
import { router as SESSION_ROUTER } from './routes/transmission/session'

import { router as MOVIE_ROUTER } from './routes/moviedb/movies/movies.router'
import { router as SERIES_ROUTER } from './routes/moviedb/series/series.router'

import { router as TORRENT_API } from './routes/torrent-client/torrents.router'

export const router = express.Router({})

router.use("/torrents", TORRENT_ROUTER)
router.use("/session", SESSION_ROUTER)

router.use("/movies", MOVIE_ROUTER);
router.use("/series", SERIES_ROUTER);

router.use("/torrent-api", TORRENT_API);