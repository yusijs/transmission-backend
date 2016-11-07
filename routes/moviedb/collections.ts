import express = require("express")
import { moviedb, db } from '../../config'

import { DBResponse } from '../../utils';

export const router = express.Router({})

router.post("/my", (req, res) => {
  const collection: Collection = req.body;

  if (!collection) {
    res.status(404).send("Invalid Collection");
    return false;
  }

  db.serialize(() => {
    db.run(`INSERT INTO Collections VALUES (?,?,?)`, [
      collection.id,
      collection.name,
      collection.poster_path
    ], (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      const response = new DBResponse(collection);

      res.send(response.response);
    })
  })

})

router.delete("/my", (req, res) => {
  let {id} = req.body;

  if (!id) {
    res.status(500).send("Invalid ID")
    return;
  }

  db.serialize(() => {
    db.run(`DELETE FROM Collections where id = ?`, [id], (err) => {
      if (err) {
        res.status(500).send(err);
        return;
      }

      res.status(200).send({
        status: 1,
        message: `Successfully deleted ${id}`
      })
    })
  })

})

router.get("/:id", (req, res) => {
  let {id} = req.params;

  moviedb.collectionInfo({ id }, (err, collection) => {
    if (err) {
      res.status(500).send(err);
      return;
    }

    res.status(200).send(collection);

  })

})

interface Collection {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  parts: [
    {
      adult: Boolean,
      backdrop_path: string;
      genre_ids: [number],
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      release_date: string;
      poster_path: string;
      popularity: number;
      title: string;
      video: Boolean | string[],
      vote_average: number;
      vote_count: number;
    }
  ]
}