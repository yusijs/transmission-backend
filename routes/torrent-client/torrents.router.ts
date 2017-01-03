import express = require("express");
import rq = require("request-promise");
const parseString = require('xml2js').parseString;
var lastSeenTorrent = "";

import { options, PASSKEY, db } from '../../config';

export const router = express.Router({});

router.get("/tv/:name", (req, res) => {
  let pad = "00";
  let season = req.query.season || '';
  let episode = req.query.episode || '';
  if (season !== '') {
    season = 'S' + pad.substring(0, pad.length - season.length) + season;
  }
  if (episode !== '') {
    episode = 'E' + pad.substring(0, pad.length - episode.length) + episode;
  }
  options.body.category = "2"; // TV Category
  options.body.search = `${req.params.name} ${season} ${episode}`;
  console.log(options.body.search);

  rq(options)
    .then(htmlString => {
      // res.send(options);
      res.send(htmlString);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

router.get("/movie/:name", (req, res) => {

  options.body.category = "1"; // Movie Category
  options.body.search = req.params.name.replace(/[^\w\s!?]/g, '');

  rq(options)
    .then(htmlString => {
      // res.send(options);
      res.send(htmlString);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

export const torrentSocket = (io: SocketIO.Server) => {
  io.on('connection', (socket: SocketIO.Client) => {
    console.log("Connected to torrentSocket");
    checkRssFeed(io);
  });

  setInterval(() => {
    checkRssFeed(io);
  }, 300000);
};

const checkRssFeed = (io) => {
  db.serialize(function () {
    db.run('select movie from Wishlist', err => {
      rq(rssUrl)
        .then(data => {
          parseString(data, function (err, result) {
            let items = result.rss.channel[0].item;
            if (lastSeenTorrent !== items[0].title) {
              let newTorrents = [];
              for (let item of result.rss.channel[0].item) {
                if (lastSeenTorrent === item.title[0]) {
                  break;
                }
                newTorrents.push({
                  title: item.title[0],
                  link: item.link[0]
                });
              }
              io.emit('newtorrents', JSON.stringify(newTorrents));
            }
            lastSeenTorrent = items[0].title[0];
          });
        });
    });
  });
};

const rssUrl = `https://norbits.net/rss.php?feed=dl&passkey=${PASSKEY}&format=bb&cats=1,9,19,0-1,9,20,0`;