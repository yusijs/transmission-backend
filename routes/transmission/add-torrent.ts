import express = require("express");
import multer = require("multer");
import { transmission, PASSKEY, downloadLocations } from '../../config';

const upload = multer({ dest: 'torrents/' });
export const router = express.Router({});

router.post("/url", (req, res) => {
  const type = req.body.type;
  let location: string = downloadLocations[type];
  if (!location) {
    res.status(500).send("Invalid Location");
    return;
  }

  if (type === 'tv') {
    let filename = req.body.filename;
    let parts = filename.match(/(.+)\s{0,1}\.{0,1}(S\d{1,2})/);
    if (parts.length === 3) { // If we're able to extract show name and season number, place into paths
      location = location.replace('ShowName', parts[1].trim()).replace('SeasonNumber', parts[2]);
    }
    else { // Otherwise, fuggit and remove showname/seasonnumber
      location.replace('ShowName/SeasonNumber', '');
    }
  }

  let url: string = req.body.url || defaultUrl.replace('insertIdHere', req.body.id);

  if (url.lastIndexOf("/") + 1 === url.length) {
    url = url.substring(0, url.length - 1);
  }

  let options = {
    'download-dir': location
  };
  transmission.addUrl(url, options, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send({ status: "success", message: `${result.name} added` });
    }
  });
});

router.post("/", upload.single('torrent'), (req, res) => {
  console.log(req.file);
  transmission.addFile(`torrents/${req.file.filename}`, (err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send({
        status: "success",
        message: `${result.name} added`
      });
    }
  });
});



const defaultUrl = `https://norbits.net/download.php?id=insertIdHere&passkey=${PASSKEY}`;