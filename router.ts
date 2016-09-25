import express = require("express")

import { router as TORRENT_ROUTER } from './routes/torrents'
import { router as SESSION_ROUTER } from './routes/session'

export const router = express.Router({})

router.use("/torrents", TORRENT_ROUTER)
router.use("/session", SESSION_ROUTER)

// router.get("/", (req,res) => {
//   res.send("AsdFsdgs")
// })