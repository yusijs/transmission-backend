import express = require("express");
import Transmission = require("transmission");
import socket = require("socket.io");

import { transmission } from '../../config';
import { router as ADD_TORRENT } from './add-torrent';

export const router = express.Router({});

router.use("/add", ADD_TORRENT);

router.get("/", (req, res) => {
  if (!req.query.ids) { // Get all torrents
    transmission.get((err, results) => {
      res.json(results.torrents);
    });
  }
  else { // Get specific torrent(s)
    let {ids} = req.query;
    // Needs to be a number, so parse the id(s)
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    } else {
      ids = parseInt(ids);
    }
    transmission.get(ids, (err, results) => {
      res.json(results.torrents);
    });
  }
});

router.put("/", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "failed", message: "No ids specified" });
  }
  else {
    let {ids} = req.body;
    let options: Transmission.setTorrentOptions = req.body.options;
    // Needs to be a number, so parse the id(s) just to be safe.
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    } else {
      ids = parseInt(ids);
    }
    transmission.set(ids, options, (err, results) => {
      res.json(results.torrents);
    });
  }
});

router.put("/reannounce", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "failed", message: "No ids specified" });
  }
  else {
    let {ids} = req.body;
    // Needs to be a number, so parse the id(s) just to be safe.
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    }
    else {
      ids = parseInt(ids);
    }
    transmission.reannounce(ids, (err, results) => {
      res.json(results.torrents);
    });
  }
});

router.put("/start", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "failed", message: "No ids specified" });
  }
  else {
    let {ids} = req.body;
    // Needs to be a number, so parse the id(s) just to be safe.
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    }
    else {
      ids = parseInt(ids);
    }
    transmission.start(ids, (err, results) => {
      res.json(results.torrents);
    });
  }
});

router.put("/startnow", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "failed", message: "No ids specified" });
  }
  else {
    let {ids} = req.body;
    // Needs to be a number, so parse the id(s) just to be safe.
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    }
    else {
      ids = parseInt(ids);
    }
    transmission.startNow(ids, (err, results) => {
      res.json(results.torrents);
    });
  }
});

router.put("/stop", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "failed", message: "No ids specified" });
  }
  else {
    let {ids} = req.body;
    // Needs to be a number, so parse the id(s) just to be safe.
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    }
    else {
      ids = parseInt(ids);
    }
    transmission.stop(ids, (err, results) => {
      res.json(results.torrents);
    });
  }
});

router.get("/active", (req, res) => {
  transmission.active((err, result) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send(result.torrents);
    }
  });
});

router.delete("/", (req, res) => {
  if (!req.body.ids) {
    res.status(500).send({ status: "error", message: "No ids supplied." });
    return false;
  }
  else {
    let ids = req.body.ids;
    let remove: boolean = req.body.remove ? true : false;
    if (typeof ids === 'object') {
      ids = ids.map(item => parseInt(item));
    }
    else {
      ids = parseInt(ids);
    }
    transmission.remove(ids, remove, (err, results) => {
      if (err) {
        res.send(err);
        return;
      }

      res.send({ status: "success", message: `${ids.toString()} deleted` });
    });
  }
});

export const torrentSocket = (io: SocketIO.Server) => {
  let checkNow = true;
  io.on('connection', (socket: SocketIO.Client) => {
    if (checkNow) {
      checkNow = false;
      transmission.get((err, results) => {
        let message = results;
        if (err) {
          message = err;
        }
        io.emit('torrents',
          message
        );
        checkNow = true;
      });
    }
  });


  setInterval(() => {
    if (checkNow) {
      checkNow = false;
      transmission.get((err, results) => {
        let message = results;
        if (err) {
          message = err;
        }
        io.emit('torrents',
          message
        );
        checkNow = true;
      });
    }
  }, 2000);
};