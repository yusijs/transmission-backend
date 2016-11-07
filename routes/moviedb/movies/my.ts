import express = require("express")
import { moviedb, db } from '../../../config'
import { DBResponse } from '../../../utils';

export const router = express.Router({})

router.post("/", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const poster_path = req.body.poster_path;
  const seen = req.body.seen || 0;
  const collection = req.body.belongs_to_collection || { id: 0 };

  if (!id || !name) {
    return false;
  }
  db.serialize(() => {
    console.log(req.body);
    db.run(`INSERT INTO Movies VALUES (?,?,?,?,?)`, [
      id,
      seen,
      collection.id,
      name,
      poster_path
    ], (err) => {

      if (err) {
        res.status(500).send(err);
        return;
      }

      const response = new DBResponse({ id, name });

      res.send(response.response);

    })
  })

});

router.delete("/", (req, res) => {
  let {id} = req.body;

  if (!id) {
    res.status(500).send("Invalid ID")
    return;
  }

  db.serialize(() => {
    db.run(`DELETE FROM Movies where id = ?`, [id], (err) => {
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

interface BelongsToCollection {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}