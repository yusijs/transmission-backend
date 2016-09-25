import express = require("express")

import { router as TORRENT_ROUTER } from './routes/torrents'

export const router = express.Router({})

router.use("/torrents", TORRENT_ROUTER)

// router.get("/", (req,res) => {
//   res.send("AsdFsdgs")
// })