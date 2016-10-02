import express = require("express");
import multer = require("multer");
import { transmission } from '../../config';

const upload = multer({ dest: 'torrents/' })
export const router = express.Router({})

router.post("/url", (req, res) => {
  let url: string = req.body.url
  if (url.lastIndexOf("/") + 1 == url.length)
    url = url.substring(0, url.length - 1);
  let options = req.body.options ? req.body.options : {}
  transmission.addUrl(url, options, (err, result) => {
    if (err)
      res.status(500).send(err);
    else
      res.status(200).send({ status: "success", message: `${result.name} added` });
  })
})

router.post("/", upload.single('torrent'), (req, res) => {
  console.log(req.file)
  transmission.addFile(`torrents/${req.file.filename}`, (err, result) => {
    if (err)
      res.status(500).send(err);
    else {
      res.status(200).send({
        status: "success",
        message: `${result.name} added`
      })
    }
  })
})